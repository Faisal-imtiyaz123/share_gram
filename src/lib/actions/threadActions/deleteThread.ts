"use server"
import { DbUser } from "@/lib/types/userTypes";
import { fetchUser } from "../userActions/fetchUser";
import Thread from "@/lib/Models/ThreadModel";
import User from "@/lib/Models/UserModel";
import { threadId } from "@/lib/types/threadTypes";
import { revalidatePath } from "next/cache";



export async function deleteThread(threadId:threadId){
    try{
        const user = await fetchUser() as DbUser
        await Thread.findByIdAndDelete(threadId.toString());
        await User.findByIdAndUpdate(user._id,{$pull:{threads:threadId}})
        revalidatePath('/home/profile')
    }catch(err:any){
        throw new Error(`Delete Thread Error: ${err.message}`)
    }


}