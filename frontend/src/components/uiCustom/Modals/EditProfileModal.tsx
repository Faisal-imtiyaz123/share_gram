"use client"

import { Form,FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { useForm} from "react-hook-form"
import { Button } from "@/components/ui/button"
import {z} from "zod"
import { useState } from "react"
import { trpc } from "@/lib/trpc"
import toast from "react-hot-toast"
import { Textarea } from "@/components/ui/textarea"
import axios from "axios"


const FormSchema = z.object({
    name: z.string().min(3, {message: "name must be at least 3 characters."}),
    bio: z.string().min(20, { message: "Bio must be at least 20 letters."}),
    username: z.string().min(3, {message: "username must be at least 3 characters."}),


})

export default function EditProfileModal() {
  const [file, setFile] = useState<File|null>(null)
  const [url,setUrl] = useState<string>("")
  const utils = trpc.useUtils()
  const {data:currentUser}= trpc.auth.currentUser.useQuery()
  const mutation = trpc.user.createProfileDetails.useMutation({
    onError:()=>{
      toast.error(`Profile update failed `)
    },
    onSuccess:()=>{
      toast.success("Profile updated successfully")
      utils.auth.currentUser.refetch()
    }
  })
  const form = useForm({
    resolver:zodResolver(FormSchema),
    defaultValues:{
        name:`${currentUser?.user.name}`,
        username:`${currentUser?.user.appUsername}`,
        bio:`${currentUser?.user.bio}`,

    }
  })
  async function onSubmit(values:z.infer<typeof FormSchema>){
        toast.loading("Updating Profile")
        const formData = new FormData();
        if(!file) return 
        formData.append('file', file)
        formData.append('upload_preset', 'xzsnd6c8'); // Replace with your upload preset
        formData.append('cloud_name', 'dywebzylz'); // Replace with your cloud name
  
        await  axios.post(
          `https://api.cloudinary.com/v1_1/dywebzylz/image/upload`, // Replace with your cloud name
          formData
        ).then(response => {
          setUrl(response.data.secure_url);
          
        }).catch(error => {
          console.error('Error uploading the image:', error);
        });
        const payload = {...values, profilePicture:url||""}
        console.log(payload)
        mutation.mutate(payload)
        toast.dismiss()
  }
  function handleFileUplaod(e:React.ChangeEvent<HTMLInputElement>){
    if(!e.target.files) return
    const file = Array.from(e.target.files)[0]
    setFile(file)
}
   if(!currentUser) return null
   return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="">
       <div className="flex gap-2  items-center">
        <span className="basis-[50%]"> Choose Profile </span>
        <Input  className="mr-2"  onChange={(e)=>handleFileUplaod(e)} type="file" />
       </div>
       <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Name
             </FormLabel>
            <FormControl>
              <Input placeholder={currentUser.user.name} type="text"  {...field}  />
            </FormControl>
             
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>

            <FormLabel>
              What to call you
             </FormLabel>
            <FormControl>
              <Input placeholder={currentUser.user.appUsername} type="text"  {...field}  />
            </FormControl>
             
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={currentUser.user.bio}
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Tell something about you.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      <div className="flex justify-center mt-2">
        <Button className="bg-gray-800 rounded-xl w-full h-14" type="submit">Submit</Button>
      </div>
    </form>
  </Form>
  )
}
