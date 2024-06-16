import { trpc } from "@/lib/trpc";
import SearchedMessagingUserList from "./searchedMessagingUserList";
import { messageUsers } from "@/lib/types/messageTypes";

export default function MainMessagingPage() {
  const {data}:{data:messageUsers[]|undefined} = trpc.message.fetchMessageUsers.useQuery()
  if(!data) return null
  
 
  
  return (
    <div className="basis-[25%] border-r h-screen">
      <div className="flex flex-col p-4 gap-2">
        <h1 className="text-xl bold">Messages</h1>
        {/* <Input
          className="h-[2rem]"
          onChange={async (e) => {
            const regExp = new RegExp(e.target.value,"i")
            setMatchingUsers(e.target.value?
              (followingUsers?.filter((followingUser)=>followingUser.name.match(regExp) || followingUser.username.match(regExp))):
              [])
  
          }}
        /> */}
      </div>
      <SearchedMessagingUserList messageUsersArr={data[0]?.messageUsersDetails}/>
    </div>
  );
}
