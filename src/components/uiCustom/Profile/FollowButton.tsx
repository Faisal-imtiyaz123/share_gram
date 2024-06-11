"use client"

import { follow } from "@/lib/actions/FriendsActions/follow"

export default function FollowButton({otherUserId}:{otherUserId:string}) {
 async function handleFollow(){
    await follow(otherUserId)
 }
 
  return (
    <button onClick={handleFollow} className=" px-4 bg-blue-500 text-white rounded-lg">
              Follow
    </button>
  )
}
