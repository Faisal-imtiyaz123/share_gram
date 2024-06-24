import { CloudinaryImage } from "@/components/uiCustom/Profile/CloudinaryImage";
import Posts from "@/components/uiCustom/Profile/Posts";
import { imgPublicId } from "@/lib/utils";
import { Bookmark, Grid3X3 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditProfileModal from "@/components/uiCustom/Modals/EditProfileModal";
import useCurrentUser from "@/lib/hooks/useCurrentUser";

export default function MyProfilePage() {
  const { data: currentUser } = useCurrentUser();
  if (!currentUser) return null;
  const publicId = imgPublicId(currentUser?.user.profilePicture);

  return (
    <div className="flex flex-col h-full w-full items-center">
      <div className="flex w-[85%] basis-[30%] border-b">
        <div className="basis-[40%] flex items-center justify-center">
          <CloudinaryImage publicId={publicId} height={128} width={128} />
        </div>
        <div className="flex flex-col gap-6">
          <div className="mt-6 flex gap-4">
            <span className="text-xl">{}</span>
            <div className="flex gap-2">
              <button className="p-1 px-4 bg-gray-100 rounded-lg">
                <Dialog>
                  <DialogTrigger>Edit Profile</DialogTrigger>
                  <DialogContent >
                   <EditProfileModal/>
                  </DialogContent>
                </Dialog>
              </button>
              <button className="p-1 px-4 bg-gray-100 rounded-lg">
                View Archive
              </button>
            </div>
          </div>

          <div className="flex gap-8">
            <span>{currentUser.user.posts.length} posts</span>
            {/* <FollowersModal followingNum={user.following.length} followingUsers={following} /> */}
            <span>{currentUser.user.followers.length} followers</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-bold">{currentUser.user.name}</span>
            <span>{currentUser.user.bio}</span>
          </div>
        </div>
      </div>
      <div className="h-full w-full flex flex-col items-center ">
        <div className="flex gap-[4.2rem] basis-[5%] mt-2 text-[0.9rem] ">
          <span className="flex gap-2 items-center">
            <Grid3X3 height={15} width={15} /> Posts
          </span>
          <span className="flex gap-2 items-center">
            <Bookmark height={15} width={15} /> Saved
          </span>
        </div>
        <div className="h-full mt-4 w-[85%] overflow-scroll">
          <Posts />
        </div>
      </div>
    </div>
  );
}
