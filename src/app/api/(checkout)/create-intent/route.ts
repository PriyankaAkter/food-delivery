// import prisma from "@/lib/db";
// import { error } from "console";
// import { NextResponse } from "next/server";

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// export const POST = async ({ params }: { params: { orderId: string } }) => {
//   const { orderId } = params;

//   const findOrder = await prisma.order.findUnique({
//     where: {
//       orderNumber: orderId,
//     },
//   });
//   console.log({ findOrder });

//   if (findOrder) {
//     // Create a PaymentIntent with the order amount and currency
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: 100 * 100,
//       currency: "usd",
//       automatic_payment_methods: {
//         enabled: true,
//       },
//     });

//     await prisma.order.update({
//         where:{
//             orderNumber: orderId,
//         },
//         data:{
//             payment_id: paymentIntent.id
//         }
//     })

//     return NextResponse.json({ clientSecret: paymentIntent.client_secret }, { status: 200 });

//   } else {
//     return NextResponse.json({ message: "Order not found" }, { status: 400 });
//   }
// };

// import prisma from "@/lib/db";
// import { NextRequest, NextResponse } from "next/server";

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// export async function POST(
//   request: NextRequest,
//   { params }: { params: { orderId: string } }
// ) {
//   const { orderId } = params;

//   const order = await prisma.order.findUnique({
//     where: {
//       orderNumber: orderId,
//     },
//   });

//   if (order) {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: order?.price * 100,
//       currency: "usd",
//       automatic_payment_methods: {
//         enabled: true,
//       },
//     });

//     await prisma.order.update({
//       where: {
//         orderNumber: orderId,
//       },
//       data: { payment_id: paymentIntent.id },
//     });

//     return new NextResponse(
//       JSON.stringify({ clientSecret: paymentIntent.client_secret }),
//       { status: 200 }
//     );
//   }
//   return new NextResponse(
//     JSON.stringify({ message:"Order not found!" }),
//     { status: 404 }
//   );
// }

import { NextRequest, NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY!);
export async function POST(req:NextRequest) {
  try {
    const amount = await req.json()
    console.log({amount});
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    return new NextResponse(
      JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "Order not found!" }), {
      status: 404,
    });
  }
}
