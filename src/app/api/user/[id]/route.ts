import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import {hash} from 'bcrypt'
import {z} from 'zod'
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const userSchema = z.object({
    name: z.string().min(1,"Username is requires"),
    email: z.string().min(1,"Email is required"),
    password: z.string().min(1,"Password is required").min(3,"Password must be at least 3 characters")
})

export const GET = async (req:NextRequest,{params:{id}}:{params:{id:string}}) => {

  console.log({id});

  try {
      const user = await prisma.user.findUnique({
          where: {
            id: id
          },
          include:{
            orders: true
          }
        })
        return NextResponse.json(
          { message: "Single user fetch", user },
          { status: 200 }
        );
  } catch (error) {
      return NextResponse.json(
          { message: "Something went wrong" },
          { status: 400 }
        );
  }
  
}


export const PUT = async (req: Request) => {
  const session = await getServerSession(authOptions);
  const data = await req.json();
  console.log({ data });
  
  try {
   
    const userEmail = session?.user?.email ?? ""; // Provide a default value if null or undefined

    await prisma.user.update({
      where: {
        email: userEmail,
      },
      data: data
    });
    return NextResponse.json(
      { message: "Updated user"},
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 }
    );
  }
};
