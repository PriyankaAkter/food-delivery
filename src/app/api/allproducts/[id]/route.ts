import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (req:NextRequest,{params:{id}}:{params:{id:string}}) => {

  console.log({id});

  try {
      const product = await prisma.food.findUnique({
          where: {
            id
          },
          include:{
            category:true,
            restaurant:true,
            orders: true
          }
        })
        return NextResponse.json(
          { message: "Single Product fetch", product },
          { status: 200 }
        );
  } catch (error) {
      return NextResponse.json(
          { message: "Something went wrong" },
          { status: 400 }
        );
  }
  
}