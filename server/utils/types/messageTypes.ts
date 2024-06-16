import { ObjectId } from "mongodb"

export interface Message{
    senderId: ObjectId
    receiverId: ObjectId
    message:string
    time:{
        day:string,
        time:string,
        year:string
    }
}