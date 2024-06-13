import { Form,FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { UserValidation } from "@/lib/validations/user"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { useForm} from "react-hook-form"
import { Button } from "@/components/ui/button"
import {z} from "zod"
import { ChangeEvent, useState } from "react"
// import { isBase64Image } from "@/lib/utils"
import { useUploadThing } from "@/lib/uploadthing"




export default function ProfileForm() {
  const[files,setFiles] = useState<File[]>([])
  const {startUpload} = useUploadThing("media")
  const form = useForm({
    resolver:zodResolver(UserValidation),
    defaultValues:{
        profile_photo:"",
        name:"",
        username:"",
        bio:"",

    }
  })
  function handleImage(e:ChangeEvent<HTMLInputElement>,fieldChange:(value:string) =>void){
    // e.preventDefault()
    // const fileReader = new FileReader()
    // if(e.target.files && e.target.files.length>0){
    //   const file = e.target.files[0]
    //   setFiles(Array.from(e.target.files))
    //   if(!file.type.includes("image")) return

    //   fileReader.onload = async (event) =>{
    //     const imageDataUrl = event.target?.result?.toString() || ""
    //     fieldChange(imageDataUrl)
         
    //   }
    //   fileReader.readAsDataURL(file)

    // }

  }
  async function onSubmit(values:z.infer<typeof UserValidation>){
    // const blob = values.profile_photo
    // const hasImageChanged = isBase64Image(blob)
    // if(hasImageChanged){
    //   const imgRes = await startUpload(files)
    //   if(imgRes && imgRes[0].url){
    //     values.profile_photo = imgRes[0].url
    //   }
      
    }
   
   

    

  }
   return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="border-gray-400 border p-4 rounded-md space-y-3 w-[45rem] h-[40rem]">
      <FormField
        control={form.control}
        name="profile_photo"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center gap-2">

            <FormLabel>
               </FormLabel>
            <FormControl>
              <Input type="file" accept="image/*" placeholder="shadcn" className="cursor-pointer" onChange={(e)=>handleImage(e,field.onChange)} />
            </FormControl>
              </div>
            <FormMessage />
          </FormItem>
        )}
      />
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
           

            <FormLabel>
              Bio
             </FormLabel>
            <FormControl>
            </FormControl>
             
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
