import Image from "next/image";
import Link from "next/link";

export default function SearchedUser({
  user,
}: {
  user: { userId: string; username: string; userImg: string };
}) {
  return (
    <Link
      className="flex grow h-[5rem] hover:bg-gray-100 p-4 gap-4"
      href={`/home/profile/${user.userId}`}
    >
      <div className="rounded-full  w-[3rem] h-[3rem] relative border border-gray-300 ">
        <Image
          priority
          alt="user-image"
          fill
          className="rounded-full"
          src={user.userImg}
        />
      </div>
 <span className="mt-1 text-gray-800">

      {user.username}
 </span>
    </Link>
  );
}
