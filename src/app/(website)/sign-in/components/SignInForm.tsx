"use client";
import { useForm, SubmitHandler, Form } from "react-hook-form";
import { ZodType, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {signIn} from 'next-auth/react'
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link";


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


const SignInForm = () => {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState
  } = useForm<formDataType>({ resolver: zodResolver(signInSchema) });

  const onSubmit = async (values:formDataType) => {

    try {
      const signInData = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false
      });
      
      if (signInData?.ok) {
        
        router.refresh()
        router.push('/');
        // console.log("Data get successfully");
        
      }
      
    } catch (error) {
      console.error(error);
      // toast("Error Occur!");
    }
  };

  const errors = formState.errors

  return (
  
     <form
    onSubmit={handleSubmit(onSubmit)}
    
      className="w-full sm:w-[500px] mx-auto py-10 grid gap-4 px-8 border"
    >
      <h6 className="">Log In Form</h6>
      <div className=" flex flex-col gap-2">
        <label htmlFor="email">Email</label>
        <input
          {...register("email")}
          type="email"
          className="border border-gray-500 w-full pl-2 py-2"
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </div>
      <div className=" flex flex-col gap-2">
        <label htmlFor="password">Password</label>
        <input
          {...register("password")}
          type="password"
          className="border border-gray-500 w-full pl-2 py-2"
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </div>
      <input className="bg-black text-white py-3 cursor-pointer mt-6" type="submit" />
      {/* <button type="submit" className="bg-black text-white py-3">
        Sign in
      </button> */}
      <p className="text-center">Haven’t any account? <Link className="font-semibold" href='/sign-up'>Sign Up</Link></p>
      
    </form>
   
  );
};

export default SignInForm;
