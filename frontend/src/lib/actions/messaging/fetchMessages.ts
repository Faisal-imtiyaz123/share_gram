"use server"

import Message from "@/lib/Models/Messagemodel"
import { connectToDB } from "@/lib/mongoose"
import { messageObj } from "@/lib/types/messageTypes"
import mongoose from "mongoose"

export async function fetchMessages(senderId:string,recieverId:string):Promise<messageObj[]>{
    const senderMongoId = new mongoose.Types.ObjectId(senderId)
    const recieverMongoId = new mongoose.Types.ObjectId(recieverId)
    try{
        connectToDB()
        const messages = await Message.find({$and:[{senderId:senderMongoId},{recieverId:recieverMongoId}]})
        console.log(messages)
        return messages
    }catch(err:any){
        throw new Error(`Error fetching messages:${err.message}`)
    }
}