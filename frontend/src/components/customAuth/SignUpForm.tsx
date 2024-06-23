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
// @ts-expect-error useForm Error
import {useForm} from "react-hook-form"
import { trpc } from "@/lib/trpc"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"


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
  const navigate = useNavigate()
  const mutatation = trpc.auth.signUp.useMutation({
    onMutate:()=>{
      toast.loading("Signing up...")
    },
    onError:(error)=>{
      toast.dismiss()
      toast.error(`Sign up failed: ${error.message}`)
    },
    onSuccess:()=>{
      toast.dismiss()
      toast.success("Sign up successful, redirecting to login...")
      navigate("/login")
       
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-[40vw] mt-[5rem] shadow-lg h-[25rem] p-4 border-2 rounded-lg space-y-6">
        <FormField
          control={form.control}
          name="username"
          // @ts-expect-error useForm Error
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
          // @ts-expect-error useForm Error
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
          // @ts-expect-error useForm Error
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
