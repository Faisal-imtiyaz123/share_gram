"use client";

import { Input } from "@/components/ui/input";

import { otherUser } from "@/lib/types/otherUsersTypes";

import React, { useEffect, useState } from "react";
import SearchedMessagingUserList from "./searchedMessagingUserList";

export default function MessagingSideBar() {

  const [matchingUsers,setMatchingUsers] = useState<otherUser[]>([])
  const [followingUsers,setFollowingUsers] = useState<otherUser[]>([])

  useEffect(()=>{
    async function getFollowingUsers(){
      const res = await fetch('/api/search',{method:"GET"})
      const data = await res.json()
      setFollowingUsers(data?.data?.following)
    }
    getFollowingUsers()

  },[])
  
  return (
    <div className="w-[18rem] border-r h-screen">
      <div className="flex flex-col p-4 gap-2">
        <h1 className="text-xl bold">Messages</h1>
        <Input
          className="h-[2rem]"
          onChange={async (e) => {
            const regExp = new RegExp(e.target.value,"i")
            setMatchingUsers(e.target.value?
              (followingUsers?.filter((followingUser)=>followingUser.name.match(regExp) || followingUser.username.match(regExp))):
              [])
  
          
          }}
        />
      </div>
      <SearchedMessagingUserList  matchingUsers={matchingUsers}/>
    </div>
  );
}
