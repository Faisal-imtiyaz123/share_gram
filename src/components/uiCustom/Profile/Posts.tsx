import { fetchUser } from "@/lib/actions/userActions/fetchUser"
import { DbUser } from "@/lib/types/userTypes"
import Post from "./Post"
import { fetchPosts } from "@/lib/actions/postActions/fetchPosts"
import { fetchUserDbId } from "@/lib/actions/userActions/fetchUserDbId"


export default async function Posts() {
 const userDbId = await fetchUserDbId()
 const posts = await fetchPosts(userDbId.toString())

  
  return (
    <div className=" bg-gray-50">
      {posts.map((postObj,index)=><Post key={index} postObj={{post:postObj.post,postId:postObj._id.toString()}}/>)}
    </div>
  )
}
