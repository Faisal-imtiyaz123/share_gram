import mongoose from "mongoose";
import { BlockList } from "net";

export interface messageObj{
    _id:mongoose.Schema.Types.ObjectId,
    message:string,
    senderId:mongoose.Schema.Types.ObjectId,
    recieverId:mongoose.Schema.Types.ObjectId,
    sent?:true,
}
export interface RenderedMessageObj{
    id:string
    message:string,
    sent?:boolean

}
