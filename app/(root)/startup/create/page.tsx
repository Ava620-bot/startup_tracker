import { auth } from "@/auth"
import StartupForm from "@/components/StartupForm"
import { redirect } from "next/navigation";

const page = async() => {

   const session = await auth();
   if(!session) redirect('/') //redirect to home page if user is not logged in
  return (
    <>
    <section className="pink_container !min-h-[230px]">
      <h1 className="heading">Submit your startup pitch</h1>
    </section>
    <StartupForm />
    </>
  )
}

export default page