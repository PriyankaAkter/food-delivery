import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";






export const DELETE = async (req:NextRequest,{params:{id}}:{params:{id:number}}) => {

    console.log({id});

    try {
        const product = await prisma.order.delete({
            where: {
              id: Number(id)
            }
          })
          return NextResponse.json(
            { message: "Order Deleted", product },
            { status: 200 }
          );
    } catch (error) {
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 400 }
          );
    }
    
}


export const PUT = async (req:NextRequest,{params:{id}}:{params:{id:number}}) => {

  console.log({id});
  const body = await req.json()
  try {
      const product = await prisma.order.update({
          where: {
            id: Number(id)
          },
          data:body
        })
        return NextResponse.json(
          { message: "Order Updated", product },
          { status: 200 }
        );
  } catch (error) {
      return NextResponse.json(
          { message: "Something went wrong" },
          { status: 400 }
        );
  }
  
}