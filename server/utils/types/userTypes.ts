import { ObjectId } from "mongoose"
export interface User{
    username: string
    password: string
    name:string
    bio:string
    posts: ObjectId[] | [],
    followers:ObjectId[] | [],
    following: ObjectId[] | [],
    onboarded:boolean,
    privateAccount:boolean
}