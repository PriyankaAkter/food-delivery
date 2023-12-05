import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export const GET = async () => {
  
  try {
    
    const restaurants = await prisma.restaurant.findMany({
      
      include: {
        foods: {
          include:{
            category:true,
            restaurant:true
          }
        },
        orders: true
      },
    });

  
    
    return NextResponse.json(
      { message: "All restaurans", restaurants },
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