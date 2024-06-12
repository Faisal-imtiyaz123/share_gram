"use client"


import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { sendMessage } from "@/lib/actions/messaging/sendMessage"
import { pusherClient } from "@/lib/pusher"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { z} from "zod"
import Message from "./Message"
import { SendHorizonal } from "lucide-react"

const messageSchema= z.object({
    message:z.string()
})

export default function MainMessagingPage({recieverId,senderId,messagesArr}:{recieverId:string,senderId:string,messagesArr:{message:string,sent?:boolean,id:string}[]}) {
  const [messages,setMessages] = useState<{message:string,sent?:boolean,id:string}[]>(messagesArr)
  const inputRef = useRef<HTMLDivElement>(null)
 
  const form = useForm({
    resolver:zodResolver(messageSchema),
    defaultValues:{
        message:""
    }
  })
  useEffect(()=>{
    inputRef.current?.scrollIntoView()
    pusherClient.subscribe(recieverId)
    pusherClient.bind('message',async (message:{message:string,sent:boolean,id:string})=>{
        console.log("event recieved")
        setMessages([...messages,message])
    })
    

  },[recieverId,messages])

  async function onSubmit(values:z.infer<typeof messageSchema>){
    await sendMessage(values.message,senderId,recieverId)
    form.reset()
    

  }

  
  return (
    <>
      <div className="basis-[94%] flex flex-col justify-end p-2 pb-4 w-full" >
          
       {messages.map(messageObj=><Message key={messageObj.id} messageObj={messageObj}/>)}
        </div>



      <div ref={inputRef} className="relative ">
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex items-center">
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormControl className="w-[40rem]">
                <Input className=" border-gray-300  w-[52rem]  rounded-xl" placeholder="" {...field} />
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
    </>
  )
}
