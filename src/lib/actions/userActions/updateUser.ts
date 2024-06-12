"use server"

import { connectToDB } from "@/lib/mongoose"
import { user } from "../../types/userTypes"
import User from "@/lib/Models/UserModel"

export async function updateUser(user:user):Promise<void>{
    connectToDB()
    try{

        await User.findOneAndUpdate({id:user.id},{username:user.username,name:user.name,bio:user.bio,image:user.image,onboarded:true},{upsert:true})
    }catch(err:any){
        throw new Error(`Failed to update user, err :${err.message}`)
    }


}