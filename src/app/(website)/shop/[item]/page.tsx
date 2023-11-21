"use client";
import React from "react";
import ItemHero from "./components/ItemHero";
import RelatedItems from "./components/RelatedItems";
import { useParams } from "next/navigation";
import { items } from "@/app/(website)/components/views/data";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Card } from "@tremor/react";
import { IoIosArrowForward } from "react-icons/io";

const Page = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["restaurants"],
    queryFn: async () => {
      const restaurantData = await axios.get(`http://localhost:3000/api/food`);
      return restaurantData.data;
    },
  });

  console.log({ data });

  const params = useParams();
  console.log({ params });

  // const item = items.find((item)=> item.food_slug==params.item)
  // console.log({item});

  // const relatedItems = data?.Restaurant.map((item1: any, index: any) => (
  //   <div className="w-full grid grid-cols-4 gap-16">
  //     {data?.restaurants?.map((item: any, index: any) => (
        
  //     ))}
  //   </div>
  // ));
  // console.log({ relatedItems });
  return (
    <div className="py-16 container">
        <div className="flex  justify-between items-center mb-5">
          <h5 className="mb-5 font-bold">All Food Items</h5>
          <div className="text-[#F29F05] flex gap-2  items-center">
            <p className="font-bold">See More</p>
            <IoIosArrowForward className="w-5 h-5" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 rounded-[10px] ">
          {data?.map((item:any, index:any) => (
            <Card key={index} item={item} />
          ))}
        </div>
      </div>
  );
};

export default Page;
