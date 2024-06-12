"use server"

import User from "@/lib/Models/UserModel"
import { connectToDB } from "@/lib/mongoose"
import mongoose from "mongoose"
import { revalidatePath } from "next/cache"

export async function searchUsers(searchKey:string,userId:string){
    const regex = new RegExp(searchKey,"i")
    try{
        connectToDB()
        const matchingUsers = await User.find({$and:[{_id:{$ne:userId}},{$or:[{username:{$regex:regex}},{name:{$regex:regex}}]}]})
        revalidatePath('/home/search')
        return matchingUsers

    }catch(err:any){
        throw new Error(`Error searching users, ${err.message}`)
    }
    
}