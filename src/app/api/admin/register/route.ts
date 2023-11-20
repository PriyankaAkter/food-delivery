import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { z } from "zod";

const userSchema = z.object({
  name: z.string().min(1, "Username is requires"),
  email: z.string().min(1, "Email is required"),
  // role: z.string().min(1),
  password: z
    .string()
    .min(1, "Password is required")
    .min(3, "Password must be at least 3 characters"),
});

// export const GET = async () => {
//   try {
//     const users = await prisma.user.findMany({});
//     return NextResponse.json({ message: "All Users", users }, { status: 200 });
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json(
//       { message: "Something went wrong", error },
//       { status: 400 }
//     );
//   }
// };
export const POST = async (req: Request) => {
  const body = await req.json();
  console.log({ body });

  const { name, password, email } = userSchema.parse(body);
  const existingEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  console.log({ existingEmail });

  if (existingEmail) {
    return NextResponse.json(
      { success: false, message: "Email already exists" },
      { status: 409 }
    );
  }

  const hashPassword = await hash(password, 10);

  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
        role: body.role
      },
    });

    const newRestaurantUser = await prisma.restaurant.create({
      data: {
        name,
        email,
        password: hashPassword,
        
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "New Restaurant user created",
        newUser,
        newRestaurantUser,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Something went wrong", error },
      { status: 400 }
    );
  }

  //   try {
  //     const newUsers = await prisma.user.create({
  //         data:{
  //             email,
  //             password:hashPassword,
  //             name
  //         }
  //       })
  //       const {password,...rest} = newUsers
  //     return NextResponse.json(
  //       { success: true, message: "New user created", rest },
  //       { status: 200 }
  //     );
  //   } catch (error) {
  //     return NextResponse.json(
  //       { success: false, message: "Something went wrong", error },
  //       { status: 400 }
  //     );
  //   }
};
