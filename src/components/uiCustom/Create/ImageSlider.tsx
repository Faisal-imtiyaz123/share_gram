"use client"
import Image from "next/image";
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';

export default function ImageSlider({previews}:{previews:string[]}) {
 const length = previews.length
  return (
    <div className={`${previews.length && 'grow'} rounded-lg flex `}>
       <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="h-ful w-full"
      >
        {previews.map((preview,index)=>
          <SwiperSlide key={index}>
            <div className="w-full h-full relative ">

            <Image alt="post" fill className="block h-full w-full object-cover" src={preview}/>
            </div>


          </SwiperSlide>



        )}
      </Swiper>
    </div>
  )
}
