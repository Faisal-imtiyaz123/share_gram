import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { following } from "../types/otherUsersTypes"
import FollowingUser from "@/components/uiCustom/Profile/FollowingUser"


export default function FollowingModal({followingNum,followingUsers}:{followingNum:number,followingUsers:following}) {
  console.log(followingUsers)
  return (
        <Dialog>
          <DialogTrigger asChild>
            <span>{followingNum} following</span>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] flex flex-col gap-2">
          <div className="border-b text-center font-semibold" >Followers</div>
          <div className="mt-2">

           {followingUsers.map((followingUser,index)=>
           <FollowingUser followingUser={followingUser} key={index}/>
           )}
          </div>
          </DialogContent>
        </Dialog>
      
  
    
  )
}
