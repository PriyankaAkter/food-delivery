import prisma from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"



export const GET = async (req:NextRequest,{params:{id}}:{params:{id:string}}) => {

  console.log({id});

  try {
      const product = await prisma.food.findUnique({
          where: {
            id
          },
          include: {
            category: true,
            restaurant: true
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

export const DELETE = async (req:NextRequest,{params:{id}}:{params:{id:string}}) => {

    console.log({id});

    try {
        const product = await prisma.food.delete({
            where: {
              id
            }
          })
          return NextResponse.json(
            { message: "Product Deleted", product },
            { status: 200 }
          );
    } catch (error) {
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 200 }
          );
    }
    
}


export const PUT = async (req:NextRequest,{params:{id}}:{params:{id:string}}) => {
  const data = await req.json()
  console.log({data});
  console.log({id});
  
  try {
      const product = await prisma.food.update({
        include:{
          category: true,
          restaurant: true
        },
          where: {
            id
          },
          data:data
         

        })
        return NextResponse.json(
          { message: "Product Updated", product },
          { status: 200 }
        );
  } catch (error) {
      return NextResponse.json(
          { message: "Something went wrong" },
          { status: 200 }
        );
  }
  
}