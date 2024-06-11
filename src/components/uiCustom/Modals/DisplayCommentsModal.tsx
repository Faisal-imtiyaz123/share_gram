import { fetchComments } from "@/lib/actions/commentActions/fetchComments"
import { CommentObj} from "@/lib/types/commenTypes"
import { threadId } from "@/lib/types/threadTypes"
import CommentModalItem from "../Comments/CommentModalItem"



export default async function DisplayCommentsModal({threadId}:{threadId:threadId}) {
  const {comments} = await fetchComments(threadId) as CommentObj
 
  return (
   

    <div>
      {comments.map(commentObj=> <CommentModalItem key={commentObj._id.toString()} props={{comment:commentObj.comment,commentId:commentObj._id.toString(),threadId:threadId.toString()}} />)}

    </div>
 
  )
}
