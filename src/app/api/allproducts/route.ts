import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export const GET = async () => {
  
  try {
    // Find the restaurant with the specified name (in this case, "Khanaz")
    const products = await prisma.food.findMany({
      include: {
        category:true,
        restaurant:true,
        orders: true
      },
    });

   
    return NextResponse.json(
      { message: "All products", products },
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