"use server"

import Comment from "@/lib/Modals/CommentModel"
import Thread from "@/lib/Modals/ThreadModel"
import { connectToDB } from "@/lib/mongoose"
import { revalidatePath } from "next/cache"



export async function deleteComment(commentId:string,threadId:string){
    try{
        connectToDB()
        console.log(commentId,threadId)
        await Comment.findByIdAndDelete(commentId)
        await Thread.findByIdAndUpdate(threadId,{$pull:{comments:commentId}})
        revalidatePath(`/home/thread/${threadId}`)

    }catch(err:any){
        throw new Error(`comment-deletion error:${err.message}`)
    }

}