import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../../lib/auth";

// export const GET = async () => {
//   try {
//     const products = await prisma.food.findMany({
//       include: {
//         category: true,
//         restaurant: true
//       },
//     });
//     return NextResponse.json(
//       { message: "All Products", products },
//       { status: 200 }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Something went wrong" },
//       { status: 200 }
//     );
//   }
// };

// export const POST = async (req: Request) => {
//   const data = await req.json();
//   console.log({data});

//   try {
//     const product = await prisma.food.create({
//       data: data,
//       include:{
//         category: true,
//         restaurant: true
//       }
//     });
//     return NextResponse.json(
//       { message: "Product created", product },
//       { status: 200 }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Something went wrong" },
//       { status: 400 }
//     );
//   }
// };

//   export const PUT = async () => {
//     try {
//       const categories = await prisma.category.update({
//         where:{
//           id:  "90a5ce2c-e403-4fc2-98f3-00710f1cec3d"
//         },
//         data:{
//           slug:"italian"

//         }
//       });
//       return NextResponse.json(
//         { message: "Category updated", categories },
//         { status: 200 }
//       );
//     } catch (error) {
//       return NextResponse.json(
//         { message: "Something went wrong" },
//         { status: 200 }
//       );
//     }
//   };

// export const GET = async () => {
//   const session = await getServerSession(authOptions);
  
//   try {
//     const products = await prisma.food.findMany({
//       include: {
//         category: true,
//         restaurant: true,
//       },
//     });

//     return NextResponse.json(
//       { message: "All Products", products },
//       { status: 200 }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Something went wrong" },
//       { status: 200 }
//     );
//   }
// };



//get products using session 
export const GET = async () => {
  const session = await getServerSession(authOptions);
  try {
    // Find the restaurant with the specified name (in this case, "Khanaz")
    const Restaurant = await prisma.restaurant.findUnique({
      where: {
        name: session?.user?.name,
      },
      include: {
        foods: {
          include:{
            category:true,
            restaurant:true
          }
        }
      },
    });

    // If the restaurant is found, return it; otherwise, return an empty array
    // const restaurants = Restaurant ? [Restaurant] : [];
    const foods = Restaurant?.foods
    return NextResponse.json(
      { message: "Restaurant foods", foods },
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





export const POST = async (req: Request) => {
  const data = await req.json();
  // const session = await getServerSession(authOptions);
  // const name = session?.user?.name;
  console.log({ data });

 

  try {
    const getRestaurant = await prisma.restaurant.findUnique({
      where: {
        id: data?.RestaurantId,
      },
    });
    if (!getRestaurant) {
      return NextResponse.json(
        { message: "Not the restaurant" },
        { status: 400 }
      );
    }
    const product = await prisma.food.create({
      data: data,
      include: {
        category: true,
        restaurant: true,
      },
    });

    return NextResponse.json(
      { message: "Product created", product: { product } },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 }
    );
  }
};
