"use server"

import User from "@/lib/Models/UserModel"
import { connectToDB } from "@/lib/mongoose"
import mongoose from "mongoose"

export async function fetchPostUser(postId:string){
    try{
        connectToDB()
        const user = await User.findOne({post:{$in:[postId]}})
        return user

    }catch(err:any){
        throw new Error(`Error fetching post user :${err.message}`)
    }
}