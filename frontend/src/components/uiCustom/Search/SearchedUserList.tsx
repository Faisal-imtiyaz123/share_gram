import { DbUser } from "@/lib/types/userTypes";
import SearchedUser from "./SearchedUser";
interface Props{
  matchingUsers: DbUser[]
}

export default function SearchedUserList(props:Props) {
  const {matchingUsers} = props;
  return (
    <div className="flex w-full h-full flex-col  ">
      {matchingUsers.length==0 && 
      <span className=" text-sm font-bold">Recent</span>
      }
      {matchingUsers.map(user=><SearchedUser key={user._id.toString()} user={user} />)}
    </div>
  )
}
