"use client"
import {z} from "zod"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { createThread } from "@/lib/actions/threadActions/createThread"
import { toast } from "sonner"
 

const createThreadFormSchema= z.object({
  title:z.string().nonempty().min(3).max(20),
  description: z.string().nonempty(),
})
export default function CreateThreadModal() {
  const [open,setOpen] =useState(false)
  const [isMounted,setMounted] = useState(false)
  const form = useForm({
    resolver:zodResolver(createThreadFormSchema),
    defaultValues:{
      title:"",
      threadImage:"",
      description:"", 
    }
  })
  useEffect(()=>{
    setMounted(true)
  },[])

  async function onSubmit(values:z.infer<typeof createThreadFormSchema>){
    const createThreadPromise= new Promise<void>(async (resolve, reject) =>{
      try{
        await createThread({title:values.title, description:values.description})
        resolve()
        form.reset()
        setOpen(false)

      }catch(err){
        reject(err)

      }

    })
    toast.promise(createThreadPromise, {
      loading: 'creating thread',
      success: "Thread created",
      error: 'Error', 
    });
  

  }
  if(!isMounted) return null
  return (
  
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button  variant="outline">Create Thread</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Thread</DialogTitle>
              <DialogDescription>
                Got something on your mind? Post it!
              </DialogDescription>
            </DialogHeader>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
          control={form.control}
          name="threadImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input type="file" accept="image/*" className="cursor-pointer" placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thread title</FormLabel>
              <FormControl>
                <Input type="text" placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea rows={5} placeholder="Enter Description here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <DialogFooter>
            <Button type="submit">Create</Button>
          </DialogFooter>
      </form>

    </Form>
           
          </DialogContent>
        </Dialog>
      )
    }

