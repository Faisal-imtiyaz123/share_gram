import { Input } from "@/components/ui/input"
import { trpc } from "@/lib/trpc"
import PostComment from "../Comments/PostComment"
import { SendHorizonal } from "lucide-react"
import { useState } from "react"


interface Props{
    postId:string,
    authorId:string
}
export default function PostComments(props:Props){
 const {postId,authorId} = props
 const utils = trpc.useUtils()
 const [comment,setComment] = useState<string>("")
 const {data:postComments} = trpc.comments.fetchPostComments.useQuery({postId})
 const mutation = trpc.comments.createComment.useMutation({
  onSuccess:()=>{
   utils.comments.fetchPostComments.invalidate()
  }
 })

const handleCreateComment = (comment:string)=>{

 mutation.mutate({
    postId,
    comment,
    authorId
 })

}
  return (
<div className="flex basis-[50%] justify-between bg-gray-50 broder-left flex-col">
   <div className=" flex-1 flex gap-6 flex-col overflow-scroll ">
 { postComments?.length?
              postComments?.map((comment)=>
              <PostComment postId={postId} likes={comment.likes} authorId={comment.authorId} profilePicture={comment.userDetails.profilePicture} username={comment.userDetails.username} commentId={comment._id.toString()} comment={comment.comment} />
              )
              :  <span className="bg-white">No comments </span>
}
  </div>
  <div className="relative">
  <Input className="" placeholder="Add a comment" onChange={(e)=>setComment(e.target.value)} onKeyDown={(e)=>{
    if(e.key ==="Enter") handleCreateComment(comment)
  }} type="text" />
  {comment && <SendHorizonal onClick={()=>handleCreateComment(comment)} className="absolute right-2 bottom-2 "/>}
  </div>
</div>
  )
}
