"use server"

import { connectToDB } from "@/lib/mongoose";
import User from "@/lib/Models/UserModel";
import { DbUser } from "../../types/userTypes";
import { currentUser } from "@clerk/nextjs";


export async function fetchUser<TOut>():Promise<DbUser|TOut|null>{
    try{
        connectToDB()
        const user = await currentUser()
        const userData = await User.find({id:user?.id})
        return userData[0]
    }catch(err:any){
        throw new Error(`Failed to fetch User:${err.message}`)

    }

}
