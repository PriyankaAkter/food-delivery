import { OrderType } from "@/app/types/type";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    // Fetch all orders with user information and associated items
    const orders = await prisma.order.findMany({
      include: {
        user: true,
        
        restaurant: true, // Include the restaurant information
      },
    });

    // Filter items based on the matching RestaurantId
    const filteredOrders = orders.map((order) => ({
      ...order,
      items: order?.items?.filter(
        (item) => item.restaurant.id === order.restaurantId
      ),
    }));

    return NextResponse.json(
      { message: "All orders", orders: filteredOrders },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "All orders not found" },
      { status: 400 }
    );
  }
};
