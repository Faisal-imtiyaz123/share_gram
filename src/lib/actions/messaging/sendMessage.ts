"use server"

import Message from "@/lib/Models/Messagemodel"
import { connectToDB } from "@/lib/mongoose"
import { pusher } from "@/lib/pusher"
import mongoose from "mongoose"
import { fetchUserDbId } from "../userActions/fetchUserDbId"

export async function sendMessage(message:string,senderId:string,recieverId:string){
    const senderMongoId = new mongoose.Types.ObjectId(senderId)
    const recieverMongoId = new mongoose.Types.ObjectId(recieverId)
    const userDbId = await fetchUserDbId()
    try{
        connectToDB()
        const newMessage= new Message({message:message,senderId:senderMongoId,recieverId:recieverMongoId})
        const savedMessage = await newMessage.save()
        await pusher.trigger(recieverId,'message',{
            message:message,
            sent:userDbId.toString()==senderMongoId.toString()?true:false,
            id:savedMessage._id.toString()
        })

    }catch(err:any){
        throw new Error(`Error Sending message : ${err.message}`)

    }

}