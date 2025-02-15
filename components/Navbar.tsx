import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Logo } from './Images'
import { auth, signOut, signIn } from "@/auth";
import { BadgePlus, LogOut } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';

const Navbar = async() => {
    const session = await auth(); 
  return (
    <header className='px-5 py-3 bg-white mx-auto shadow-sm font-work-sans'>
        
        <nav className='flex items-center justify-between'>
            <Link href='/'>
            <Image src={Logo} alt="" width={144} height={30} className='' />

            </Link>
            <div className="flex items-center gap-5">
                {session && session?.user ? (
                    <>
                    <Link href='/startup/create'>
                    <span className='hover:underline hover:text-primary hover:text-semibold max-sm:hidden'>Create</span>
                      <BadgePlus className='size-6 sm:hidden text-primary' />
                    </Link>
                    <form
                action={async () => {
                  "use server";

                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit">
                  <span className="max-sm:hidden">Logout</span>
                  <LogOut className="size-6 sm:hidden text-red-500" />
                </button>
              </form>
                    <Link href={`/user/${session?.id}`}>
                    {/* <span>{session?.user?.name}</span> */}
                    <Avatar className="size-10">
                      <AvatarImage src={session?.user?.image} />

                    </Avatar>
                    </Link>
                    </>
                ) : (
                    <form action={async() => {
                        "use server";
                        await signIn({provider: 'github'}); // Corrected `signIn` function call
                      }}>
                        <button className='hover:underline hover:text-primary hover:text-semibold' type='submit'>Login</button>
                    </form>
                  ) }
            </div>
        </nav>
    </header>
  )
}

export default Navbar