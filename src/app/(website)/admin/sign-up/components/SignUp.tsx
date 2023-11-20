"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { ZodType, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

type formDataType = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const signUpSchema: ZodType<formDataType> = z
  .object({
    username: z.string().min(1, "Username is required"),
    email: z.string().min(1, "Email is required"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(3, "Password must be at least 3 characters"),
    confirmPassword: z
      .string()
      .min(1, "Password is required")
      .min(3, "Password must be at least 3 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password not match",
    path: ["confirmPassword"],
  
  });

const SignUp = () => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<formDataType>({ resolver: zodResolver(signUpSchema) });

  const onSubmit = async (data: formDataType) => {
    console.log("Form data", data);
    try {
      const response = await axios.post("/api/user", {
        username: data.username,
        email: data.email,
        password: data.password,
      });

      if (response.status === 200) {
        router.push("/sign-in");
      } else {
        console.error("Failed to sign up");
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      action=""
      className="w-[500px] mx-auto py-10 grid gap-4 px-8 border"
    >
      <h6 className="">Sign Up Form</h6>
      <div className=" flex flex-col gap-2">
        <label htmlFor="username">Username</label>
        <input
          {...register("username")}
          type="text"
          className="border border-gray-500 w-full pl-2 py-2"
        />
        {errors.username && (
          <span className="text-red-500">{errors.username.message}</span>
        )}
      </div>
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
        <label htmlFor="role">Role</label>
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
      <div className=" flex flex-col gap-2">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          {...register("confirmPassword")}
          type="password"
          className="border border-gray-500 w-full pl-2 py-2"
        />
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
      </div>
      <button type="submit" className="bg-black text-white py-3">
        Sign Up
      </button>

      <div className="grid grid-cols-3 gap-3 place-items-center">
         <div className="w-full h-[1px] bg-gray-500"></div>
         <h6>Or</h6>
         <div className="w-full h-[1px] bg-gray-500"></div>
      </div>
      <button type="submit" className="bg-black text-white py-3" onClick={()=>signIn("google", {
        
        redirect: false
      })}>
        Sign up with Google
      </button>

      
      <button type="submit" className="bg-black text-white py-3" onClick={()=>signIn("github", {
        
        redirect: false
      })}>
        Sign up with Github
      </button>
    </form>
  );
};

export default SignUp;
