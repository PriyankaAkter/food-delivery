import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  req: NextRequest,
  { params }: { params: { intentId: string } }
) => {

  // const session = await getServerSession(authOptions)
  const { intentId } = params;
  console.log({ intentId });
  try {
    const findOrder = await prisma.order.findFirst({
      where: {
        payment_id: intentId,
      },
    });
    if (!findOrder) {
      return new NextResponse(
        JSON.stringify({ message: "Not found order id" }),
        { status: 400 }
      );
    }

    const order = await prisma.order.update({
      where: {
        payment_id: intentId,
      },
      data: {
        status: "Paid",
      },
    });
    return new NextResponse(
      JSON.stringify({ message: "Order has been updated", order }),
      { status: 200 }
    );
  } catch (error) {
    // console.error("Error updating order:", error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
  // try {
  //   const order = await prisma.order.update({
  //     where: {
  //       payment_id: intentId,
  //     },
  //     data:{
  //       status: "Paid"
  //     }
  //   });
  //   return new NextResponse(
  //     JSON.stringify({ message: "Order has been updated",order }),
  //     { status: 200 }
  //   );
  // } catch (err) {
  //   console.error("Error updating order:", err);
  //   return new NextResponse(
  //     JSON.stringify({ message: "Something went wrong!" }),
  //     { status: 500 }
  //   );
  // }
};
