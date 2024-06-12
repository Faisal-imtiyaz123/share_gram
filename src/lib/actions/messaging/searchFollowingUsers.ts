"use server"

import User from "@/lib/Models/UserModel"
import { connectToDB } from "@/lib/mongoose"
import { fetchUser } from "../userActions/fetchUser"
import { DbUser } from "@/lib/types/userTypes"
import { fetchUserId } from "../userActions/fetchUserId"

export async function searchFollowedUsers(){
    connectToDB()
    const userId= await fetchUserId()
    try{
        const following = await User.findById(userId).select('following').populate({path:"following",model:User,select:"name username"})
        console.log(following)
        
        return following
    }catch(err:any){
        throw new Error(`Error searching following Users:${err.message}`)
    }

}