"use server"


import Thread from "@/lib/Modals/ThreadModel"
import { connectToDB } from "@/lib/mongoose"
import { threadId } from "@/lib/types/threadTypes"

export async function  fetchThread(threadId:threadId){
    try{
        connectToDB()
        const thread = await Thread.findById(threadId).select('title description _id')
        console.log(thread)
        return thread 

    }catch(err:any){
        throw new Error(`errro fecthing thread:${err.message}`)

    }

}