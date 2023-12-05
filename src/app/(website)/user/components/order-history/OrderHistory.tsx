"use client";
import { CustomerType, OrderType, ProductType } from "@/app/types/type";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";

const OrderHistory = () => {
  const { data: session } = useSession();
  const { data, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const userData = await axios.get(
        `http://localhost:3000/api/user/${session?.user?.id}`
      );
      return userData.data;
    },
  });

  if (isLoading) {
    return <h6>Loading...</h6>;
  }
  if (error) return "An error has occurred: " + error.message;

  console.log({ data });
  return (
    <div className="w-full ">
      <h5 className="text-center">Order History</h5>
      <div className="grid grid-cols-1 gap-10 mt-6">
        {data?.user?.orders ? data?.user?.orders?.map((order: OrderType, index: number) => (
          <div className="px-4 rounded-md" style={{ boxShadow: "0px 2px 20px 0px rgba(0, 0, 0, 0.05)" }} key={index}>
            <div className="py-4">
              <h6>Order #{order?.id}</h6>
              <p>Placed on {order?.createdAt}</p>
            </div>
            <hr />
            {order?.items?.map((item: ProductType, index: number) => (
              <div className="py-4">
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
                      <p>
                        From
                        <span className="text-[#F29F05]">
                          {item?.restaurant?.name}
                        </span>
                      </p>
                      <h6 className="text-[#F29F05]">{item?.price} tk</h6>
                    </div>
                  </div>
                  <div>
                    <p>Quantity: {item?.quantity}</p>
                  </div>
                  <div>
                    <p>Delivered</p>
                  </div>
                  <div>
                    <p>Delivered on: 25 May, 12:00 PM</p>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )): <div>No Orders!</div> }
      </div>
    </div>
  );
};

export default OrderHistory;
