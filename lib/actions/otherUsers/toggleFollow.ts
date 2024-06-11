"use server"

import { connectToDB } from "@/lib/mongoose"
import { fetchUser } from "../userActions/fetchUser"
import { DbUser } from "@/lib/types/userTypes"
import { follow } from "../FriendsActions/follow"
import { unfollow } from "../FriendsActions/unfollow"
import { revalidatePath } from "next/cache"

export async function toggleFollow(userId:string,following:boolean){
    try{
        connectToDB()
        const user = await fetchUser<DbUser>()
        if(following){
            follow(userId)
           
        }else{
            unfollow(userId)
        }
        revalidatePath(`/home/profile/${userId}`)


    }catch(err:any){
        throw new Error(`Error toggling following :${err.message}`)

    }
}