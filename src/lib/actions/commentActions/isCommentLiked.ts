"use server"

import Comment from "@/lib/Models/CommentModel"
import { connectToDB } from "@/lib/mongoose"
import { mongoId } from "@/lib/utils"

export async function isCommentliked(commentId:string,userId:mongoId){
    try{
        connectToDB()
        const result = await Comment.findById(commentId).select('usersLiked -_id')
        for(const user of result.usersLiked){
            if(user==userId)
            return true

        }
        return false
    }catch(err:any){
        throw new Error(`Error determining if user has liked:${err.message}`)
    }
}
