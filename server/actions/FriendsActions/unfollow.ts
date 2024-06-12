"use server"

import { connectToDB } from "@/lib/mongoose"
import User from "@/lib/Models/UserModel"
import { fetchUser } from "../userActions/fetchUser"
import { DbUser } from "@/lib/types/userTypes"
import mongoose from "mongoose"


export async function unfollow(userId:string){
    const mongoUserId = new  mongoose.Types.ObjectId(userId)
  
    try{
        connectToDB()
        const currentUser = await fetchUser<DbUser>()
        if(!currentUser) return null
        await User.findByIdAndUpdate(currentUser._id.toString(),{$pull:{following:mongoUserId}})
        await User.findByIdAndUpdate(mongoUserId,{$pull:{followers:currentUser._id}})

    }catch(err:any){
        throw new Error(`Error following this user :${err.message}`)
    }

}