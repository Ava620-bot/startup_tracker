import { client } from '@/sanity/lib/client';
import { STARTUPS_BY_AUTHOR_QUERY } from '@/sanity/lib/queries';
import React from 'react'
import StartupCards from './StartupCard';

const UserStartups = async({id}: any) => {
    const startups = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, {id});
    console.log(startups)
  return (
    <>
{startups.length > 0 ?
    startups.map((startup: any) => (
        <StartupCards key={startup._id} post={startup} />
    ))
    : <p>No startups found</p>
}
    </>
  )
}

export default UserStartups