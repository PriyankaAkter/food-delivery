"use client";
import DashboardDataTable from "./DashboardDataTable";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { RestaurantColumnType } from "@/app/types/type";

const fetchRestaurant = async () => {
  const restaurantsData = await axios.get(
    "http://localhost:3000/api/restaurant"
  );
  return restaurantsData.data;
};
const Dashboard = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["restaurant"],
    queryFn: () => fetchRestaurant(),
  });

  if (isLoading) {
    return <h6>Loading...</h6>;
  }
  if (error) return "An error has occurred: " + error.message;

  const columns: ColumnDef<RestaurantColumnType>[] = [
    {
      id: "restaurant",
      header: "Restaurant",
      cell: ({ row }) => {
        console.log(row.original);
        if (
          !row.original?.image ||
          !row.original?.address ||
          !row.original?.address
        )
          return "";
        return (
          <div className="flex items-center gap-4">
            <div className="w-12 h-7 sm:w-16 sm:h-16 relative">
              <Image src={row.original?.image} alt="restaurant" fill />
            </div>
            <div>
              <h6 className="">{row.original?.name}</h6>
              <p>{row.original?.address}</p>
            </div>
          </div>
        );
      },
    },
    {
      id: "orders",
      header: "Total Orders",
      cell: ({ row }) => {
        const deliveredOrders = row?.original?.orders?.filter(
          (earning) => earning.delivery === "DELIVERED"
        );
        
        const totalDeliveredOrders = deliveredOrders?.length;
        return <h6 className="text-base lg:text-xl">{totalDeliveredOrders}</h6>;
      },
    },
    {
      id: "earning",
      header: "Total Earning",
      cell: ({ row }) => {
        const totalEarning = row?.original?.orders?.filter((earning) => earning.delivery === "DELIVERED")
          .reduce((sum, earning) => sum + Number(earning?.price), 0);
        return <h6 className="text-base lg:text-xl">{totalEarning} tk</h6>;
      },
    },
    {
      id: "createdAt",
      header: "Joined Date",
      cell: ({ row }) => {
        const createdAt = row?.original?.createdAt as string | undefined;
        if (createdAt) {
          return <h6 className="text-base lg:text-xl">{new Date(createdAt).toLocaleString()}</h6>;
        } else {
          return <span className="text-base lg:text-xl">No joined date available</span>;
        }
      },
    }
    

  ];

  return (
    <div className="w-full">
      <h5>Overview</h5>
      <p className="mb-10">Dashboard</p>

      <DashboardDataTable data={data?.restaurants} columns={columns} />
    </div>
  );
};

export default Dashboard;
