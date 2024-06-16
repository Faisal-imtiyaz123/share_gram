
import Post from "@/components/uiCustom/Posts/Post"
import { trpc } from "@/lib/trpc"


export default function HomePage() { 
  const {data:currentUser} =trpc.auth.currentUser.useQuery()
  const {data:posts} = trpc.posts.fetchPosts.useQuery({authorId:currentUser?currentUser.user._id.toString():""})
//   if(!currentUser) return null
  if(!posts) return null
  return (
    <div className="flex justify-center items-center h-full p-2 ">
        <div className="flex flex-col gap-2 h-[100vh]  overflow-scroll ml-[10vw] mx-auto ">
            {
                posts.map((post,index)=>
                    <Post post={post} key={index}/>
                )
            }
    </div>
    </div>
  )
}
