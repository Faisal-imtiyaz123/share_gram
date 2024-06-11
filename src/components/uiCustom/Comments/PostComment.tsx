"use client"
import { toggleLikeComment } from "@/lib/actions/commentActions/likeComment";
import { pusherClient } from "@/lib/pusher";
import { CommentObject } from "@/lib/types/commenTypes";
import { Heart } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function PostComment({props}:{props:{commentObj:CommentObject,username:string,userId:string,userImage:string}}) {
  const {commentObj,username,userId,userImage} = props
  const[liked,setLiked] = useState<boolean>(Boolean(commentObj.likes))
  async function handleLike(){
    setLiked(!liked)
    await toggleLikeComment(commentObj._id?.toString(),userId.toString(),!liked)
  }
  return (
    <div  className="flex w-full gap-3"> 
      <div className="flex gap-2 basis-[30%] ">
        <Image className="self-start" height={32} width={32} src={userImage} alt="profile"/>
        <span className="text-sm font-semibold">
        {username}
        </span>
       
      </div>
       <div className="flex basis-[70%]">
        <div className="basis-[95%]">
          {commentObj.comment}
        </div>

      <div className="self-start mt-2">
        <Heart onClick={handleLike} fill={`${liked ? "red":"white"}`} size={10}/>
      </div>
       </div>
    </div>
  )
}
