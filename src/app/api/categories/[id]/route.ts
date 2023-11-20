import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (req:NextRequest,{params:{id}}:{params:{id:string}}) => {
  try {
    const category = await prisma.category.findUnique({
      where: {
        id
      }
    });
    return NextResponse.json(
      { message: "Single Category get: ", category },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 200 }
    );
  }
};


    export const PUT = async (req:NextRequest,{params:{id}}:{params:{id:string}}) => {

      const data = await req.json()
      
      console.log({data});
      console.log({id});
     
      try {
        const categories = await prisma.category.update({
          where:{
            id
          },
          data:data
        });
        return NextResponse.json(
          { message: "Category updated", categories },
          { status: 200 }
        );
      } catch (error) {
        return NextResponse.json(
          { message: "Something went wrong" },
          { status: 400 }
        );
      }
    };
    


    export const DELETE = async (req:NextRequest,{params:{id}}:{params:{id:string}}) => {
   
    
      try {
        const categories = await prisma.category.delete({
          where: {
            id
          }
        });
        return NextResponse.json(
          {success: true, message: "Category Deleted", categories },
          { status: 200 }
        );
      } catch (error) {
        return NextResponse.json(
          {success: false, message: "Something went wrong" },
          { status: 400 }
        );
      }
    };
