import { DbPost } from "@/lib/types/postTypes";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import { CloudinaryImage } from "../Profile/CloudinaryImage";
import { trpc } from "@/lib/trpc";
import { imgPublicId } from "@/lib/utils";
import { Heart, MessageCircle, Share } from "lucide-react";
import { useState } from "react";

export default function Post({post}:{post:DbPost}) {
  const photos = post.photo.length
  const {data:user} = trpc.user.fetchUser.useQuery({userId:post.authorId.toString()})
  const mutation = trpc.posts.updateLikes.useMutation()
  const {data:currentUser} = trpc.auth.currentUser.useQuery()
  const currentUserHasLiked = post.usersThatLiked.includes(currentUser!.user._id.toString())
  const [liked,setLiked] = useState<boolean>(currentUserHasLiked)
  const handleLikes =()=>{
    mutation.mutate({postId:post._id.toString(),increase:!liked})
  }
  if(!user) return null
  return (
    <div className="flex flex-col gap-2 p-4 border  rounded-lg shadow-sm ">
        <div className="flex gap-2 items-center">
            <CloudinaryImage height={32} width={32} publicId={imgPublicId(user.profilePicture)}/>
            <span>{user.appUsername}</span>
        </div>
        <div className="h-[45vh] w-[40vw]">
       { photos>1 ?
        <Swiper
         cssMode={true}
         navigation={true}
         pagination={true}
         mousewheel={true}
         keyboard={true}
         modules={[Navigation, Pagination, Mousewheel, Keyboard]}
         className="h-ful w-full"
       >
         {post.photo.map((photo,index)=>
           <SwiperSlide key={index}>
           <div className=" ">
           <img alt="post" className="" src={photo}/>
           </div>
         </SwiperSlide>
         )}
       </Swiper>
     :
     <div className="flex justify-center">
     <img alt="post" className="max-h-[40vh]" src={post.photo[0]}/>
     </div>}
        </div>
        <div className="flex gap-4">
           <Heart fill={`${liked?"red":"white"}`} onClick={()=>{
             setLiked(!liked)
              handleLikes()
           }}/>
           <MessageCircle/>
           <Share/>
        </div>
 </div>
  )
  
}
