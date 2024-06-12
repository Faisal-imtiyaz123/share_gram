
import { Button } from "@/components/ui/button";
import { toggleFollow } from "@/lib/actions/otherUsers/toggleFollow";
import {otherUser } from "@/lib/types/otherUsersTypes";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import FollowingButton from "./FollowingButton";


export default function FollowingUser({followingUser}:{followingUser:otherUser}) {

  return (
    <Link href={`/${followingUser._id.toString()}`}>
    <div className="flex gap-4 h-full">
        <div>
            <Image alt="photo" priority src={followingUser.image!} width={32} height={32}/>
        </div>
        <div className="flex flex-col gap-2  grow">
            <span>{followingUser.username}</span>
            <span>{followingUser.name}</span>
        </div>
       {/* <FollowingButton userId={followingUser._id.toString()}/> */}
    </div>
    </Link>
  )
}
