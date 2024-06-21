import { DbPost } from "@/lib/types/postTypes"
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';

interface Props{
    post:DbPost
}
export default function PostAndCommentsModalImage(props:Props){
 const {post} = props
 const photos = props.post.photo.length
  return (
    <div className="object-cover w-full max-h-[50vh] max-w-[50%]">
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
     <div className="">
     <img alt="post" className="basis-[50%]" src={post.photo[0]}/>
     </div>}
    </div>
  )
}

