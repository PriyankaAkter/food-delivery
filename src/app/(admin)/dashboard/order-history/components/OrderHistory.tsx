"use client";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { OrderType, ProductType } from "@/app/types/type";
import { DialogOrder } from "./DialogOrder";
import { useSession } from "next-auth/react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import BasicTable1 from "../../components/shared/BasicTable1";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import * as XLSX from "xlsx";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import PrintTable from "./PrintTable";

const OrderHistory = () => {
  const componentRef = useRef(null);
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

  // single data delete
  const DeleteOrder = async (data: OrderType) => {
    try {
      const deleteOrder = await axios.delete(
        `http://localhost:3000/api/orders/${data.id}`
      );
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order deleted successfully");
      // console.log(deleteOrder.data);
      return deleteOrder.data;
    } catch (error) {
      console.error(error);
      toast.error("Error Occur!");
    }
  };

  // console.log({ deleteOrder });

    // // print table
    // const handlePrint = useReactToPrint({
    //   content: () => componentRef.current,
    // });

  const columns: ColumnDef<OrderType>[] = [
    {
      header: "ORDER",
      accessorKey: "id",
    },

    {
      header: "TIME",
      accessorKey: "createdAt",
      cell: ({ row }) => {
        if (!row.original?.createdAt) return "";
        return <div>{new Date(row.original?.createdAt)?.toLocaleString()}</div>;
      },
    },
    {
      header: "CUSTOMER",
      accessorKey: "userName",
      cell: ({ row }) => {
        if (!row.original?.userName) return "";
        return <div>{row.original?.userName}</div>;
      },
    },
    {
      header: "PAYMENT STATUS",
      accessorKey: "status",
      cell: ({ row }) => {
        if (!row.original?.status) return "";
        return <div>{row.original?.status}</div>;
      },
    },
    {
      header: "STATUS",
      accessorKey: "deliver",
      cell: ({ row }) => {
        if (!row.original?.delivery) return "";
        return <div>{row.original?.delivery}</div>;
      },
    },
    {
      header: "ORDER VALUE",
      accessorKey: "price",
      cell: ({ row }) => {
        console.log(row.original);
        if (!row.original?.price) return "";
        return <div>{row.original?.price} tk</div>;
      },
    },

    {
      id: "action",
      header: "ACTION",
      cell: ({ row }) => {
        return (
          <div className="flex gap-5 justify-center action-column"> 
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


  

  const exportToExcel = () => {
    const columnsToExport = [
      "id",
      "createdAt",
      "userName",
      "status",
      "delivery",
      "price",
    ];

   
    const dataToExport = data?.orders.map((order:OrderType) =>
      columnsToExport.reduce((acc, column) => {
        acc[column] = order[column];
        return acc;
      }, {})
    );

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Save the Excel file
    XLSX.writeFile(wb, "tableData.xlsx");
  };




  return (
    <div
      className="rounded-[10px] w-full overflow-x-auto my-6 xl:my-16 "
      style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.16)" }}
    >
      <div className="flex justify-between items-center py-8 px-6">
        <h6>All Orders</h6>
      </div>

      <BasicTable1   data={data?.orders} columns={columns} ref={componentRef} />
      <div>
       
        <PrintTable componentRef={componentRef} columnsToPrint={['0', '1', '2', '3', '4', '5']} />

        <Button
          onClick={exportToExcel}
          className="bg-[#F57213] text-white  mb-10 ml-5"
        >
          Export to Excel
        </Button>
      </div>
    </div>
  );
};

export default OrderHistory;
