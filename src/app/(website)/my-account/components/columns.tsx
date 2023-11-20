"use client";
import { ColumnDef} from "@tanstack/react-table";
import { CustomerOrders} from "@/app/(admin)/dashboard/components/shared/data";
import { DialogOrder } from "@/app/(admin)/dashboard/order-history/components/DialogOrder";





// {
//     id: 1,
//     order_id: "#301",
//     date: "Mar 27,2019",
//     status: "On Hold",
//     total:"1000tk for 2 items"
//   },
export const columns: ColumnDef<CustomerOrders>[] = [
  {
    header: "ORDER",
    accessorKey: "order_id",
  },
  {
    header: "DATE",
    accessorKey: "date",
  },
  
  {
    header: "STATUS",
    accessorKey: "status",
  },

  {
    header: "TOTAL",
    accessorKey: "total",
  },
  {
    id: "action",
    header: "ACTION",
    cell: () => {
      return (
        <DialogOrder />
      );
    },
  },
];
