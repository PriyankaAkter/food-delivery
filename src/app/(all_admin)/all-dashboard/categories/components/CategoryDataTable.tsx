"use client";
import { AiOutlinePlus} from "react-icons/ai";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import {
  ColumnDef,
} from "@tanstack/react-table";



import { Select } from "@/components/ui/select";

import { CategoryType } from "@/app/types/type";
import { DialogDemo } from "./DialogDemo";
import BasicTable from "../../components/shared/BasicTable";
import { RiDeleteBin5Fill } from "react-icons/ri";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BiSolidPencil } from "react-icons/bi";
import BasicTable1 from "@/app/(admin)/dashboard/components/shared/BasicTable1";
import { toast } from "react-toastify";



export function CategoryDataTable() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
        const categoryData = await axios.get(
          `http://localhost:3000/api/categories`
        );
        return categoryData.data;
      }
  });
  
  
  if (isLoading) {
    return <h6>Loading...</h6>;
  }
  if (error) return "An error has occurred: " + error.message;

//single data delete
    const DeleteCategory = async (data:CategoryType) => {
      try {
        const deleteData = await axios.delete(`http://localhost:3000/api/categories/${data.id}`)
        queryClient.invalidateQueries({ queryKey: ["categories"] });
        toast.success('Category deleted successfully')
        return deleteData.data
      } catch (error) {
        console.error(error)
        toast.error("Error Occur!");
      }
    };
  

  const columns: ColumnDef<CategoryType>[] = [
    // {
    //   header: "ID",
    //   accessorKey: "id",
    // },
    {
      header: "Category Id",
      accessorKey: "cat_id",
    },
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Slug",
      accessorKey: "slug",
    },
   
    {
      id: "action",
      header: "ACTION",
      cell: ({row}) => {
          // console.log(row.original.id);
          
        return (
          <div className="flex gap-5 justify-center">
            
            <DialogDemo initialValue={row.original} className="p-3 rounded-lg bg-bone hover:bg-none border border-[#F57213]" title="Update Category" update="update" icon={<BiSolidPencil className="text-[#F57213] w-5 h-5" />}  />
            <button onClick={()=>DeleteCategory(row.original)} className="p-3 rounded-lg bg-bone hover:bg-none border border-[#F57213]">
              <RiDeleteBin5Fill className="text-[#F57213] w-4 h-4" />
            </button>
          </div>
        );
      },
    },
  ];
  


  return (
    <div
      className="overflow-x-auto rounded-[10px] my-4 p-4 shadow-md"
      style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.16)" }}
    >
      <div className="flex justify-between items-center py-8 px-6">
        <h6>All Categories</h6>
        <div>
          <DialogDemo
            className="bg-[#F57213] hover:bg-[#F57213] text-white"
            button1="Add New"
            title="Add Category"
            icon={<AiOutlinePlus className="w-3 h-3 text-white" />}
            update="save"
          />
          <Select />
        </div>
      </div>
      
      <BasicTable1 data={data?.categories} columns={columns} />
      
    </div>
  );
}

export default CategoryDataTable;
