import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../../lib/auth";
import prisma from "@/lib/db";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const name = session?.user?.name;

    const getRestaurant = await prisma.restaurant.findUnique({
      where: {
        name: session?.user?.name,
      },
    });
    // console.log({ getRestaurant });
    return NextResponse.json(
      { message: "Session Restaurant", getRestaurant },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something Went wrong" },
      { status: 400 }
    );
  }
}




