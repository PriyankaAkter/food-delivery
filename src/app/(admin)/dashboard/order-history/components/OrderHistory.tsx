"use client";
import React from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import BasicTable from "../../components/shared/BasicTable";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { OrderType, ProductType } from "@/app/types/type";
import { DialogOrder } from "./DialogOrder";
import { useSession } from "next-auth/react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import BasicTable1 from "../../components/shared/BasicTable1";

const OrderHistory = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const ordersData = await axios.get(`http://localhost:3000/api/orders`);
      return ordersData.data;
    },
  });

  if (isLoading) {
    return <h6>Loading...</h6>;
  }
  if (error) return "An error has occurred: " + error.message;

  // console.log({ data });

  // const fetchOrders = data?.orders?.map((order: OrderType) =>
  //   order?.items?.filter(
  //     (i: ProductType) => i?.restaurant?.email === session?.user?.email
  //   )
  // );
  // console.log({ fetchOrders });


    // single data delete
    const DeleteOrder = async (data: OrderType) => {
      try {
        const deleteOrder = await axios.delete(
          `http://localhost:3000/api/orders/${data.id}`
        );
        queryClient.invalidateQueries({ queryKey: ["orders"] });
        // console.log(deleteOrder.data);
        return deleteOrder.data;
      } catch (error) {
        console.error(error);
      }
    };
  
    // console.log({ deleteOrder });



  const columns: ColumnDef<OrderType>[] = [
    {
      header: "ORDER",
      accessorKey: "id",
    },
    {
      header: "TIME",
      accessorKey: "createdAt",
    },

    {
      header: "CUSTOMER",
      accessorKey: "userName",
      cell: ({ row }) => {
        // console.log(row.original);
        if (!row.original?.userName) return "";
        return <div>{row.original?.userName}</div>;
      },
    },
    {
      header: "STATUS",
      accessorKey: "status",
      cell: ({ row }) => {
        // console.log(row.original);
        if (!row.original?.status) return "";
        return <div>{row.original?.status}</div>;
      },
    },
    {
      header: "ORDER VALUE",
      accessorKey: "price",
      cell: ({ row }) => {
        console.log(row.original);
        if (!row.original?.price) return "";
        // const fecthItems = row?.original?.items?.filter((item:ProductType,index:number)=>
        // item?.restaurant?.name == session?.user?.name
        // )
        // const totalPrice = fecthItems?.reduce((sum, item) => sum + (Number(item.price) * Number(item?.quantity)), 0);
  // console.log({totalPrice});
        return <div>{row.original?.price} tk</div>;
      },
    },

    {
      id: "action",
      header: "ACTION",
      cell: ({ row }) => {
        return (
          <div className="flex gap-5 justify-center">
            <DialogOrder initialValue={row?.original} />
            <button
              onClick={() => DeleteOrder(row.original)}
              className="p-3 rounded-lg bg-bone hover:bg-none border border-[#F57213]"
            >
              <RiDeleteBin5Fill className="text-[#F57213] w-4 h-4" />
            </button>
          </div>
        );
      },
    },
  ];
  return (
    <div
      className="rounded-[10px] w-full "
      style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.16)" }}
    >
      <div className="flex justify-between items-center py-8 px-6">
        <h6>All Orders</h6>
      </div>
    
      <BasicTable1 data={data?.orders} columns={columns} />
      
    </div>
  );
};

export default OrderHistory;
