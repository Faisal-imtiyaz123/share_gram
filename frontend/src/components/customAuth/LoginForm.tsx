import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
import { trpc } from "@/lib/trpc"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
  })
})
export function LoginForm() {
  const navigate = useNavigate()
  // const {data:curentUser}= trpc.auth.currentUser.useQuery()
  const mutatation = trpc.auth.login.useMutation(
    {
      onSuccess:(data)=>{
      localStorage.setItem('auth',data.token)
      navigate('/')
      }
    ,
    onError:(err)=>{
      toast.error(err.message)
    }
  }
  )
  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: ""
    },
  })
  // useEffect(()=>{
  //   if(curentUser) navigate('/')
  //   },[navigate,curentUser]);

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    mutatation.mutate(values)

}

  return (
    <div className="flex justify-center mt-[8rem] h-screen">
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-[40vw] h-[40vh] shadow-lg p-4 border-2 rounded-lg space-y-6">
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input placeholder="shadcn" {...field} />
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
      <Button type="submit">Submit</Button>
    </form>
  </Form>
    </div>
)
}
