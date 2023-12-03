"use client";
import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { items } from "../data";
import Card from "../../shared/Card";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { CategoryType, ProductType } from "@/app/types/type";

const HomeMenu = () => {
  const [cat, setCat] = useState<String | null>("Italian");

  const { data, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const categories = await axios.get(
        `http://localhost:3000/api/categories`
      );
      return categories.data;
    },
  });

  const { data: productData } = useQuery({
    queryKey: ["allproducts"],
    queryFn: async () => {
      const allproducts = await axios.get(
        `http://localhost:3000/api/allproducts`
      );
      return allproducts.data;
    },
  });

  if (isLoading) {
    return <h6>Loading...</h6>;
  }
  if (error) return "An error has occurred: " + error.message;

  console.log({ data });

  // const uniqueCategories: any = [];

  // // Iterate through the items and extract unique categories
  // data?.products.forEach((item:ProductType) => {
  //   if (!uniqueCategories.includes(item?.category?.name)) {
  //     uniqueCategories.push(item?.category?.name);
  //   }
  // });

  // console.log(uniqueCategories);

  // const sliceItems = data?.products?.filter((item:ProductType)=>item?.category?.name==cat)
  // console.log({sliceItems});

  return (
    <div className="mt-16 pb-10 container">
      <p className="text-[#F3AB24] mb-4">Menus</p>
      <h5 className="mb-8 font-semibold text-4xl">Our Popular Menu</h5>
      <div className="grid grid-cols-10 gap-14 mt-16">
        {data?.categories?.map((item: CategoryType, index: number) => (
          <button
            key={index}
            onClick={() => setCat(item?.name)}
            className={
              item?.name == cat
                ? `h-fit w-fit text-16 py-3 px-7 rounded-[24px] bg-[#F3AB24] text-white`
                : `h-fit w-fit text-16 py-3 px-7 rounded-[24px] border border-[#CBD5E1]`
            }
          >
            {item?.name}
          </button>
        ))}
      </div>
      <div className="flex  justify-between items-center mt-12 mb-5">
        <h5 className="mb-8 font-semibold text-4xl">{cat}</h5>
        {/* <div className="text-black flex gap-2  items-center">
          <p className="font-bold">View All</p>
          <IoIosArrowForward className="w-5 h-5" />
        </div> */}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 rounded-[10px] ">
        {productData?.products?.map(
          (item: ProductType, index: any) =>
            item?.category?.name == cat && <Card key={index} item={item} /> 
        )}
      </div>
    </div>
  );
};

export default HomeMenu;
