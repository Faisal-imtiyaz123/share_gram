import { DbUser } from "@/lib/types/userTypes";
import { Link } from "react-router-dom";



export default function SearchedUser({
  user,
}: {
  user: DbUser
}) {
  return (
    <Link
      className="flex grow h-[5rem] hover:bg-gray-100 p-4 gap-4"
      to={`/home/profile/${user._id.toString()}`}
    >
      <div className="rounded-full  w-[3rem] h-[3rem] relative border border-gray-300 ">
        <img
          alt="user-image"
          className="rounded-full"
          src={user.profilePicture}
        />
      </div>
 <span className="mt-1 text-gray-800">

      {user.username}
 </span>
    </Link>
  );
}
