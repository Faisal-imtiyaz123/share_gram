"use server"

import { connectToDB } from "@/lib/mongoose"
import User from "@/lib/Models/UserModel"
import { revalidatePath } from "next/cache"
import { fetchUserId } from "../userActions/fetchUserId"

export async function togglePrivate(privateAcc:boolean){
    try{
        connectToDB()
        const currentUserId = await fetchUserId()
        const res =  await User.findByIdAndUpdate(currentUserId,{$set:{privateAccount:privateAcc}})
        console.log(res)
        revalidatePath('/home/account/privacy')
    }catch(err:any){
        throw new Error(`Error making account priavte: ${err.message}`)
    }
}