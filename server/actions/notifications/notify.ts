"use server"

import { connectToDB } from "@/lib/mongoose"

export async function notify(senderId:string,recieverId:string,notification:string){
    try{
        connectToDB()
        


    }catch(err:any){
        throw new Error(`Error notifying:${err.message}`)
    }

}