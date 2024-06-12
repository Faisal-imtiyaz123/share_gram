
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DbThread } from "@/lib/types/threadTypes";
import DeleteThreadButton from "./deleteThreadButton";
import CommentForm from "../Forms/commentForm";
import { fetchUser } from "@/lib/actions/userActions/fetchUser";
import { DbUser } from "@/lib/types/userTypes";


export default async function Thread({thread}:{thread:DbThread}) {
  const user = await fetchUser() as DbUser
  return (
  <Card>
  <CardHeader>
    <div className="flex justify-between">
    <CardTitle>{thread.title}</CardTitle>
    <DeleteThreadButton threadId={thread._id}/>
    </div>
    <CardDescription></CardDescription>
  </CardHeader>
  <CardContent>
    <p>{thread.description}</p>
  </CardContent>
  <CommentForm threadId={thread._id} userImage={user.image}/>
</Card>

  )
}
