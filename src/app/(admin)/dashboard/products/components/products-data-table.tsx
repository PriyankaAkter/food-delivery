"use client";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { ColumnDef } from "@tanstack/react-table";
import { Select } from "@/components/ui/select";
import {
  ProductType,
  ProductType1,
  RestaurantColumnType,
} from "@/app/types/type";
import { DialogDemo } from "./DialogDemo";
import BasicTable from "../../components/shared/BasicTable";
import { RiDeleteBin5Fill } from "react-icons/ri";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BiSolidPencil } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import Image from "next/image";

export function ProductDataTable() {
  const queryClient = useQueryClient();

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
      return deleteProduct.data;
    } catch (error) {
      console.error(error);
    }
  };

  const columns: ColumnDef<ProductType>[] = [
    {
      id: "name",
      header: "name",
      cell: ({ row }) => {
        console.log(row?.original);

        if (!row?.original?.name) return "--";

        return <div>{row.original?.name}</div>;
      },
    },
    {
      id: "image",
      header: "image",
      cell: ({ row }) => {
        console.log(row?.original);

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
        console.log(row?.original);

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
        console.log(row?.original);

        if (!row?.original?.description) return "--";

        return <div>{row.original?.description}</div>;
      },
    },

    {
      id: "stock",
      header: "Stock",
      cell: ({ row }) => {
        console.log(row?.original);

        if (!row?.original?.stock) return "--";

        return <div>{row.original?.stock}</div>;
      },
    },
    {
      id: "price",
      header: "price",
      cell: ({ row }) => {
        console.log(row?.original);

        if (!row?.original?.price) return "--";

        return <div>{row.original?.price}</div>;
      },
    },
    {
      id: "action",
      header: "ACTION",
      cell: ({ row }) => {
        console.log(row.original);

        return (
          <div className="flex gap-5">
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
      className="rounded-[10px] w-[1460px]"
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
      <hr className="pb-10" />
      <BasicTable data={data?.foods} columns={columns} />
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

export default ProductDataTable;
