import mongoose from "mongoose"

export interface otherUser{
    _id:mongoose.Schema.Types.ObjectId
    username:string,
    name:string
    image?:string
}
export  type following = otherUser[]

export  type followers = otherUser[]


