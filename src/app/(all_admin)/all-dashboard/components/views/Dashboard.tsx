"use client";
import DashboardDataTable from "./DashboardDataTable";
import { Restaurants } from "@/app/(admin)/dashboard/components/shared/data";
import { columns } from "./columns";
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
  // const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["restaurant"],
    queryFn: () => fetchRestaurant(),
  });

  if (isLoading) {
    return <h6>Loading...</h6>;
  }
  if (error) return "An error has occurred: " + error.message;
  // console.log({ data });

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
          <div className="flex items-center gap-2">
            <div className="w-16 h-16 relative">
              <Image src={row.original?.image} alt="restaurant" fill />
            </div>
            <div>
              <h6>{row.original?.name}</h6>
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
        // console.log(row?.original);

        const deliveredOrders = row?.original?.orders?.filter(
          (earning) => earning.delivery === "DELIVERED"
        );
        
        const totalDeliveredOrders = deliveredOrders?.length;
        return <h6>{totalDeliveredOrders}</h6>;
      },
    },
    {
      id: "earning",
      header: "Total Earning",
      cell: ({ row }) => {
        // console.log(row?.original);

        const totalEarning = row?.original?.orders?.filter((earning) => earning.delivery === "DELIVERED")
          .reduce((sum, earning) => sum + Number(earning?.price), 0);
        // console.log({totalEarning});
        // if(!row.original?.image) return ""
        return <h6>{totalEarning} tk</h6>;
      },
    },

    {
      header: "Joined Date",
      accessorKey: "createdAt",
    },

    // {
    //   id: "action",
    //   header: "ACTION",
    //   cell: ({row}) => {
    //     console.log(row.original);

    //     return (
    //       <div className="flex gap-5 justify-center">
    //         <DialogDemo initialValue={row.original} className="p-3 rounded-lg bg-bone hover:bg-none border border-[#F57213]" title="Update Restaurant" update="update" icon={<BiSolidPencil className="text-[#F57213] w-5 h-5" />}  />
    //         <button onClick={()=>DeleteRestaurant(row.original)} className="p-3 rounded-lg bg-bone hover:bg-none border border-[#F57213]">
    //           <RiDeleteBin5Fill className="text-[#F57213] w-4 h-4" />
    //         </button>
    //       </div>
    //     );
    //   },
    // },
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
