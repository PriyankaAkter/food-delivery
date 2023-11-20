import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../../../lib/auth";

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
    const restaurants = Restaurant ? [Restaurant] : [];
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