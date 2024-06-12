"use server"

import Thread from "@/lib/Models/ThreadModel";
import { threadType } from "@/lib/types/threadTypes";import { fetchUser } from "../userActions/fetchUser";
import { DbUser } from "@/lib/types/userTypes";
import User from "@/lib/Models/UserModel";
import { revalidatePath } from "next/cache";
;


export async function createThread({title,description}:threadType): Promise<void> {

    try{
        const userData = await fetchUser() as DbUser
        const newThread = new Thread({title:title,description:description,authorId:userData._id.toString()})
        const savedThread = await newThread.save()
        await User.findByIdAndUpdate(userData._id,{$push:{threads:savedThread._id}},{new:true})
        revalidatePath('/home/profile')
      
    }catch(err:any){
       throw new Error(`${err.message}`)
    }

};

