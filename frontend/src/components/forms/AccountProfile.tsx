import { Form,FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { useForm} from "react-hook-form"
import { Button } from "@/components/ui/button"
import {z} from "zod"
import { Textarea } from "../ui/textarea"
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import CloudinaryUploadWidget from "../uiCustom/Profile/UploadWidget"
import { useState } from "react"
import { trpc } from "@/lib/trpc"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"




const FormSchema = z.object({
    name: z.string().min(3, {message: "name must be at least 3 characters."}),
    bio: z.string().min(20, { message: "Bio must be at least 20 letters."}),
    username: z.string().min(3, {message: "username must be at least 3 characters."}),


})


export default function ProfileForm() {
  const cld = new Cloudinary({cloud: {cloudName: 'dywebzylz'}});
  const navigate = useNavigate()
  const mutation = trpc.user.createProfileDetails.useMutation({
    onError:()=>{
      toast.error("Profile creation failed")
    },
    onSuccess:()=>{
      toast.success("Profile created successfully"),
      navigate('/')
    }
  })
  const [UploadedImgUrl, setUploadedImgUrl] = useState<string>("")
  const img = cld.image('cld-sample-5')
        .format('auto') // Optimize delivery by resizing and applying auto-format and auto-quality
        .quality('auto')
        .resize(auto().gravity(autoGravity()).width(500).height(500)); // Transform the image: auto-crop to square aspect_ratio

  const form = useForm({
    resolver:zodResolver(FormSchema),
    defaultValues:{
        name:"",
        username:"",
        bio:"",

    }
  })
  function onSubmit(values:z.infer<typeof FormSchema>){
    const payload = {...values, profilePicture:UploadedImgUrl}
    mutation.mutate(payload)
  }
   
   return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="border-gray-400 border p-4 rounded-md space-y-3 w-[45rem] h-[40rem]">
       <div>
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
              Username
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
  )
}
