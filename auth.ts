import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries"
import { client } from "./sanity/lib/client"
import { writeClient } from "./sanity/lib/write-client"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
   callbacks: {
    async signIn({user: {name, email, image}, profile: {id, login, bio}}) {
      const existingUser = await client.withConfig({useCdn: false}).fetch(AUTHOR_BY_GITHUB_ID_QUERY, {id})
    

    if(!existingUser) {
      await writeClient.create({
        _type: 'author',
        id,
        name,
        image,
        username: login,
        email,
        bio,
      })
    }

    return true;
  },
  async jwt({token, account, profile}){  //after user create we need user id for making startup and 
    if(account && profile){
      const user = await client.withConfig({useCdn: false}).fetch(AUTHOR_BY_GITHUB_ID_QUERY, {id: profile.id})
      token.id = user?._id

    }
    return token;
  },
  async session({session, token}) { //creating the session with the same user id from the jwt token
    Object.assign(session, {id: token.id})
    return session;
  }
}
})