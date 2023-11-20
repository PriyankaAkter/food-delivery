"use client";
import { useForm, SubmitHandler, Form } from "react-hook-form";
import { ZodType, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

type formDataType = {
  email: string;
  password: string;
};

const signInSchema: ZodType<formDataType> = z.object({
  email: z.string().min(1, "Email is required"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(3, "Password must be at least 3 characters"),
});

const SignInForm = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const { handleSubmit, register, formState } = useForm<formDataType>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (values: formDataType) => {
    try {
      const signInData = await signIn("credentials", {
        email: values.email,
        password: values.password,

        redirect: false,
      });

      if (signInData?.ok) {
        router.refresh();
        router.push("/dashboard");
        // console.log("Data get successfully");
      }
    } catch (error) {
      console.error(error);

      toast({
        title: "Error",
        description: "Oops! Something went wrong",
        // action: (
        //   <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
        // ),
      });
    }
  };

  const errors = formState.errors;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[500px] mx-auto py-10 grid gap-4 px-8 border"
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
      {/* <input type="submit" /> */}
      <button type="submit" className="bg-black text-white py-3">
        Sign in
      </button>

      {/* <div className="grid grid-cols-3 gap-3 place-items-center">
         <div className="w-full h-[1px] bg-gray-500"></div>
         <h6>Or</h6>
         <div className="w-full h-[1px] bg-gray-500"></div>
      </div>
      <button type="button" className="bg-black text-white py-3" onClick={()=>signIn("google", {
        
        redirect: false
      })}>
        Sign in with Google
      </button>

      
      <button type="button" className="bg-black text-white py-3" onClick={()=>signIn("github", {
        
        redirect: false
      })}>
        Sign in with Github
      </button> */}
    </form>
  );
};

export default SignInForm;
