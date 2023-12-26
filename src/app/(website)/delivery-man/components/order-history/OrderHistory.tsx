import { OrderType, ProductType } from "@/app/types/type";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { DialogDemo } from "./DialogDemo";
import { Button } from "@tremor/react";

const OrderHistory = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const gettingOrders = await axios.get(`http://localhost:3000/api/order`);
      return gettingOrders.data;
    },
  });

  const handleStatus = async (orderId: number) => {
    try {
      const order = data?.orders.find((o: OrderType) => o.id === orderId);
  
      if (order?.delivery === "READY_FOR_DELIVERY" || order?.delivery === "OUT_FOR_DELIVERY" || order?.delivery === "DELIVERED" ) {
        const newStatus =
          order?.delivery === "OUT_FOR_DELIVERY" ? "DELIVERED" : "OUT_FOR_DELIVERY";
  
        console.log("Updating order:", order);
        console.log("New status:", newStatus);
  
        const updateStatus = await axios.put(
          `http://localhost:3000/api/orders/${orderId}`,
          {
            delivery: newStatus,
          }
        );
  
        console.log("Update response:", updateStatus);
  
        // Optionally, you can update the local state here
        // to reflect the change in the UI without fetching the data again.
  
        // If you're using React Query, you can use queryCache.setQueryData
      }
    } catch (error: any) {
      console.error("Error updating order status:", error);
    }
  };
  if (isLoading) {
    return <h6>Loading...</h6>;
  }
  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="w-full ">
      <h5 className="text-center">Order History</h5>
      <div className="grid grid-cols-1 gap-10 mt-6">
        {data?.orders
          ?.filter((order: OrderType) =>
            ["READY_FOR_DELIVERY", "OUT_FOR_DELIVERY", "DELIVERED"].includes(
              order?.delivery
            )
          )
          .map((order: OrderType, index: number) => (
            <div key={index}>
              <div
                className="px-4 rounded-md"
                style={{
                  boxShadow: "0px 2px 20px 0px rgba(0, 0, 0, 0.05)",
                }}
              >
                <div className="py-4">
                  <h6>Order #{order?.id}</h6>
                  <p className="mb-2">
                    Placed on {new Date(order?.createdAt)?.toLocaleString()}
                  </p>
                  <p className="mb-2">Status: {order?.delivery}</p>
                  <hr className="my-3" />
                  <div>
                    <h6>Client Details</h6>
                    <p>Name: {order?.user?.name}</p>
                    <p>Phone: {order?.user?.phone}</p>
                    <p>Address: {order?.user?.address}</p>
                  </div>
                </div>
                <hr className="my-3" />
                <h6>Item Details</h6>
                {order?.items?.map((item: ProductType, index: number) => (
                  <div className="py-4 " key={index}>
                    <div className="flex items-center justify-between gap-10">
                      <div className="flex items-center gap-2">
                        <div className="relative w-20 h-20">
                          <Image
                            src={item?.image || ""}
                            alt="order"
                            fill
                            className="rounded-md"
                          />
                        </div>
                        <div>
                          <h6>{item?.name}</h6>
                          <p className="flex gap-1">
                            From
                            <span className="text-[#F29F05]">
                              {item?.restaurant?.name}
                            </span>
                          </p>
                          <h6 className="text-[#F29F05]">{item?.price} tk</h6>
                        </div>
                      </div>
                      <p>Quantity: {item?.quantity}</p>
                    </div>
                  </div>
                ))}
                <div className="py-5">
                  <Button
                    onClick={() => handleStatus(order?.id)}
                    className="bg-[#F29F05] border-none px-6 hover:bg-[#F29F05]"
                  >
                    {order?.delivery === "READY_FOR_DELIVERY" ||
                    order?.delivery === "OUT_FOR_DELIVERY" ||
                    order?.delivery === "DELIVERED"
                      ? order?.delivery
                      : "Accept"}
                  </Button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default OrderHistory;
