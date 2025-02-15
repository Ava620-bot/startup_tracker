"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "./utils";
import slugify from 'slugify';
import { writeClient } from "@/sanity/lib/write-client";

export const createPitch = async (state: any, form: FormData, pitch: string) => {
    const session = await auth();
    if(!session){
        return parseServerActionResponse({status: 'ERROR', error: 'Not Signed In'});
    }
    const { title, description, category, link } = Object.fromEntries(
        Array.from(form).filter(([key, value]) => key !== 'pitch')
    );
    const slug = slugify(title as string, { lower: true, strict: true });
    try {
        const startup = {
            title,
            description,
            category,
            link,
            slug:{
                current: slug,
                _type: 'slug',

            },
            author:{
                _type: 'reference',
                _ref: session?._id,
            },
            pitch
        };
        const result = await writeClient.create({ _type: 'startup', ...startup }); //write to sanity to actually create the startup in the sanity database

        return parseServerActionResponse({status: 'SUCCESS', ...result, error: ''});
    } catch (error) {
        console.log(error);
        return parseServerActionResponse({status: 'ERROR', error: JSON.stringify(error)});
        
    }
}