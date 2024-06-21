"use server"

import Post from "@/lib/Modals/PostModel"
import User from "@/lib/Modals/UserModel"
import { connectToDB } from "@/lib/mongoose"
import { DbPost } from "@/lib/types/postTypes"

export async function fetchPosts(userId:string):Promise<DbPost[]>{
    try{
        connectToDB()
        const posts = await Post.find({authorId:userId})
        return posts

    }catch(err:any){
        throw new Error(`Error fethcing Posts:${err.message}`)
    }
}