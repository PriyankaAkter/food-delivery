"use client";
import { ColumnDef} from "@tanstack/react-table";
import { OrderHistoryData } from "../../components/shared/data";
import { Button } from "@/components/ui/button";
import { DialogDemo } from "../../components/shared/DialogDemo";
import { DialogOrder } from "./DialogOrder";


export const columns: ColumnDef<OrderHistoryData>[] = [
  {
    header: "ORDER",
    accessorKey: "id",
  },
  {
    header: "TIME",
    accessorKey: "time",
  },
  {
    header: "CUSTOMER",
    accessorKey: "customer",
  },
  {
    header: "STATUS",
    accessorKey: "status",
  },

  {
    header: "ORDER VALUE",
    accessorKey: "order_amount",
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
