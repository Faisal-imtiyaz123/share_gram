"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createComment } from "@/lib/actions/commentActions/createComment"
import { threadId } from "@/lib/types/threadTypes"
import { authorId } from "@/lib/types/userTypes"
import { commentValidation } from "@/lib/validations/comment"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { useForm } from "react-hook-form"
import {z} from "zod"



export default function CommentForm({userImage,threadId}:{userImage:string,threadId:threadId}) {
 const form = useForm({
    resolver:zodResolver(commentValidation),
    defaultValues:{
        comment:""
    }
 })
 async function onSubmit(values:z.infer<typeof commentValidation>){
    await createComment(values.comment,threadId)
 }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel><Image alt="user profile" src={userImage} height={24} width={24}/></FormLabel>
              <FormControl>
                <Input placeholder="Add a comment" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        { form.getValues("comment")?
        <Button type="submit">Comment</Button>:""}
      </form>
    </Form>
  )
}
