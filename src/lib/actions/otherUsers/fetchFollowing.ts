"use server"

import User from "@/lib/Models/UserModel"
import { connectToDB } from "@/lib/mongoose"

export async function fetchFollowingUsers(userId:string){
    try{
        connectToDB()
        const followingUsers = await User.findById(userId).populate({path:'following',model:"User",select:'username name image'}).select('following -_id')
        return followingUsers.following

    }catch(err:any){
        throw new Error(`Error fethcing following users :${err.message}`)
    }
}