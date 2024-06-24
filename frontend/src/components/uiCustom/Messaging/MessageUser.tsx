import { CloudinaryImage } from "../Profile/CloudinaryImage";
import { Link } from "react-router-dom";
import { messageUsersDetails } from "@/lib/types/messageTypes";
import { imgPublicId } from "@/lib/utils";

export default function MessageUser({user}:{user:messageUsersDetails}) {
  const publicId = imgPublicId(user.profilePhoto?user.profilePhoto:"")
  return (
    <div className="">
        <Link className="flex h-[4rem] hover:bg-gray-100 p-2 gap-4" to={`/message/${user._id.toString()}`}>
         <div className="rounded-full w-[3rem] h-[3rem] relative border border-gray-300 ">
        <CloudinaryImage className="rounded-full h-full w-full object-contain" publicId={publicId}/> 
         </div>
         <div className="flex flex-col ">

         <span className="text-gray-800 mt-2 text-sm ">
        {user.name || "name"}
         </span>
         <span className="text-sm">
          {user.username || "username"}
         </span>
         </div>
        </Link>
    </div>
  )
}
