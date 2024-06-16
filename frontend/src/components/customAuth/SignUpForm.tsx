import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {useForm} from "react-hook-form"
import { useState } from "react"
import { trpc } from "@/lib/trpc"
import toast from "react-hot-toast"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  confirmPassword: z.string().min(8, { message: "Confirm password must be at least 8 characters" })
    // Add password confirmation validation
}).refine((values)=>{
  return values.password === values.confirmPassword,{
    path: ['confirmPassword'],
    message:"Passwords do not match"
  }
})

export default function SignUpForm() {
  // const [errors,setErrors]=useState<{path:string,error:string}[]>([])
  const mutatation = trpc.auth.signUp.useMutation({
    onError:(error)=>{
      toast.error(`Sign up failed: ${error.message}`)
    },
    onSuccess:()=>{
      toast.success("Sign up successful")
    }
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: ""
    },
  })


  function onSubmit(values: z.infer<typeof formSchema>) {
    mutatation.mutate(values)
  }

  return (
    <div className="flex justify-center h-screen">

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-[40vw] mt-[5rem] shadow-lg h-[50vh] p-4 border-2 rounded-lg">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your username" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Enter your password" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input placeholder="Confirm your password" {...field} />
              </FormControl>
              <FormDescription>
                {/* {errors.includes({path:"confirmPassword"})} */}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
    </div>
  )
}
