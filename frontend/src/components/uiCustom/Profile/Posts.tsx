
import { trpc } from "@/lib/trpc"
import ProfilePost from "./ProfilePost"
import useCurrentUser from "@/lib/hooks/useCurrentUser"
interface Props{
  userId?:string
}

export default  function Posts(props:Props) {
    const { userId } = props
    const {data:currentUser} = useCurrentUser()
    const {data:posts} = trpc.posts.fetchPosts.useQuery({authorId:userId?userId.toString():currentUser!.user._id.toString()})
    if(!posts) return null
  return (
    <div className="grid grid-cols-3 gap-4 ">
      {posts.map((post,index)=><ProfilePost key={index} post={post}/>)}
    </div>
  )
}
