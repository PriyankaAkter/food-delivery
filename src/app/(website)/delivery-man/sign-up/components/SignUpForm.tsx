"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { ZodType, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { toast } from "react-toastify";


type DeliveryMandataType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  
};

const signUpSchema: ZodType<DeliveryMandataType> = z
  .object({
    name: z.string().min(1, "Username is required"),
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

const SignUpForm = () => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<DeliveryMandataType>({ resolver: zodResolver(signUpSchema) });

  const onSubmit = async (data: DeliveryMandataType) => {
    console.log("Form data", data);
    const role = "DELIVERY_MAN"
    try {
      const response = await axios.post("http://localhost:3000/api/delivery-man", {
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        role: role
      });

      if (response.status === 200) {
        toast.success('Delivery Man registered successfully')
        router.push("/sign-in");
      } else {
        console.error("Failed to sign up");
        toast.error("Error Occur!");
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
      <h6 className="">Delivery Man register Form</h6>
      <div className=" flex flex-col gap-2">
        <label htmlFor="username">Name</label>
        <input
          {...register("name")}
          type="text"
          className="border border-gray-500 w-full pl-2 py-2"
        />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
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
      <button type="submit" className="bg-black text-white py-3 cursor-pointer mt-6">
        Sign Up
      </button>

      <p className="text-center">Already have an account? <Link className="font-semibold" href='/sign-in'>Sign In</Link></p>
    </form>
  );
};

export default SignUpForm;
