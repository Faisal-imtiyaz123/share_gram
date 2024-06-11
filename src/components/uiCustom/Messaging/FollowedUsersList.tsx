import { followed } from "@/lib/types/otherUsersTypes";


export default function FollowedUsersList({followedUsers}:{followedUsers:followed}) {
  return (
    <div>
        {followedUsers.map((followedUser)=>followedUser.name)}
    </div>
  )
}
