"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Select } from "@/components/ui/select";
import {
  ProductType,
} from "@/app/types/type";
import { DialogDemo } from "./DialogDemo";
import { RiDeleteBin5Fill } from "react-icons/ri";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BiSolidPencil } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import Image from "next/image";
import BasicTable1 from "../../components/shared/BasicTable1";
import { toast } from "react-toastify";
import { useRef } from "react";
import ReactToPrint from 'react-to-print';

export function ProductDataTable() {
  const queryClient = useQueryClient();
  const componentRef = useRef();
 
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const productsData = await axios.get(
        `http://localhost:3000/api/restaurant/foods`
      );
      return productsData.data;
    },
  });

  if (isLoading) {
    return <h6>Loading...</h6>;
  }
  if (error) return "An error has occurred: " + error.message;

  console.log({ data });

  // single data delete
  const DeleteProduct = async (data: ProductType) => {
    try {
      const deleteProduct = await axios.delete(
        `http://localhost:3000/api/products/${data.id}`
      );

      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product deleted successfully");
      return deleteProduct.data;
    } catch (error) {
      console.error(error);
      toast.error("Error deleting the product");
    }
  };

  const columns: ColumnDef<ProductType>[] = [
    {
      id: "name",
      header: "name",
      cell: ({ row }) => {
        // console.log(row?.original);

        if (!row?.original?.name) return "--";

        return <div>{row.original?.name}</div>;
      },
    },
    {
      id: "image",
      header: "image",
      cell: ({ row }) => {
        // console.log(row?.original);

        if (!row?.original?.image) return "--";

        return (
          <div className="w-16 h-16 relative">
            <Image src={row.original?.image} alt="product" fill />
          </div>
        );
      },
    },
    {
      id: "slug",
      header: "slug",
      cell: ({ row }) => {
        // console.log(row?.original);

        if (!row?.original?.slug) return "--";

        return <div>{row.original?.slug}</div>;
      },
    },
    {
      id: "category",
      header: "Category",
      cell: ({ row }) => {
        if (!row?.original?.category?.name) return "--";
        return <div>{row.original?.category?.name}</div>;
      },
    },

    {
      id: "description",
      header: "description",
      cell: ({ row }) => {
        // console.log(row?.original);

        if (!row?.original?.description) return "--";

        return <div>{row.original?.description}</div>;
      },
    },

    {
      id: "stock",
      header: "Stock",
      cell: ({ row }) => {
        // console.log(row?.original);

        if (!row?.original?.stock) return "--";

        return <div>{row.original?.stock}</div>;
      },
    },
    {
      id: "price",
      header: "price",
      cell: ({ row }) => {
        // console.log(row?.original);

        if (!row?.original?.price) return "--";

        return <div>{row.original?.price} tk</div>;
      },
    },
    {
      id: "action",
      header: "ACTION",
      cell: ({ row }) => {
        // console.log(row.original);

        return (
          <div className="flex gap-3 justify-center  w-[400px]">
            <DialogDemo
              initialValue={row.original}
              className="p-3 rounded-lg bg-bone hover:bg-none border border-[#F57213]"
              title="Update Product"
              update="update"
              icon={<BiSolidPencil className="text-[#F57213] w-5 h-5" />}
            />
            <button
              onClick={() => DeleteProduct(row.original)}
              className="p-3 rounded-lg bg-bone hover:bg-none border border-[#F57213]"
            >
              <RiDeleteBin5Fill className="text-[#F57213] w-4 h-4" />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div
      className="rounded-[10px] w-full overflow-x-auto"
      style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.16)" }}
    >
      <div className="flex justify-between items-center py-8 px-6">
        <h6>All products</h6>
        <div>
          <DialogDemo
            className="bg-[#F57213] hover:bg-[#F57213] text-white"
            button1="Add New"
            title="Add Product"
            icon={<AiOutlinePlus className="w-3 h-3 text-white" />}
            update="save"
          />
          <Select />
        </div>
      </div>

      <BasicTable1  data={data?.foods} columns={columns} />
      {/* <ReactToPrint
        trigger={() => <button className="bg-[#F57213] text-white py-3 px-10 rounded-md ml-4 my-4">Print</button>}
        content={() => componentRef?.current}
      /> */}
    </div>
  );
}

export default ProductDataTable;
