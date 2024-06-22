import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { pusherClient } from "@/lib/pusher"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useRef, useState } from "react"
  // @ts-expect-error useForm Error
import { useForm } from "react-hook-form"
import { z} from "zod"
import { SendHorizonal } from "lucide-react"
import { Message } from "@/lib/types/messageTypes"
import MessageItem from "./MessageItem"
import { trpc } from "@/lib/trpc"
import { ObjectId } from "mongodb"

const messageSchema= z.object({
    message:z.string()
})

export default function ChattingPage({recieverId,senderId,messagesArr}:{recieverId:string,senderId:string,messagesArr:Message[]}) {
  const [messages,setMessages] = useState<Message[]>(messagesArr)
  const mutation = trpc.message.sendMessage.useMutation()
  const messagesDivRef = useRef<HTMLDivElement>(null)
  
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
    

  }

  
  return (
      <div  className="flex w-full h-[100vh] flex-col gap-2 p-1">
      <div ref={messagesDivRef} style={{overflowY:"auto"}} className="flex mb-4 mt-2 flex-col gap-2 basis-[90%]" >
        <>
       {messages.map((message,index)=><MessageItem key={index} messageObj={message}/>)}
        </>
      </div>
    <div  >
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex items-center">
        <FormField
          control={form.control}
          name="message"
            // @ts-expect-error useForm Error
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormControl className="w-[40rem]">
                <Input className=" border-gray-300  w-[52rem] mb-2 rounded-xl" placeholder="" {...field} />
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
