import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db"
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server"




export const GET = async (req:NextRequest,{params:{id}}:{params:{id:string}}) => {

  console.log({id});

  try {
      const restaurant = await prisma.restaurant.findUnique({
          where: {
            id: id
          },
          include: {
            foods: {
              include: {
                category: true,
                restaurant: true,
              },
            },
            orders: true
          },
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





export const DELETE = async (req: NextRequest, { params: { id } }: { params: { id: string } }) => {
  console.log({ id });

  try {
    const restaurant = await prisma.restaurant.findUnique({
      where: {
        id: id
      },
      include: {
        foods: true,  // Only include foods
        orders: true
      },
    });

    if (!restaurant) {
      return NextResponse.json(
        { success: false, message: "Restaurant not found" },
        { status: 404 }
      );
    }

    // Delete associated foods first
    await prisma.food.deleteMany({
      where: {
        RestaurantId: id
      }
    });

    // Now delete the restaurant and user
    const deleteRestaurant = await prisma.restaurant.delete({
      where: {
        id: id
      }
    });

    const deleteUser = await prisma.user.delete({
      where: {
        email: deleteRestaurant?.email
      }
    });

    return NextResponse.json(
      { success: true, message: "Restaurant Deleted", restaurant: deleteRestaurant, deleteUser },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 400 }
    );
  }
};





// export const DELETE = async (req:NextRequest,{params:{id}}:{params:{id:string}}) => {

//   console.log("Deleting restaurant with id:", id);

//   try {
//       const restaurant = await prisma.restaurant.delete({
//           where: {
//             id
//           }
//         })
//         return NextResponse.json(
//           { message: "Restaurant Deleted", restaurant },
//           { status: 200 }
//         );
//   } catch (error) {
//       return NextResponse.json(
//           { message: "Something went wrong" },
//           { status: 400 }
//         );
//   }
  
// }