"use client";
import { CustomerType, OrderType, ProductType } from "@/app/types/type";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { DialogDemo } from "./DialogDemo";

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

  // console.log({ data });
  if (!data?.user?.orders || data.user.orders.length === 0) {
    return <div>No Orders!</div>;
  }





  return (
    <div className="w-full ">
      <h5 className="text-center">Order History</h5>
      <div className="grid grid-cols-1 gap-10 mt-6">
        {data?.user?.orders && data?.user?.orders && (
          data?.user?.orders?.map((order: OrderType, index: number) => (
            <div
              className="px-4 rounded-md"
              style={{ boxShadow: "0px 2px 20px 0px rgba(0, 0, 0, 0.05)" }}
              key={index}
            >
              <div className="py-4">
                <h6>Order #{order?.id}</h6>
                <p className="mb-2">Placed on {new Date(order?.createdAt)?.toLocaleString()}</p>
                {/* <p>Status: </p> */}
                {order?.delivery && order?.delivery == "CANCELLED" ? (
                  <div className="bg-[#57d655] text-white py-1 px-4 rounded-md w-fit">
                    {order?.delivery}
                  </div>
                ) : (
                  <div className="bg-[#F29F05] text-white py-1 px-4 rounded-md w-fit">
                    {order?.delivery}
                  </div>
                )}
              </div>
              <hr />
              {order?.items?.map((item: ProductType, index: number) => (
                <div className="py-4" key={index}>
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
               
                    {order?.delivery === "DELIVERED" ? (
                           <DialogDemo
                           initialValue={item?.id}
                           className="border border-[#F29F05]  "
                           button1="Add Review"
                           title="Add Review"
                           update="save"
                         />
                    ):(<div></div>)}
                  </div>
                </div>
              ))}
            </div>
          ))
        ) }
      </div>
    </div>
  );
};

export default OrderHistory;
