"use client"

import { Button } from "@/components/ui/button"
import { follow } from "@/lib/actions/FriendsActions/follow"



export default function OtherUserProfile({userId}:{userId:string}) {
  async function handleFollow(){
    await follow(userId)
  }
  return (
    <div>
        <Button onClick={handleFollow}>Follow</Button>
    </div>
  )
}
