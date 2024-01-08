"use client";
import axios from "axios";
import OrderCard from "./OrderCard";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { OrderType } from "@/app/types/type";
import OrderDetails from "./OrderDetails";

const Dashboard = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const ordersData = await axios.get(`http://localhost:3000/api/orders`);
      // queryClient.invalidateQueries({ queryKey: ["orders"] });
      return ordersData.data;
    },
  });

  if (isLoading) {
    return <h6>Loading...</h6>;
  }
  if (error) return "An error has occurred: " + error.message;

  // console.log({data});
  return (
    <div className=" my-6 xl:my-16  w-full">
      <OrderDetails order={data?.orders} />
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3  gap-8 mt-10">
        {data?.orders?.map((order: OrderType, index: number) => (
          <OrderCard order={order} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
