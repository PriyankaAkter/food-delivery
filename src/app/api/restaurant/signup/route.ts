import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import {hash} from 'bcrypt'
import {z} from 'zod'

const restaurantSchema = z.object({
    name: z.string().min(1,"Username is requires"),
    email: z.string().min(1,"Email is required"),
    password: z.string().min(1,"Password is required").min(3,"Password must be at least 3 characters")
})

export const GET = async () => {
  try {
    const restaurant = await prisma.restaurant.findMany({
      select:{ 
        name: true,
        email: true,
        password: true
      }
    });
    return NextResponse.json({ message: "All restaurant User", restaurant }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong", error },
      { status: 400 }
    );
  }
};
export const POST = async (req: Request) => {
  const data = await req.json();
  console.log({data});
  const {name,password,email} = restaurantSchema.parse(data);

 const existingEmail = await prisma.restaurant.findUnique({
  where: {
    email
  }
 });
  console.log({existingEmail});
  
  if (existingEmail) {
    return NextResponse.json(
      { success: false, message: "Email already exists" },
      { status: 409 }
    );
  }
  
  const hashPassword = await hash(password,10)
  console.log({hashPassword});
  
  try {
    const newUsers = await prisma.restaurant.create({
        data:{
            email,
            password:hashPassword,
            name
        }
      })
      const {password,...rest} = newUsers
    return NextResponse.json(
      { success: true, message: "New user created", rest },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Something went wrong", error },
      { status: 400 }
    );
  }



//   console.log({ username,password,email });
  // const existingEmail = await prisma.restaurant.findUnique({
  //   where: {
  //     email
  //   },
  // });
  // console.log({existingEmail});
  
  // if (existingEmail) {
  //   return NextResponse.json(
  //     { success: false, message: "Email already exists" },
  //     { status: 409 }
  //   );
  // }

  // const existingUserName = await prisma.user.findUnique({
  //   where: {
  //     name
  //   },
  // });
  // if (existingUserName) {
  //   return NextResponse.json(
  //     { success: false, message: "Username already exists" },
  //     { status: 409 }
  //   );
  // }
  

  // const hashPassword = await hash(password,10)

  // try {
  //   const newUsers = await prisma.restaurant.create({
  //       data:{
  //           email,
  //           password:hashPassword,
  //           name
  //       }
  //     })
  //     const {password,...rest} = newUsers
  //   return NextResponse.json(
  //     { success: true, message: "New user created", rest },
  //     { status: 200 }
  //   );
  // } catch (error) {
  //   return NextResponse.json(
  //     { success: false, message: "Something went wrong", error },
  //     { status: 400 }
  //   );
  // }
};
