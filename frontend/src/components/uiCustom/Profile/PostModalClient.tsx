import { fetchPostComments } from "@/lib/actions/commentActions/fetchPostComments"
import { fetchPost } from "@/lib/actions/postActions/fetchPost"
import { fetchUser } from "@/lib/actions/userActions/fetchUser"
import { DbUser } from "@/lib/types/userTypes"
import CommentsModalPage from "../Modals/CommentsModalPage"
import PostModalPage from "../Modals/PostModal"





export default async function PostIdPage({params}:{params:{postId:string}}) {
  const {post,_id} = await fetchPost(params.postId)
  const user = await fetchUser<DbUser>()
  if(!user) return null
  const commentsArr = await fetchPostComments(params.postId)
  
 
  return (
    <div className="flex bg-red-100 h-full w-full items-center justify-center ">

    <div className="flex w-[80%] h-[90vh] border ">
      <PostModalPage props={{user:user,post:post}}>
        <CommentsModalPage props={{user:user,postId:_id.toString(),comments:commentsArr}} />
      </PostModalPage>

    </div>
    </div>
  )
}
