"use client";
import { ColumnDef} from "@tanstack/react-table";
import { OrderHistoryData } from "../../components/shared/data";
import { Button } from "@/components/ui/button";
import { DialogDemo } from "../../components/shared/DialogDemo";
import { DialogOrder } from "./DialogOrder";
import { OrderType } from "@/app/types/type";



// model Order {
//   id           Int         @id @default(autoincrement())
//   orderNumber  String?      @unique @default(uuid())
//   createdAt    DateTime    @default(now())
//   updatedAt    DateTime    @updatedAt
//   userName String?
//   userEmail String?
//   items        Json?
//   status     Status?   @default(UnPaid)
//   price Decimal?
//   payment_id   String?      @unique
// }

export const columns: ColumnDef<OrderType>[] = [
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
  },
  {
    header: "STATUS",
    accessorKey: "status",
  },

  {
    header: "ORDER VALUE",
    accessorKey: "price",
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
