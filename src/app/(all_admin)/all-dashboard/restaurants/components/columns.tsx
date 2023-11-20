"use client";
import { ColumnDef} from "@tanstack/react-table";
import Image from "next/image";
import { DialogDemo } from "@/app/(admin)/dashboard/components/shared/DialogDemo";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { BiSolidPencil } from "react-icons/bi";
import { CategoryType, RestaurantColumnType } from "@/app/types/type";

export const columns: ColumnDef<RestaurantColumnType>[] = [
  {
    header: "ID",
    accessorKey: "res_id",
  },
  {
    header: "Photo",
    cell: ({row}:any) => {
      console.log(row.original);
      
        return (
          <div className="relative w-16 h-16 ">
          <Image src={row.original?.res_image} alt='restaurant' fill className="object-cover rounded-[4px]" />
        </div>
        )
      },
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Location",
    accessorKey: "city",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Phone",
    accessorKey: "phone",
  },
  {
    header: "Joined Date",
    accessorKey: "createdAt",
  },

  {
    id: "action",
    header: "ACTION",
    cell: () => {
      return (
        <div className="flex gap-5">
          <DialogDemo className="p-3 rounded-lg bg-bone hover:bg-none border border-[#F57213]" title="Update Restaurant" update="update" icon={<BiSolidPencil className="text-[#F57213] w-5 h-5" />}  />
          <button className="p-3 rounded-lg bg-bone hover:bg-none border border-[#F57213]">
            <RiDeleteBin5Fill className="text-[#F57213] w-4 h-4" />
          </button>
        </div>
      );
    },
  },
];
