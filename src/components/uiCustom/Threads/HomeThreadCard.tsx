
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DbThread } from "@/lib/types/threadTypes";
import DeleteThreadButton from "./deleteThreadButton";
import CommentForm from "../Forms/commentForm";
import DisplayThreadAndCommentModal from "../Modals/DisplayThreadAndCommentModal";
import DisplayCommentsModal from "../Modals/DisplayCommentsModal";
import DisplayThreadModal from "./DisplayThreadModal";
import Link from "next/link";






export default async function HomeThreadCard({thread,userImage}:{thread:DbThread,userImage:string}) {
  return (
    <div>
    <Card className="w-[50rem] h-[20rem]">
  <CardHeader>
    <div className="flex justify-between">
    <CardTitle>{thread.title}</CardTitle>
    <DeleteThreadButton threadId={thread._id}/>
    </div>
    <CardDescription></CardDescription>
  </CardHeader>
  <CardContent>
    <p>{thread.description}</p>
    <Link href={`home/thread/${thread._id}`}>View all comments</Link>
  </CardContent>

  <CommentForm userImage={userImage} threadId={thread._id}/>
</Card>
 </div>
  )
}

