import { trpc } from "@/lib/trpc";
import SearchedMessagingUserList from "./searchedMessagingUserList";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { messageUsersDetails } from "@/lib/types/messageTypes";
import { useParams } from "react-router-dom";

export default function MainMessagingPage() {
  const {data,isError,isSuccess,isLoading} = trpc.message.fetchMessageUsers.useQuery()
  const [messageUsers,setMessageUsers] = useState<messageUsersDetails[]>(isSuccess?data[0].messageUsersDetails:[])
  const params = useParams()
  const {data:user} = trpc.user.fetchUser.useQuery({userId:params.id!},{enabled:!!params?.id})
  console.log(messageUsers)
  useEffect(()=>{
    if(isError){
      toast.error("something went wrong")
    }
    if (params.id && user) {
      setMessageUsers((prev) => {
        // Check if the user already exists in the state
        const userExists = prev.some((u) => u._id === user._id.toString());
        if (userExists) {
          return prev; // If user exists, return the previous state without changes
        } else {
          // If user doesn't exist, add the new user
          return [...prev, {
            _id: user._id.toString(),
            username: user.username,
            profilePhoto: user.profilePicture,
            name: user.name
          }];
        }
      });
    }
  },[isError,data,params.id,user])
 
  isLoading && toast.loading('hold on a sec')
  if(isSuccess){
    toast.dismiss()
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
      <SearchedMessagingUserList messageUsersArr={messageUsers}/>
    </div>
  );
}
}
