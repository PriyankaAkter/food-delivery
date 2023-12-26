
import prisma from "@/lib/db";
import { NextResponse } from "next/server";



export const GET = async () => {
  try {
    const orders = await prisma.order.findMany({
     
      include:{
        user: true,
        products: true,
        restaurant: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    return NextResponse.json(
      { message: "All Orders: ", orders },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 }
    );
  }
};


