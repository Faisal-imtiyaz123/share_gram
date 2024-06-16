import ChattingPage from "@/components/uiCustom/Messaging/ChattingPage";
import { trpc } from "@/lib/trpc";
import { Message } from "@/lib/types/messageTypes";
import { useParams } from "react-router-dom";


export default function Message_id() {
  const params = useParams()
  if(!params.id) return null
  const {data:messages} = trpc.message.fetchMessages.useQuery({recieverId: params.id})
  const {data:currentUser} = trpc.auth.currentUser.useQuery()
  if(!currentUser || !messages) return null
  const messagesArr:Message[]=[]
  messages.map((message)=>{
    if(message.senderId.toString() == currentUser.user._id.toString() || message.receiverId.toString() == currentUser.user._id.toString()){
      if(message.senderId.toString() == currentUser.user._id.toString()){
        const newMessage = {...message, sent:true}
        messagesArr.push(newMessage)
      }else{
        const newMessage = {...message,sent:false}
        messagesArr.push(newMessage)
      }
    }
  })
  return (
    <>
    <ChattingPage senderId={currentUser?.user._id.toString()} recieverId={params.id} messagesArr={messagesArr}  />
    </>
  )
}
