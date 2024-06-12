import { otherUser } from "@/lib/types/otherUsersTypes";
import MessageUser from "./MessageUser";


export default function SearchedMessagingUserList({matchingUsers}:{matchingUsers:otherUser[]}) {
  return (
    <div className="mt-2 flex flex-col gap-2">
        {matchingUsers.map(user=><MessageUser key={user._id.toString()} user={user}/>)}
    </div>
  )
}
