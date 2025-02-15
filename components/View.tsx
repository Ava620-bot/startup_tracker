import React from 'react'
import Ping from './Ping'
import { STARTUP_VIEW_QUERY } from '@/sanity/lib/queries'
import { client } from '@/sanity/lib/client'
import { write } from 'fs'
import { writeClient } from '@/sanity/lib/write-client'
import { unstable_after as after } from 'next/server'



const View = async({id}:{id: string}) => {

  const{ views: totalViews} = await client.withConfig({
    useCdn: false
  }).fetch(STARTUP_VIEW_QUERY, {id})


  after(async() => await writeClient.withConfig({ //this will update the views in the database in real time without the need to refresh the page and blocking any other scheduled tasks
    useCdn: false
  }).patch(id).setIfMissing({views: 0}).inc({views: 1}).commit());

  return (
    <div className="view-container">
    <div className='absolute -top-2 -right-2'>
        <Ping  />
    </div>
    <p className='view-text'>
      <span className='font-black'>Views: {totalViews}</span>
    </p>
    </div>
  )
}

export default View