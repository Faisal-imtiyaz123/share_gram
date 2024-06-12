"use client"
import { DbPost } from "@/lib/types/postTypes";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';



export default function Post({postObj}:{postObj:{post:string[],postId:string}}) {
 const router = useRouter()
 const {post,postId} = postObj
 const postLength = post.length
  return (
    postLength >1 ?
     <div className="">
     
            {post.map((postEl,index)=>
            <div  key={index}>
                <Link href={`/home/post/${postId.toString()}`}>
                <Image priority width={200} height={200} alt="post" src={postEl}/>
                </Link>

            </div>
            
            )}
           
     </div>
   
  :
    
    <div className="relative">
      <Link href={`/home/post/${postId.toString()}`}>
        <Image priority width={200} height={200} alt="post" src={post[0]}/>
      </Link>
   

    </div>
    
  )
}
