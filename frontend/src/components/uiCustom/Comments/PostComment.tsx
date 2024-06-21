import { Ellipsis, Heart } from "lucide-react";
import { useState } from "react";

import DeleteCommentModal from "../Modals/DeleteCommentModal";

interface Props {
  commentId: string;
  comment: string;
  authorId: string;
  profilePicture: string;
  likes: number;
  username: string;
  postId: string;
}

export default function PostComment(props: Props) {
  const { comment, username, commentId, authorId, profilePicture,postId, likes } =
    props;
  const [liked, setLiked] = useState<boolean>(Boolean(likes)); 
  const [showModal,setShowModal] = useState<boolean>(false)
  
  async function handleLike() {
    setLiked(!liked)
    // await toggleLikeComment(commentId,authorId,!liked)
  }
  
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-2 basis-[30%] ">
        <img
          className="self-start rounded-full"
          height={32}
          width={32}
          src={profilePicture}
          alt="profile"
        />
        <span className="text-sm font-semibold">{username}</span>
      </div>
      <div className=" ml-4 basis-[95%]">
        <div>{comment}</div>
            <Ellipsis onClick={()=>setShowModal(!showModal)} className="fixed" color="#c7c7c7" />
            {showModal && <DeleteCommentModal postId={postId} commentId={commentId} showModal={showModal} setShowModal={setShowModal} />}
      </div>

      <div className="self-start mt-2">
        <Heart
          onClick={handleLike}
          fill={`${liked ? "red" : "white"}`}
          size={10}
        />
      </div>
    </div>
  );
}
