"use server"

import { connectToDB } from "@/lib/mongoose"
import { fetchUserDbId } from "../userActions/fetchUserDbId"
import User from "@/lib/Models/UserModel"
import { stringToMongoId } from "../utils/stringToMongoId"

export async function userIsFollowed(followingUserId:string){
    try{
        connectToDB()
        const currentUserId = await fetchUserDbId()
        const userIamFollowing = await User.findOne({$and:[{_id:stringToMongoId(followingUserId)},{"followers":{$in:[currentUserId]}}]})
        if(userIamFollowing) return true
        return false

    }catch(err:any){
        throw new Error(`Error determining whether I follow the user:${err.message}`)

    }

}