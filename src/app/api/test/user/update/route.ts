// import prisma from "@/lib/db"
// import { NextResponse } from "next/server"
// //create a user
// // export const GET = async () => {
// //  const user = await prisma.user.findFirst()
// //  return NextResponse.json({message:"User data", user},{status:200})
// // }
// export const POST = async () => {
//     // const data = await req.json()
//     // console.log({data});
//     // await prisma.user.deleteMany()//email is unique thats why 1st it will delete all data than create the same post
//     try {
//         const user = await prisma.user.create({
//             data:{
//                 name: "ena",
//                 age: 2,
//                 email: "ena55@gmail.com",
//                 userPreference:{
//                     create:{
//                         emailUpdates: true
//                     }
//                 }
//             },
//             include:{
//                 userPreference: true
//             }
//         })
//         return NextResponse.json({message:"User data created",user},{status:200})
//     } catch (error) {
//         return NextResponse.json({message:"Error occur"},{status:400})
//     }
    
    
//    }

// export const PUT = async (req:Request) => {
//     // const data = await req.json()
//     // console.log({data});
//     try {
//         const user = await prisma.user.update({
//             where: { id: String("cloqsa64o0000ti1wo97muvo1") },
//             data:{
//                 name: "Paru1                                                                  "
//             }
//         })
//         return NextResponse.json({message:"User updated",user},{status:200})
//     } catch (error) {                                   
//         return NextResponse.json({message:"Error occur"},{status:400})
//     }
    
    
//    }

