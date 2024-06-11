"use server"

import Comment from "@/lib/Models/CommentModel"
import { connectToDB } from "@/lib/mongoose"
import { revalidatePath } from "next/cache"

export async function toggleLikeComment(commentId:string,userId:string,liked:boolean){

    try{
        connectToDB()
        if(liked){
         await Comment.findByIdAndUpdate(commentId,{$inc:{"likes":1},$push:{"usersLiked":userId}},{new:true})
        //  pusher.trigger('comment',commentId,true)
        }else{
         await Comment.findByIdAndUpdate(commentId,{$inc:{"likes":-1},$pull:{"usersLiked":userId}},{new:true})
        //  pusher.trigger('comment',commentId,false)
        }
        revalidatePath('/home/post')
     
        
            

    }catch(err:any){
        throw new Error(`Error liking comment:${err.message}`)
    }
}