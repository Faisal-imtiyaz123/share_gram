"use server"

import User from "@/lib/Models/UserModel"
import { connectToDB } from "@/lib/mongoose"

export async function fetchFollowers(userId:string){
    try{
        connectToDB()
        const followingUsers = await User.findById(userId).populate({path:'followers',model:"User",select:'username name image'}).select('followers -_id')
        return followingUsers.followers

    }catch(err:any){
        throw new Error(`Error fethcing following users :${err.message}`)
    }
}