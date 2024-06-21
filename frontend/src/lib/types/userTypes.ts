import { ObjectId } from "mongodb"

export interface User{
    username: string
    password: string,
    appUsername: string,
    name:string
    bio:string
    posts: ObjectId[] ,
    followers:ObjectId[] 
    following: ObjectId[],
    onboarded:boolean,
    privateAccount:boolean,
    profilePicture:string,
    messageUsers:ObjectId[] 
}
export type DbUser = User & {_id:ObjectId}