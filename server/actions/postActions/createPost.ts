"use server"

import { connectToDB } from "@/lib/mongoose"
import { fetchUserDbId } from "../userActions/fetchUserDbId"
import User from "@/lib/Models/UserModel"
import { pusher } from "@/lib/pusher"
import Post from "@/lib/Models/PostModel"
import { createdPost } from "@/lib/types/postTypes"
import { revalidatePath } from "next/cache"

export async function createPost(post:createdPost):Promise<void>{
    try{
       
        if(!post.length) throw new Error(`Post missing`)
        connectToDB()
        const userId = await fetchUserDbId()
        const newPost = await Post.create({post:post,authorId:userId.toString()})
        const savedPost = await newPost.save()
        revalidatePath('/home/profile')
        // await pusher.trigger('post','newPost',savedPost)

    }catch(err:any){
        throw new Error(`Error creating Post :${err.message}`)
    }
}