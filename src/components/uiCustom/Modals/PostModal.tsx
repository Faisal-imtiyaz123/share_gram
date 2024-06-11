"use client"
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import Image from "next/image"



export default function PostModalPage({props,children}:{props:{post:string[]},children:React.ReactNode}) {
  const {post} = props
  return (
<>
   {/* image div */}
   
   {post.length>1?
   <div className='basis-[60%]'>
   <Swiper
   cssMode={true}
   navigation={true}
   pagination={true}
   mousewheel={true}
   keyboard={true}
   modules={[Navigation, Pagination, Mousewheel, Keyboard]}
   className="h-ful w-full"
 >
   {post.map((post,index)=>
     <SwiperSlide key={index}>
       <div className=" relative ">
       <Image alt="post" fill className="block h-full w-full object-cover" src={post}/>
       </div>
     </SwiperSlide>

   )}
 </Swiper>
   </div>
   :
   <div className='relative basis-[60%]'>
     <Image alt="post" fill className="block w-full object-cover" src={post[0]}/>
   </div>
   
 
 
 }
 

 {/* comments div */}
 <div className='basis-[40%]'>
    {children}
 </div>


 </>
  )
}
