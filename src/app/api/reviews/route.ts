import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export const GET = async () => {
    
    try {
      const reviews = await prisma.review.findMany({
        include:{
            products: true,
            user: true
        }
      });
  
      return NextResponse.json(
        { message: "All Reviews", reviews },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error fetching restaurant data:", error);
      return NextResponse.json(
        { message: "Something went wrong" },
        { status: 400 }
      );
    }
  };




export const POST = async (req: NextRequest) => {
  const body = await req.json();
  console.log({ body });

  try {
    const review = await prisma.review.create({
      data: body,
    });

    return NextResponse.json(
      { message: "Create Review", review },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching restaurant data:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 }
    );
  }
};
