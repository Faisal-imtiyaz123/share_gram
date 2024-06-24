import { DbPost } from "@/lib/types/postTypes"
import PostComments from "../Posts/PostComments"
import PostAndCommentsModalImage from "../Posts/PostAndCommentsModalImage"
import { ClickOutsideRef } from "@/lib/hooks/useHanldeClickOutside"
import { Ellipsis } from "lucide-react"
import { useState } from "react"
import PostOptionsModal from "../Posts/PostOptionsModal"
interface Props{
    post:DbPost,
    modalRef: ClickOutsideRef<HTMLDivElement>
}
export default function PostAndCommentsModal(props:Props) {
const [showOptionsModal,setShowOptionsModal] = useState<boolean>(false)
 const {post,modalRef} = props
  return (
    <>
<div className="fixed w-[100vw] h-[100vh] top-0 left-0 bg-black z-50 bg-opacity-50 flex justify-center items-center ">
     <div ref={modalRef}  className="flex relative gap-4 bg-white p-4 h-[95vh] w-[80vw]">
     <span className="absolute right-2 top-1">
        <Ellipsis onClick={()=>setShowOptionsModal(!showOptionsModal)} />
        {showOptionsModal &&  <PostOptionsModal postId={post._id.toString()} showModal={showOptionsModal} setShowModal={setShowOptionsModal} />}
      </span>
        <PostAndCommentsModalImage  post={post}/>
        <PostComments authorId={post.authorId.toString()} postId={post._id.toString()}/>
     </div>
</div>
 </>

  )
}
