

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { DbPost } from "@/lib/types/postTypes";
import { Link } from 'react-router-dom';




export default function Post({post}:{post:DbPost}) {
  return (
     <div className=" border w-[20rem] h-[20rem]">
       <Link to={`/post/${post._id.toString()}`}>
                <img  alt="post" src={post.photo[0]}/>
      </Link>
     </div>
    
  )
}
