import mongoose from "mongoose"

export interface user{
    id:string
    username:string
    name:string
    bio:string
    image:string
    onboarded?:boolean
    followers:mongoose.Schema.Types.ObjectId[],
    following:mongoose.Schema.Types.ObjectId[],
    requestedUsers:mongoose.Schema.Types.ObjectId[],
    requestingUsers:mongoose.Schema.Types.ObjectId[],
    blockedUsers:mongoose.Schema.Types.ObjectId[],
    mutedAccounts:mongoose.Schema.Types.ObjectId[],
    posts:{post:string[],_id:mongoose.Schema.Types.ObjectId,comments:string[]}[],
    privateAccount:boolean


}

export interface DbUser extends user {
    _id:string
}

export type authorId = mongoose.Schema.Types.ObjectId

