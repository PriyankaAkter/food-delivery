import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (req:NextRequest,{params:{id}}:{params:{id:string}}) => {
  
  try {
    
    const restaurants = await prisma.restaurant.findUnique({
      where:{
        id
      },
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
      { message: "Fetch Single Restaurant", restaurants },
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