"use server"

import { connectToDB } from "@/lib/mongoose"
import { fetchUser } from "./fetchUser"
import { DbUser } from "@/lib/types/userTypes"

export async function fetchUserDbId(){
    try{
        connectToDB()
        const user = await fetchUser<DbUser>()
        if(!user) throw new Error(`User not found`)
        const userDbId = user._id
        return userDbId
    }catch(err:any){
        throw new Error(`Error fethcing User:${err.message}`)
    }
}