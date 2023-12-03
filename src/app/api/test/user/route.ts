import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
//create a user
export const GET = async () => {
    const session = await getServerSession(authOptions)
  try {
    const user = await prisma.user.findMany();
    return NextResponse.json({ message: "User data", user,session }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "User data not found" },
      { status: 400 }
    );
  }
};

export const POST = async () => {
    const session = await getServerSession(authOptions)
  try {
    const user = await prisma.user.findFirst({
        where:{
            name: session?.user?.name
        }
    });
    return NextResponse.json({ message: "User data", user,session }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "User data not found" },
      { status: 400 }
    );
  }
};

// export const POST = async () => {

//     //await prisma.user.deleteMany()//email is unique thats why 1st it will delete all data than create the same post
//     try {
//         const user = await prisma.user.create({
//             data:{
//                 name: "ena1",
//                 age: 1,
//                 email: "ena255@gmail.com",

//                 userPreference:{
//                     create:{
//                         emailUpdates: true
//                     }
//                 }

//             },
//             // select:{
//             //     name:true,
//             //     userPreference:{
//             //         select:{
//             //             id: true
//             //         }
//             //     }
//             // },
//             include:{
//                 userPreference: true
//             }
//         })
//         return NextResponse.json({message:"User data created",user},{status:200})
//     } catch (error) {
//         return NextResponse.json({message:"Error occur"},{status:400})
//     }

//    }

// //    export const PUT = async (req:Request) => {

// //     try {
// //         const user = await prisma.user.update({
// //             where: { id: ("cloqsa64o0000ti1wo97muvo1") },
// //             data:{
// //                 name: "namu"
// //             }
// //         })
// //         return NextResponse.json({message:"User updated",user},{status:200})
// //     } catch (error) {
// //         return NextResponse.json({message:"Error occur"},{status:400})
// //     }

// //    }

// //    export const DELETE = async (req:Request) => {

// //     try {
// //         const user = await prisma.user.deleteMany()
// //         return NextResponse.json({message:"All User deleted"},{status:200})
// //     } catch (error) {
// //         return NextResponse.json({message:"Error occur"},{status:400})
// //     }

// //    }
