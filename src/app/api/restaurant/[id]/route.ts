import prisma from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"




export const GET = async (req:NextRequest,{params:{id}}:{params:{id:string}}) => {

  console.log({id});

  try {
      const restaurant = await prisma.restaurant.findUnique({
          where: {
            id: id
          },
          include:{
            foods: true,
            orders: true
          }
        })
        return NextResponse.json(
          { message: "Single Restaurant fetch", restaurant },
          { status: 200 }
        );
  } catch (error) {
      return NextResponse.json(
          { message: "Something went wrong" },
          { status: 400 }
        );
  }
  
}


export const PUT = async (req:NextRequest,{params:{id}}:{params:{id:string}}) => {
  const data = await req.json()
  console.log({id,data});

  try {
      const restaurant = await prisma.restaurant.update({
        where:{
          id: id
        },
        data: data
      })
        return NextResponse.json(
          { message: "Updated restaurant", restaurant },
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
        const restaurant = await prisma.restaurant.delete({
            where: {
              id: id
            }
          })
          return NextResponse.json(
            { message: "Delete Restaurant", restaurant },
            { status: 200 }
          );
    } catch (error) {
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 400 }
          );
    }
    
}