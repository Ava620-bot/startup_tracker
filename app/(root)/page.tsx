import React from 'react'
import SearchForm from '../../components/SearchForm'
import StartupCards, { StartupTypeCard } from '@/components/StartupCard'
import { STARTUP_QUERY } from '@/sanity/lib/queries'
import { sanityFetch, SanityLive } from '@/sanity/lib/live'
import { auth } from '@/auth'
import { log } from 'console'

const Home = async({searchParams}:{
  searchParams: Promise<{query?: string}>
}) => {

  const query = (await searchParams).query;
  const params = {search: query || null}
  // const posts = await client.fetch(STARTUP_QUERY);
  const {data: posts} = await sanityFetch({ query: STARTUP_QUERY, params}); //this will revalidate the page whenever new changes is made from the data source of
  const session = await auth();
  if(!session) {
    return null;
  }
  console.log(session?.id, "session id");
  return (
    <>
    <section className='pink_container'>
    <h1 className="heading">
            Pitch Your Startup, <br />
            Connect with Entrepreneurs
          </h1>
          <p className='sub-heading !max-w-3xl'>Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions.</p>
    {/* <Image src={HeroBanner} alt='hero-banner' className='w-full h-auto' /> */}
    {/* <div className="absolute inset-0 top-[10.5rem] flex flex-col items-center justify-center">
          
        </div> */}

        <SearchForm query={query} />
    </section>
    <section className='section_container'>
    <p className='text-30-semibold'>
      {query ? (`Search Result for ${query}`) : ('All Startups')}
    </p>
    <ul className='mt-7 card_grid'>
     {posts?.length > 0 ? (posts?.map((post: StartupTypeCard, index: number)=>(
      <StartupCards key={post?._id} post={post}  />
     ))
    ) : (
      <p className='no-results'>No startups found</p>
     )}
    </ul>
    </section>
    <SanityLive /> 
    </>
  )
}

export default Home