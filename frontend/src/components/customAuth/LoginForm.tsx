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
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: ""
    },
  })

  const {mutate,data,isSuccess} = trpc.auth.login.useMutation()

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    mutate(values)
    isSuccess && data.token && localStorage.setItem('auth',data.token)
    navigate('/home')

}

  return (
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
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
)
}
