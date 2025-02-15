import { UserIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const playlist = defineType({
    name: 'playlist',
    title: 'Playlists',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            options: {
                source: 'title', //this is the field that will be used to generate the slug by default by Sanity
            },
        }),
        defineField({
            name: 'select',
            type: 'array',
            of: [{ type: 'reference', to:[{type: 'startup'}] }], //this is the reference to the startup schema
        }),
      
    ],
    
})