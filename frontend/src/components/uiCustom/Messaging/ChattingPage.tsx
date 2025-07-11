import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { pusherClient } from "@/lib/pusher"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { z} from "zod"
import { Info, SendHorizonal } from "lucide-react"
import { Message } from "@/lib/types/messageTypes"
import MessageItem from "./MessageItem"
import { trpc } from "@/lib/trpc"
import { ObjectId } from "mongodb"
import { useParams } from "react-router-dom"
import MessageInfoModal from "./MessagInfoModal"

const messageSchema= z.object({
    message:z.string()
})

export default function ChattingPage({recieverId,senderId,messagesArr}:{recieverId:string,senderId:string,messagesArr:Message[]}) {
  const [messages,setMessages] = useState<Message[]>(messagesArr)
  const mutation = trpc.message.sendMessage.useMutation()
  const messagesDivRef = useRef<HTMLDivElement>(null)
  const params = useParams()
  const {data:user} = trpc.user.fetchUser.useQuery({userId:params.id!},{enabled:!!params.id})
  const [showModal,setShowModal] = useState<boolean>(false)
  
  const scrollToBottom = () => {
    if (messagesDivRef.current) {
      messagesDivRef.current.scrollTop = messagesDivRef.current.scrollHeight;
    }
  };
  const form = useForm({
    resolver:zodResolver(messageSchema),
    defaultValues:{
        message:""
    }
  })
  useEffect(()=>{
    pusherClient.subscribe(recieverId)
    pusherClient.subscribe('messages')
    pusherClient.bind('delete-message',async (obj:{messageId:ObjectId})=>{
      setMessages((prevMessages) =>
        prevMessages.filter((message) => message._id.toString() !== obj.messageId.toString())
      );
  })
    pusherClient.bind('message',async (message:Message)=>{
        setMessages([...messages,message])
    })
  },[recieverId,messages])

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  

  async function onSubmit(values:z.infer<typeof messageSchema>){
    mutation.mutate({recieverId:recieverId, senderId:senderId, message:values.message})
    form.setValue('message','')
    

  }

  
  return (
      <div  className="flex w-full h-[100vh] flex-col gap-2 p-1">
        <div className="border-b-2 p-3 flex justify-between items-center">
          <div className="flex gap-4 items-center">
           <img className="rounded-full h-[4rem] w-[4rem]" alt="profilePicture" src={user?.profilePicture} />
           <span className="text-lg">{user?.appUsername}</span>
          </div>
          <div>
           <Info onClick={()=>setShowModal(!showModal)} size={40}/>
           {showModal && <MessageInfoModal userId={user!._id.toString()} showModal={showModal} setShowModal={setShowModal}/>}
          </div>
        </div>
      <div ref={messagesDivRef} style={{overflowY:"auto"}} className="flex mb-4 mt-2 flex-col gap-2 basis-[90%]" >
        <>
       {messages.map((message,index)=><MessageItem index={index} key={index} messageObj={message}/>)}
        </>
      </div>
    <div  >
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex items-center">
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormControl className="w-[40rem]">
                <Input className=" border-black  w-[52rem] mb-2 rounded-xl" placeholder="write a message..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>

        { form.getValues("message")?
        <button className="absolute hover: right-2 bottom-2" type="submit">
          <SendHorizonal >send</SendHorizonal>
        </button>:""}
        </div>
      </form>
    </Form>
    </div>
      </div>
 
  )
}
