"use server"


import Comment from "@/lib/Models/CommentModel";
import Thread from "@/lib/Models/ThreadModel";
import { threadId } from "@/lib/types/threadTypes";

export async function fetchComments(threadId:threadId){
    try{

        const commentObj = await Thread.findById(threadId).populate({path:'comments',model:Comment,select:'comment '}).select('comments -_id')
        return {...commentObj,_id:commentObj._id.toString()}
    }catch(err:any){
        throw new Error(`Could not fetch comments: ${err.message}`)

    }

}