import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import BasicTable from '../../components/shared/BasicTable';
import { AiOutlinePlus } from 'react-icons/ai';
import { ColumnDef } from '@tanstack/react-table';
import { RestaurantColumnType } from '@/app/types/type';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { BiSolidPencil } from 'react-icons/bi';
import { DialogDemo } from './DialogDemo';
import Image from 'next/image';
import BasicTable1 from '@/app/(admin)/dashboard/components/shared/BasicTable1';



const fetchRestaurant = async () => {
    const restaurantsData = await axios.get(
      "http://localhost:3000/api/restaurant"
    );
    return restaurantsData.data;
  };
const RestaurantDataTable = () => {
    const queryClient = useQueryClient();
    const { data, isLoading, error } = useQuery({
        queryKey: ["restaurant"],
        queryFn: () => fetchRestaurant(),
      });
      
      
      if (isLoading) {
        return <h6>Loading...</h6>;
      }
      if (error) return "An error has occurred: " + error.message;
      console.log({ data });
     




//single data delete
const DeleteRestaurant = async (data:RestaurantColumnType) => {
    try {
      const deleteData = await axios.delete(`http://localhost:3000/api/restaurant/${data.id}`)
      queryClient.invalidateQueries({ queryKey: ["restaurant"] });
      return deleteData.data
    } catch (error) {
      console.error(error)
    }
  };


const columns: ColumnDef<RestaurantColumnType>[] = [
  
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    id: "image",
    header: "image",
    cell: ({row}) => {
      console.log(row.original);
      if(!row.original?.image) return ""
      return (
        <div className="w-16 h-16 relative"> 
          <Image src={row.original?.image} alt="restaurant" fill />
        </div>
      );
    },
  },
  {
    header: "Slug",
    accessorKey: "slug",
    cell: ({row}) => {
      console.log(row.original);
      if(!row.original?.slug) return ""
      return (
        <div> 
          {row.original?.slug}
        </div>
      );
    },
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Phone",
    accessorKey: "phone",
    cell: ({row}) => {
      console.log(row.original);
      if(!row.original?.phone) return ""
      return (
        <div> 
          {row.original?.phone}
        </div>
      );
    },
  },
  {
    header: "Joined Date",
    accessorKey: "createdAt",
  },

  {
    id: "action",
    header: "ACTION",
    cell: ({row}) => {
      console.log(row.original);
      
      return (
        <div className="flex gap-5 justify-center">
          {/* <DialogDemo initialValue={row.original} className="p-3 rounded-lg bg-bone hover:bg-none border border-[#F57213]" title="Update Restaurant" update="update" icon={<BiSolidPencil className="text-[#F57213] w-5 h-5" />}  /> */}
          <button onClick={()=>DeleteRestaurant(row.original)} className="p-3 rounded-lg bg-bone hover:bg-none border border-[#F57213]">
            <RiDeleteBin5Fill className="text-[#F57213] w-4 h-4" />
          </button>
        </div>
      );
    },
  },
];

  return (
    <div
      className="rounded-[10px] "
      style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.16)" }}
    >
      <div className="flex justify-between items-center py-8 px-6">
        <h6>All Restaurants</h6>
        <div>
         

             {/* <DialogDemo
            className="bg-[#F57213] hover:bg-[#F57213] text-white"
            button1="Add New"
            title="Add Restaurant"
            icon={<AiOutlinePlus className="w-3 h-3 text-white" />}
            update="save"
          />   */}
       
        </div>
      </div>
      
      <BasicTable1 data={data?.restaurants} columns={columns} />
      
    </div>
  )
}

export default RestaurantDataTable