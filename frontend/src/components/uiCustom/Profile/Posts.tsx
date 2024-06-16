
import { trpc } from "@/lib/trpc"
import Post from "./Post"


export default  function Posts() {
//  const userDbId = await fetchUserDbId()
//  const posts = await fetchPosts(userDbId.toString())
    // const {data:currentUser} =trpc.auth.currentUser.useQuery()
    // if(!currentUser) return null
    const {data:currentUser} =trpc.auth.currentUser.useQuery()
    const {data:posts} = trpc.posts.fetchPosts.useQuery({authorId:currentUser?currentUser.user._id.toString():""})
    if(!posts) return null
  return (
    <div className=" ">
      {posts.map((post,index)=><Post key={index} post={post}/>)}
    </div>
  )
}
