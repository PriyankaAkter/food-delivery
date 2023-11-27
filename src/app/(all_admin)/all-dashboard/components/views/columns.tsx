"use client";
import { ColumnDef} from "@tanstack/react-table";
import { RestaurantsData } from "@/app/(admin)/dashboard/components/shared/data";

import Image from "next/image";

import { DialogDemo } from "@/app/(admin)/dashboard/components/shared/DialogDemo";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { BiSolidPencil } from "react-icons/bi";
import Link from "next/link";




// {
//     id: 4,
//     res_id: 1004,
//     name: "Hot & Spicy",
//     slug: "hot-&-spicy",
//     img: '/assests/images/home/res4.png',
//     joining_date: "Dec 05 2021 13:25",
//     total_earning: 440000,
//     last_month_earning: 10000,
//   },

export const columns: ColumnDef<RestaurantsData>[] = [
  {
    header: "Restaurant",
    cell: ({row}) => {
        console.log(row.original);
        return (
          <div className="flex gap-4 items-center">
            <h6>{row.original.id}</h6>
            <div className="relative w-16 h-16 ">
              <Image src={row.original.img} alt='restaurant' fill className="object-cover rounded-[4px]" />
            </div>
            <div>
              <h6>{row.original.name}</h6>
              <p>{row.original.location}</p>
            </div>
          </div>
        )
      },
  },
  
  {
    header: "Total Earning",
    // accessorKey: "phone",
  },
  {
    header: "Last Month Earning",
    // accessorKey: "phone",
  },
  {
    header: "Joined Date",
    accessorKey: "joining_date",
  },

  // {
  //   id: "action",
  //   header: "ACTION",
  //   cell: ({row}) => {
  //     return (
  //       <div className="">
  //        <Link href={`/all-dashboard/restaurants/${row.original.slug}`} className="rounded-md">View Details</Link>
  //       </div>
  //     );
  //   },
  // },
];
