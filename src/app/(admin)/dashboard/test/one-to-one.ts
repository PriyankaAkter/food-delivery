// import prisma from "@/lib/db";

// async function createUserWithProfile() {

//     //create a user
//     const user = await prisma.user.create({
//         data:{}
//     })

//     //create a profile
//     const profile = await prisma.profile.create({
//         data:{
//             name: "Ela",
//             userId: user.id,

//         }
//     })

//     return prisma.user.findUnique({
//         where:{
//             id: user.id
//         }
//     })




// }
// console.log("one-to-one");
// console.log(createUserWithProfile());
