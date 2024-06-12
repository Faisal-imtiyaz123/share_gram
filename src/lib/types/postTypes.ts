import mongoose from "mongoose";

 export interface DbPost{
    post:string[],
    comments:string[],
   _id:mongoose.Schema.Types.ObjectId,
 }

export type createdPost = string[]