"use client"
import { createComment } from "@/lib/actions/commentActions/createComment"
import { CommentObject} from "@/lib/types/commenTypes"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import PostComment from "../Comments/PostComment"
import { pusherClient } from "@/lib/pusher"


export default function CommentsModalPage({props}:{props:{user:{username:string,image:string,userId:string},postId:string,comments:CommentObject[]}}) {
  const [comment , setComment] = useState<string>("")
  const [commentsArr , setCommentsArr] = useState<CommentObject[]>(props.comments)
  const commentModalRef = useRef<HTMLDivElement>(null)

 
  async function handleComment(){
    await createComment(comment,props.user.userId,props.postId)
  }
  
  const scrollToBottom = () => {
    if (commentModalRef.current) {
      // Scroll to the bottom by setting scrollTop to the maximum scroll height
      commentModalRef.current.scrollTop = commentModalRef.current.scrollHeight;
    }
  };

 useEffect(() => {
  scrollToBottom();
  pusherClient.subscribe(props.postId)
  pusherClient.bind('newComment',(commentObj:CommentObject)=>{
    setCommentsArr([...commentsArr,commentObj])
  })
}, [props.comments,props.postId,commentsArr])

  return (
    <div className="flex h-full flex-col w-full ">
        {/* DIV 1 */}
       <div className="flex  gap-6 basis-[5%] items-center p-2 px-4 border-b w-full">
          <Image alt="profile" height={32} width={32} src={props.user.image} priority/>
          <div className="font-semibold">{props.user.username}</div>
       </div>
        {/* DIV 2 */}
       <div ref={commentModalRef} className="basis-[85%] overflow-scroll  ">
        {!props.comments.length && "No comments to show"}
        {props.comments.length  && commentsArr.map((commentObj,index)=>(
           <div key={index} className="flex flex-col p-3 gap-2">
            <PostComment props={{username:props.user.username,userId:props.user.userId,userImage:props.user.image,commentObj:{...commentObj,_id:commentObj._id.toString()}}}/>
           </div>
        ))}
       </div>
         {/* DIV 3 */}
       <div className="">
           div
       </div>
       {/* DIV 4 */}
       <div className="flex justify-center basis-[5%] ">
        <input  onChange={(e)=>setComment(e.target.value)} placeholder="Add a comment.." className="w-full text-sm text-gray-800 p-3" type="text">

        </input >
        {comment &&   <button onClick={()=>{
        handleComment()
        }} className="absolute text-sm font-semibold text-blue-500">Post</button> }  


       </div>
    </div>
  )
}
