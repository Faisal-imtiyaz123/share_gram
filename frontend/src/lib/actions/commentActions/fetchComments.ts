"use server"


import Comment from "@/lib/Modals/CommentModel";
import Thread from "@/lib/Modals/ThreadModel";
import { threadId } from "@/lib/types/threadTypes";

export async function fetchComments(threadId:threadId){
    try{

        const commentObj = await Thread.findById(threadId).populate({path:'comments',model:Comment,select:'comment '}).select('comments -_id')
        return {...commentObj,_id:commentObj._id.toString()}
    }catch(err:any){
        throw new Error(`Could not fetch comments: ${err.message}`)

    }

}