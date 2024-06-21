import { DbPost } from "@/lib/types/postTypes";
import { CloudinaryImage } from "../Profile/CloudinaryImage";
import { trpc } from "@/lib/trpc";
import { Ellipsis, Heart, MessageCircle, Share } from "lucide-react";
import { useState } from "react";
import PostAndCommentsModal from "../Modals/PostAndCommentsModal";
import PostImage from "./PostImage";
import useHandleClickOutside, { ClickOutsideRef } from "@/lib/hooks/useHanldeClickOutside";
import { imgPublicId } from "@/lib/utils";
import PostOptionsModal from "./PostOptionsModal";

export default function Post({post}:{post:DbPost}) {
  const utils = trpc.useUtils()
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showOptionsModal,setShowOptionsModal] = useState<boolean>(false)
  const modalRef:ClickOutsideRef<HTMLDivElement> = useHandleClickOutside({setShowModal,showModal})
  // const optionsRef:ClickOutsideRef<HTMLDivElement> = useHandleClickOutside({setShowModal:setShowOptionsModal,showModal:showOptionsModal})
  const {data:user} = trpc.user.fetchUser.useQuery({userId:post.authorId.toString()})
  const mutation = trpc.posts.updateLikes.useMutation({
    onSuccess:()=>{
      utils.posts.fetchPosts.invalidate()

    }
  })
  const {data:currentUser} = trpc.auth.currentUser.useQuery()
  const currentUserHasLiked = post.usersThatLiked.includes(currentUser!.user._id.toString())
  const [liked,setLiked] = useState<boolean>(currentUserHasLiked)
  const handleLikes =()=>{
    mutation.mutate({postId:post._id.toString(),increase:!liked})
  }
  if(!user) return null
  const publicId = imgPublicId(user.profilePicture)
  return (
    <div className="flex flex-col gap-2 p-4 border max-w-[50vw]  relative rounded-lg shadow-sm">
    <div className=" items-center flex justify-between">
      <div className="flex gap-2 items-center">
      <CloudinaryImage height={32} width={32} publicId={publicId} />
      <span>{user.appUsername}</span>
      </div>
      <span>
        <Ellipsis onClick={()=>setShowOptionsModal(!showOptionsModal)}  color="#8a8a8a"/>
        {showOptionsModal &&  <PostOptionsModal postId={post._id.toString()} showModal={showOptionsModal} setShowModal={setShowOptionsModal} />}
        
      </span>
    </div>
    <PostImage post={post} />
    <div className="flex gap-4 mt-2">
      <div className="flex flex-col items-center">
        <Heart
          fill={`${liked ? 'red' : 'white'}`}
          onClick={() => {
            setLiked(!liked);
            handleLikes();
          }}
        />
        <span className="text-sm">{post.likes}</span>
      </div>
      {showModal && <PostAndCommentsModal modalRef={modalRef} post={post} />}
      <div className="flex flex-col items-center">
      <MessageCircle onClick={() => setShowModal((showModal) => !showModal)} />
      <span className="mr-1">{post.comments.length}</span>
      </div>
      <Share />
    </div>
  </div>
  )
  
}
