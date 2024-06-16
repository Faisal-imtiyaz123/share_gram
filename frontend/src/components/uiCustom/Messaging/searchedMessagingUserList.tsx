import { messageUsersDetails } from "@/lib/types/messageTypes";
import MessageUser from "./MessageUser";


export default function SearchedMessagingUserList({messageUsersArr}:{messageUsersArr:messageUsersDetails[]}) {
  return (
    <div className="mt-2 flex flex-col gap-2">
        {messageUsersArr.map(user=><MessageUser key={user._id.toString()} user={user}/>)}
    </div>
  )
}
