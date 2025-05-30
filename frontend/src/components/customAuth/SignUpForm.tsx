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
import { useForm } from "react-hook-form"
import { trpc } from "@/lib/trpc"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

function getPasswordStrength(password: string) {
  const hasMinLength = password.length >= 8;
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[\$!%*?&@.]/.test(password); // updated to include '.'

  if (hasMinLength && hasLowercase && hasUppercase && hasNumber && hasSpecialChar) {
    return 5;
  }

  let strength = 0;
  if (hasMinLength) strength += 1;
  if (hasLowercase) strength += 1;
  if (hasUppercase) strength += 1;
  if (hasNumber) strength += 1;
  if (hasSpecialChar) strength += 1;

  return strength;
}

function PasswordStrengthIndicator({ password }: { password: string }) {
  const strength = getPasswordStrength(password);
  const color = strength < 2 ? 'bg-red-500' : strength < 4 ? 'bg-yellow-500' : 'bg-green-500';
  const width = `${(strength / 5) * 100}%`;

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
  password: z.string().min(8).regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\$!%*?&@.])[A-Za-z\d@$!%*?&.]{8,}$/,
    {
      message:
        "Password must be at least 8 characters, include uppercase, lowercase, a number, and one of $!%*?&@.",
    }
  ),
  confirmPassword: z.string().min(8, {
    message: "Confirm password must be at least 8 characters",
  }),
});

export default function SignUpForm() {
  const navigate = useNavigate();
  const mutation = trpc.auth.signUp.useMutation({
    onMutate: () => {
      toast.loading("Signing up...");
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(`Sign up failed: ${error.message}`);
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Sign up successful, redirecting to login...");
      navigate("/login");
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.confirmPassword !== values.password)
      return toast.error("Passwords don't match");
    mutation.mutate(values);
  }

  return (
    <div className="flex justify-center h-screen">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[40vw] mt-[5rem] shadow-lg max-h-[27rem] p-4 border-2 rounded-lg space-y-6"
        >
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
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                    <PasswordStrengthIndicator password={field.value} />
                  </div>
                </FormControl>
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
                  <Input
                    type="password"
                    placeholder="Confirm your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
