import { Form,FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { useForm} from "react-hook-form"
import { Button } from "@/components/ui/button"
import {z} from "zod"
import { Textarea } from "../ui/textarea"
import CloudinaryUploadWidget from "../uiCustom/Profile/UploadWidget"
import { useEffect, useState } from "react"
import { trpc } from "@/lib/trpc"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import  useCurrentUser from "@/lib/hooks/useCurrentUser"



const FormSchema = z.object({
    name: z.string().min(3, {message: "name must be at least 3 characters."}),
    bio: z.string().min(20, { message: "Bio must be at least 20 letters."}),
    username: z.string().min(3, {message: "username must be at least 3 characters."}),


})


export default function ProfileForm() {
  const currentUserQuery = useCurrentUser()
  const navigate = useNavigate()
  const mutation = trpc.user.createProfileDetails.useMutation({
    onError:()=>{
      toast.dismiss(),
      toast.error("Profile creation failed")
    },
    onSuccess:()=>{
      toast.dismiss(),
      toast.success("Profile created successfully"),
      navigate('/')
    },
    onMutate:()=>{
      toast.loading("Creating Profile")
    }
  })
  const [UploadedImgUrl, setUploadedImgUrl] = useState<string>("")
  const form = useForm({
    resolver:zodResolver(FormSchema),
    defaultValues:{
        name:"",
        username:"",
        bio:"",

    }
  })
  useEffect(()=>{
    if(currentUserQuery.data?.user.onboarded){
      toast.success("Profile already created, redirecting to home")
      navigate('/')
    }

  },[navigate, currentUserQuery.data])
  function onSubmit(values:z.infer<typeof FormSchema>){
    const payload = {...values, profilePicture:UploadedImgUrl}
    mutation.mutate(payload)
  }
   
   return (
    <div className="fixed w-[100vw] h-[100vh] top-0 left-0 bg-black z-[1000] bg-opacity-50 flex justify-center items-center">
    <div  className="bg-white rounded-lg shadow-lg">
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="border-gray-400 border p-4 rounded-md space-y-3 w-[45rem] h-[40rem]">
       <div className="flex justify-between items-center">
        <span> Choose Proifle Picture </span>
        <CloudinaryUploadWidget setUploadedImageUrl={setUploadedImgUrl}/>
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
              <Input type="text"  {...field}  />
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
              <Input type="text"  {...field}  />
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
                  placeholder="Tell us a little bit about yourself"
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
      <div className="flex justify-center">
        <Button className="bg-gray-800 rounded-xl w-full h-14" type="submit">Submit</Button>
       

      </div>
      
    </form>
    </Form>
    </div>
    </div>
  )
}
