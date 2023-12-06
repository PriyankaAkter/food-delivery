import { items } from './../../(website)/components/views/data';
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// export const GET =async () => {
//     const session = await getServerSession(authOptions);
//     console.log({session});

//     if(session){
//         try {
//             const orders = await prisma.order.findMany({
//                 where:{
//                     userEmail: session?.user?.email
//                 }
//             })
//             return NextResponse.json(
//                 { message: "Orders: ", orders },
//                 { status: 200 }
//               );
//         } catch (error) {
//             console.log(error);
//             return NextResponse.json(
//                 { message: "Something went wrong" },
//                 { status: 400 }
//               );

//         }
//     }
//     else{
//         return NextResponse.json(
//             { message: "You are not Authenticate" },
//             { status: 400 }
//           );
//     }
// }

export const GET = async () => {
  // const session = await getServerSession(authOptions);
  try {
    const orders = await prisma.order.findMany({
      include:{
        user: true,
        products: true,
        restaurant: true
      }
    });
    return NextResponse.json(
      { message: "All Orders: ", orders },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 }
    );
  }
};
//real one
export const POST = async (req: NextRequest, res: NextResponse) => {
  const session = await getServerSession(authOptions);
  const body = await req.json();
  console.log({ body });
  if (session) {
    try {
      // const body = await req.json()
      console.log(body+'===========')
      const isExist = await prisma.order.findUnique({
        where: {
          payment_id: body?.payment_id,
          
        },
        include:{
          user: true,
          
        restaurant: true
        }
      });
     
      if (isExist) {
        return NextResponse.json(
          { message: "New Order: ", isExist },
          { status: 200 }
        );
      }

      const newOrder = await prisma.order.create({
        data: {
          ...body,
          userEmail: session?.user?.email,
          userName: session?.user?.name,
          userId: session?.user?.id,
          delivery: "PENDING", 
          // user: {
          //   connect: {
          //     name: session?.user?.name,
          //     email: session?.user?.email,
          //     // image: session?.user?.image
          //   },
          // },
        },
      });

      return NextResponse.json(
        { message: "New Order: ", newOrder },
        { status: 200 }
      );
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { message: "Something went wrong" },
        { status: 400 }
      );
    }
  }
};

// export const POST = async (req: NextRequest) => {
//   const session = await getServerSession(authOptions);
//   if (session) {
//     try {
//       // const paymentIntentId = req.body.paymentIntentId;
//       const body = await req.json();
//       // const order = await prisma.order.create({
//       //   data: body,
//       // });

//       const order = await prisma.order.create({
//         data: {
//           // other order data
//           ...body,
//           payment_id: body.paymentIntentId, // Store paymentIntent ID in the order
//         },
//       });

//       return new NextResponse(JSON.stringify(order), { status: 201 });
//     } catch (err) {
//       console.log(err);
//       return new NextResponse(
//         JSON.stringify({ message: "Something went wrong!" }),
//         { status: 500 }
//       );
//     }
//   } else {
//     return new NextResponse(
//       JSON.stringify({ message: "You are not authenticated!" }),
//       { status: 401 }
//     );
//   }
// };

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// export async function POST(request: NextRequest) {
//   const session = await getServerSession(authOptions);
//   const body = await request.json()
//   if(session){
//     try {
//       const paymentIntent = await stripe.paymentIntents.create({
//         amount: 100 * 100,
//         currency: "usd",
//         automatic_payment_methods: {
//           enabled: true,
//         },
//       });

//       const order = await prisma.order.create({
//         data: {
//           // other order data
//           ...body,
//           payment_id: paymentIntent.id, // Store paymentIntent ID in the order
//         },
//       });
//       return new NextResponse(
//         JSON.stringify({ clientSecret: paymentIntent.client_secret,order }),
//         { status: 200 }
//       );

//     } catch (error) {
//       return new NextResponse(
//         JSON.stringify({ message:"Order not created!" }),
//         { status: 404 }
//       );
//     }
//   }

// }
