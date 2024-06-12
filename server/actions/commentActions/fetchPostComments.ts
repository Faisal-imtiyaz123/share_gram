"use server"

import Comment from "@/lib/Models/CommentModel"
import { connectToDB } from "@/lib/mongoose"
import { stringToMongoId } from "../utils/stringToMongoId"

export async function fetchPostComments(postId:string){
    try{
        connectToDB()
        const comments = await Comment.find({postId:stringToMongoId(postId)}).select('_id comment likes')
        return comments
    }catch(err:any){
        throw new Error(`Error fethcing comments:${err.message}`)
    }
}