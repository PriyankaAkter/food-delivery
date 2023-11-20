import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json(
      { message: "All Categories", categories },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 200 }
    );
  }
};


export const POST = async (req:Request) => {
  const data = await req.json()
  console.log({data});
  
    try {
      const categories = await prisma.category.create({
        data:data
      });
      return NextResponse.json(
        { message: "Category created", categories },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { message: "Something went wrong" },
        { status: 200 }
      );
    }
  };

 