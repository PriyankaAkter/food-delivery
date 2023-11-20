"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { ZodType, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import {signIn} from 'next-auth/react'
import { Button } from "@/components/ui/button"
import {
Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

type formDataType = {
  email: string;
  password: string;
};

const signInSchema: ZodType<formDataType> = z
  .object({
    
    email: z.string().min(1, "Email is required"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(3, "Password must be at least 3 characters"),
  })


const SignIn = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })
 
  
//   function onSubmit(values: z.infer<typeof signInSchema>) {
//     console.log(values)
    
//   }

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    const signInData = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false
      });

      console.log({signInData});
      if(signInData?.error){
        console.log(signInData.error);
      }
      else{
        return router.push('/dashboard')
      }

    // try {
      
      
    //   if (signInData?.ok) {
    //     // return router.push('/dash');
    //     console.log("Data get successfully");
        
    //   }
    // } catch (error) {
    //   console.error("Error during sign-in:", error);
    // }
  };

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>password</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit" className="bg-black text-white py-3">Sign in</Button>
      
    </form>
  </Form>
  );
};

export default SignIn;
