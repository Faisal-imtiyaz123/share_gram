import React from 'react';
import { DbPost } from '@/lib/types/postTypes';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';

interface Props {
  post: DbPost;
}

const ProfilePostImage: React.FC<Props> = ({ post }) => {
  const photos = post.photo.length;
  return (
    <div className="object-cover w-full max-h-[50vh]">
      {photos > 1 ? (
        <Swiper
          cssMode={true}
          navigation={true}
          pagination={true}
          mousewheel={true}
          keyboard={true}
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
          className="h-full w-full"
        >
          {post.photo.map((photo, index) => (
            <SwiperSlide key={index}>
              <div className="flex justify-center items-center h-full w-full">
                <img alt="post" className="object-cover h-full w-full" src={photo} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="flex justify-center items-center h-full w-full">
          <img alt="post" className="object-cover h-full w-full" src={post.photo[0]} />
        </div>
      )}
    </div>
  );
};

export default ProfilePostImage;
