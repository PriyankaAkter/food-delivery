import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../../lib/auth";

export const GET = async () => {
  const session = await getServerSession(authOptions);
  try {
    const restaurant = await prisma.restaurant.findUnique({
      where: {
        name: session?.user?.name,
      },
      include: {
        foods: {
          include: {
            category: true,
            restaurant: true,
          },
        },
      },
    });

    return NextResponse.json(
      { message: "Restaurant fetch", restaurant },
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

export const PUT = async (req: Request) => {
  const session = await getServerSession(authOptions);
  const data = await req.json();
  console.log({ data, session });

  try {
    const restaurant = await prisma.restaurant.update({
      where: {
        name: session?.user?.name,
      },
      data: data,
    });

    //  const exitingUser = await prisma.user.findFirst({
    // 	where:{
    // 		email: session?.user?.email
    // 	}
    //  })

    const userEmail = session?.user?.email ?? ""; // Provide a default value if null or undefined

    await prisma.user.update({
      where: {
        email: userEmail,
      },
      data: {
        image: data?.image,
      },
    });
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
};
