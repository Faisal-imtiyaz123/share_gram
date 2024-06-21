import { DbPost } from "@/lib/types/postTypes"
import PostComments from "../Posts/PostComments"
import PostAndCommentsModalImage from "../Posts/PostAndCommentsModalImage"
import { ClickOutsideRef } from "@/lib/hooks/useHanldeClickOutside"
interface Props{
    post:DbPost,
    modalRef: ClickOutsideRef<HTMLDivElement>
}
export default function PostAndCommentsModal(props:Props) {
 const {post,modalRef} = props
  return (
    <>
<div className="fixed w-[100vw] h-[100vh] top-0 left-0 bg-black z-50 bg-opacity-50 flex justify-center items-center ">
     <div ref={modalRef}  className="flex gap-4 bg-white p-4 h-[95vh] w-[80vw]">
        <PostAndCommentsModalImage  post={post}/>
        <PostComments authorId={post.authorId.toString()} postId={post._id.toString()}/>
     </div>
</div>
 </>

  )
}
