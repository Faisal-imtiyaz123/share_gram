import { DbPost } from "@/lib/types/postTypes";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import PostAndCommentsModal from "../Modals/PostAndCommentsModal";
import useHandleClickOutside, { ClickOutsideRef } from "@/lib/hooks/useHanldeClickOutside";
import ProfilePostImage from "./ProfilePostImage";
export default function ProfilePost({post}:{post:DbPost}) {
  const {data:user} = trpc.user.fetchUser.useQuery({userId:post.authorId.toString()})
  const [showModal,setShowModal] = useState<boolean>(false)
  const modalRef:ClickOutsideRef<HTMLDivElement> = useHandleClickOutside({setShowModal,showModal})

  if(!user) return null
  return (
   <>
   <div onClick={()=>setShowModal(true)} className="max-w-[25rem] h-[25rem]">
    <ProfilePostImage post={post} />
    {showModal && <PostAndCommentsModal post={post} modalRef={modalRef} />}
   </div>
      </>
  )
  
}
