"use client"

import { toggleFollow } from "@/lib/actions/otherUsers/toggleFollow"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  userId:string,
  isFollowed:boolean
}
export default function FollowingButton({className,...props}:ButtonProps) {
const [following,setFollowing] = useState<boolean>(props.isFollowed)
async function toggleFollowUser(){
        setFollowing(!following)
        await toggleFollow(props.userId,!following)
    
}
  return (
    <button {...props} className={cn(`${following?"bg-gray-400":"bg-blue-500"} text-white`,className)} onClick={toggleFollowUser} >
      {following?"Following":"Follow"}
      </button>
  )
}
