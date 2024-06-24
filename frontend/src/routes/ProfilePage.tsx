// import EditProfileModal from "@/components/uiCustom/Modals/EditProfileModal"
import { CloudinaryImage } from "@/components/uiCustom/Profile/CloudinaryImage"
import Posts from "@/components/uiCustom/Profile/Posts"
import useCurrentUser from "@/lib/hooks/useCurrentUser"
import { trpc } from "@/lib/trpc"
import { imgPublicId } from "@/lib/utils"
// import { Dialog, DialogContent, DialogTrigger } from "@radix-ui/react-dialog"
import { Bookmark, Grid3X3 } from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"


export default function ProfilePage() {
  const {data:currentUser}  = useCurrentUser()
  const navigate = useNavigate()
  const params = useParams()
  const utils = trpc.useUtils()
  const userId = params.userId?.toString()
  const mutation = trpc.user.followUser.useMutation({
    onSuccess:()=>{
      utils.user.fetchUser.invalidate()
    }
  })
  const {data:user,isError,isLoading} = trpc.user.fetchUser.useQuery({userId:userId!})
  const [followed, setFollowed] = useState<boolean|undefined>(user?.followers.includes(currentUser!.user._id))
  
  useEffect(()=>{
    if(isError) {
      toast.error(`user not found`)
      navigate('/login')
    } 
  },[navigate,isError])

if(isLoading) return toast.loading('Getting user profile')
if(user){
 toast.dismiss()
 const publicId = imgPublicId(user?.profilePicture)

 const handleFollow = ()=>{
    setFollowed(!followed)
    mutation.mutate({userId:userId!,followed:!followed})
 }

const handleMessage = ()=>{
  navigate(`/message/${user._id.toString()}`)

}
return (

  <div className="flex flex-col h-full w-full items-center">
  <div className="flex w-[85%] basis-[30%] border-b">
    <div className="basis-[40%] flex items-center justify-center">
      <CloudinaryImage publicId={publicId} height={128} width={128} />
    </div>
    <div className="flex flex-col gap-6">
      <div className="mt-6 flex gap-4">
        <span className="text-xl">{}</span>
        <div className="flex gap-2">
          <button onClick={handleFollow} className={`p-1 px-4 rounded-lg ${followed?"bg-blue-400 text-white":"bg-gray-100"}`}>{followed?"Unfollow":"Follow"}</button>
          <button onClick={handleMessage} className="p-1 px-4 bg-gray-100 rounded-lg">Message</button>
          <button className="p-1 px-4 bg-gray-100 rounded-lg">
            View Archive
          </button>
        </div>
      </div>

      <div className="flex gap-8">
        <span>{user.posts.length} posts</span>
        {/* <FollowersModal followingNum={user.following.length} followingUsers={following} /> */}
        <span>{user.followers.length} followers</span>
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-bold">{user.name}</span>
        <span>{user.bio}</span>
      </div>
    </div>
  </div>
  <div className="h-full w-full flex flex-col items-center ">
    <div className="flex gap-[4.2rem] basis-[5%] mt-2 text-[0.9rem] ">
      <span className="flex gap-2 items-center">
        <Grid3X3 height={15} width={15} /> Posts
      </span>
      <span className="flex gap-2 items-center">
        <Bookmark height={15} width={15} /> Saved
      </span>
    </div>
    <div className="h-full w-[85%] ">
      <Posts userId={user._id.toString()} />
    </div>
  </div>
</div>
  )
}
}