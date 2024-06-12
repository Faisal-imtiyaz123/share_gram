"use server"

import User from "@/lib/Models/UserModel"
import { currentUser } from "@clerk/nextjs"
interface userId{
    id:string;
}
export async function fetchUserId():Promise<userId> {
    const user = await currentUser()
    const userDb = await User.findOne({id: user?.id})
    return userDb._id.toString()
}