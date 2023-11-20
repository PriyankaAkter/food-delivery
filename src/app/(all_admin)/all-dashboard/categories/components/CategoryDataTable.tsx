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
        return deleteData.data
      } catch (error) {
        console.error(error)
      }
    };
  

  const columns: ColumnDef<CategoryType>[] = [
    {
      header: "ID",
      accessorKey: "id",
    },
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
          <div className="flex gap-5">
            
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
      className="rounded-[10px] "
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
      <hr className="pb-10" />
      <BasicTable data={data?.categories} columns={columns} />
      <div className="py-10">
        <hr />
        <div className="flex justify-between items-center px-6 pt-5">
          <h6>Rows Per Page 10</h6>
          <div className="flex items-center gap-4">
            <GrFormPrevious className="w-6 h-6 text-black" />
            <h6>1</h6>
            <h6>2</h6>
            <GrFormNext className="w-6 h-6 text-black" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryDataTable;
