"use client"
import { deleteComment } from "@/lib/actions/commentActions/deleteComment";
import { commentId } from "@/lib/types/commenTypes";
import { threadId } from "@/lib/types/threadTypes";
import { Trash } from "lucide-react";



export default function CommentModalItem({props}: {props: {comment: string ,commentId:string,threadId:string}}) {
  async function handleDeleteComment(){
    await deleteComment(props.commentId,props.threadId)
  }
  return <div className="bg-gray-100 border-b flex justify-between">
    {props.comment}
    <button onClick={handleDeleteComment}>
      <Trash/>
    </button>
     
    </div>;
}
