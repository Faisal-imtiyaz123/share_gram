"use server"
import Comment from "@/lib/Modals/CommentModel";
import { revalidatePath } from "next/cache";
import { stringToMongoId } from "../utils/stringToMongoId";
import Post from "@/lib/Modals/PostModel";
import { pusher } from "@/lib/pusher";


export async function createComment(comment:string,authorId:string,postId:string){
    try{
        const newComment = new Comment({comment:comment,authorId:stringToMongoId(authorId),postId:stringToMongoId(postId),likes:0})
        const savedComment = await newComment.save()
        await Post.findByIdAndUpdate(postId,{$push:{comments:savedComment._id}})
        pusher.trigger(postId,'newComment',{_id:savedComment._id,likes:savedComment.likes,comment:savedComment.comment})
        revalidatePath(`/home/post/${postId}`)



    }catch(err:any){
        throw new Error(`createComment error: ${err.message}`);

    }
    

}