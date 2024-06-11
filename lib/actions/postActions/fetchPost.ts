"use server"

import Post from "@/lib/Models/PostModel"

import { connectToDB } from "@/lib/mongoose"
import { DbPost } from "@/lib/types/postTypes"

export async function fetchPost(postId:string):Promise<DbPost>{
    try{
        connectToDB()
        const post = await Post.findById(postId)
        return post

    }catch(err:any){
        throw new Error(`Error fethcing post, ${err.message}`)
    }
}

