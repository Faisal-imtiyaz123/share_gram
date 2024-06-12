import { DbUser } from "@/lib/types/userTypes";
import { fetchUser } from "../userActions/fetchUser";
import User from "@/lib/Models/UserModel";
import Thread from "@/lib/Models/ThreadModel";
import { DbThread } from "@/lib/types/threadTypes";

export async function fetchThreads(){
    try{
        const user = await fetchUser() as DbUser
        const {threads} = await User.findById(user._id).populate({path:"threads",model:Thread,select:"_id title description comments createdAt"}).select('threads')
        return threads as DbThread[]

    }catch(err:any){
        console.log(`fectch threads error : ${err.message}`);
    }


}