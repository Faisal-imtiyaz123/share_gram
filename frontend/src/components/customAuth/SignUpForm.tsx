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

function getPasswordStrength(password:string) {
  let strength = 0;
  if (password.length > 5) strength += 1;
  if (password.match(/(?=.*[0-9])/)) strength += 1;
  if (password.match(/(?=.*[A-Z])/)) strength += 1;
  if (password.match(/(?=.*[a-z])/)) strength += 1;
  if (password.match(/(?=.*[!@#$%^&*])/)) strength += 1;
  return strength;
}
function PasswordStrengthIndicator({ password }:{password:string}) {
  const strength = getPasswordStrength(password);
  const color = strength < 2 ? 'bg-red-500' : strength < 4 ? 'bg-yellow-500' : 'bg-green-500';
  const width = `${strength * 20}%`;

  return (
    <div className="w-full bg-gray-300 rounded">
      <div className={`h-1 rounded ${color}`} style={{ width }}></div>
    </div>
  );
}
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message: "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.",
  }),
  confirmPassword: z.string().min(8, { message: "Confirm password must be at least 8 characters" })
});

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
    if(values.confirmPassword!==values.password) return toast.error("Passwords don't match")
    mutatation.mutate(values)
  }

  return (
    <div className="flex justify-center h-screen">

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-[40vw] mt-[5rem] shadow-lg max-h-[27rem] p-4 border-2 rounded-lg space-y-6">
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
                <div className="flex flex-col gap-4">
                <Input type="password" placeholder="Enter your password" {...field} />
                 <PasswordStrengthIndicator password={field.value} />
                </div>
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
                <Input type="password" placeholder="Confirm your password" {...field} />
              </FormControl>
              <FormDescription>
                {/* {errors.includes({path:"confirmPassword"})} */}
              </FormDescription>
              <FormMessage>{form.formState.errors.confirmPassword?.message}</FormMessage>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>

    </Form>
    </div>
  )
}
