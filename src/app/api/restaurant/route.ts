import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (req:Request) => {
  try {
    const restaurants = await prisma.restaurant.findMany({
      include: {
        foods: {
          include:{
            category: true,
            restaurant:true
          }
        },
        orders: true
      }
    })
    return NextResponse.json(
              { message: "Restaurant created", restaurants },
              { status: 200 }
            );
  } catch (error) {
          return NextResponse.json(
            { message: "Something went wrong" },
            { status: 400 }
          );
};

}
// export const POST = async (req:NextResponse) => {
//   const data = await req.json()
//   console.log({data});
  
//     try {
//       const restaurant = await prisma.restaurant.create({
//         data:data
//       });
//       return NextResponse.json(
//         { message: "Restaurant created", restaurant },
//         { status: 200 }
//       );
//     } catch (error) {
//       return NextResponse.json(
//         { message: "Something went wrong" },
//         { status: 400 }
//       );
//     }
//   };

  // export const PUT = async () => {
  //   try {
  //     const restaurants = await prisma.restaurant.update({
  //       where:{
  //         id: "93ca567c-4c59-4011-a640-bae10e90c5f4"
  //       },
  //       data:{
          
  //         email:"khanazchange@gmail.com",
          
  //       }
  //     });
  //     return NextResponse.json(
  //       { message: "Restaurant updated", restaurants },
  //       { status: 200 }
  //     );
  //   } catch (error) {
  //     return NextResponse.json(
  //       { message: "Something went wrong" },
  //       { status: 200 }
  //     );
  //   }
  // };
  