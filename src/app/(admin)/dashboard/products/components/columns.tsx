"use client";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Products } from "./data";
import Image from "next/image";
import { BiSolidPencil } from "react-icons/bi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { DialogDemo } from "./DialogDemo";


export const columns: ColumnDef<Products>[] = [
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Category",
    accessorKey: "category",
  },
  // {
  //   header: "Photo",
  //   accessorKey: "image",
  //   cell: ({ getValue }) => {
  //     return (
  //       <div className="relative w-10 h-10">
  //         <Image
  //           src={getValue<string>()}
  //           alt="Product"
  //           fill
  //           className="rounded-full"
  //         />
  //       </div>
  //     );
  //   },
  // },
  {
    header: "Photo",
    cell: ({row}:any) => {
      console.log(row.original);
      
        return (
          <div className="relative w-16 h-16 ">
          <Image src={row.original?.image} alt='product' fill className="object-cover rounded-[4px]" />
        </div>
        )
      },
  },
  {
    header: "Description",
    accessorKey: "description",
  },

  {
    header: "Availability",
    accessorKey: "availability",
    cell: ({ row }) => {
      const test: string = row.getValue("availability");
      return <div className="">{test}</div>;
    },
  },
  {
    header: "Price(tk)",
    accessorKey: "price",
  },
  {
    id: "action",
    header: "ACTION",
    cell: () => {
      return (
        <div className="flex gap-5">
          <DialogDemo className="p-3 rounded-lg bg-bone hover:bg-none border border-[#F57213]" title="Update Product" update="update" icon={<BiSolidPencil className="text-[#F57213] w-5 h-5" />}  />
          <button className="p-3 rounded-lg bg-bone hover:bg-none border border-[#F57213]">
            <RiDeleteBin5Fill className="text-[#F57213] w-4 h-4" />
          </button>
        </div>
      );
    },
  },
];
