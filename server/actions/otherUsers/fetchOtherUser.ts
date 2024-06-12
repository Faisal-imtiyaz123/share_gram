
"use server"
import User from "@/lib/Models/UserModel"
import { connectToDB } from "@/lib/mongoose"
import { DbUser } from "@/lib/types/userTypes"
import mongoose from "mongoose"
export async function fetchOtherUser(userId:string):Promise<DbUser|null>{
    try{
        if(!mongoose.isValidObjectId(userId)) return null
        connectToDB()
        const otherUser = await User.findById(userId)
        return otherUser
    }catch(err:any){
        throw new Error(`Other user profile couldn't be fetched:${err.message}`)

    }

}