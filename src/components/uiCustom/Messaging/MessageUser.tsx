import {otherUser } from "@/lib/types/otherUsersTypes";
import Image from "next/image";
import Link from "next/link";

export default function MessageUser({user}:{user:otherUser}) {
  if(!user.image) return null
  return (
    <div className="">
        <Link className="flex h-[4rem] hover:bg-gray-100 p-2 gap-4" href={`/home/messaging/${user._id.toString()}`}>
         <div className="rounded-full w-[3rem] h-[3rem] relative border border-gray-300 ">

        <Image priority alt="user-image" fill className="rounded-full" src={user.image}/> 
         </div>
         <span className="text-gray-800 mt-2 text-sm ">

        {user.name}
         </span>
        </Link>
    </div>
  )
}
