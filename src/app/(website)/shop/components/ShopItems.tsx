"use client";
import Card from "@/app/(website)/components/shared/Card";
import { items } from "@/app/(website)/components/views/data";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";

const ShopItems = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["restaurants"],
    queryFn: async () => {
      const restaurantData = await axios.get(
        `http://localhost:3000/api/allfoods`
      );
      return restaurantData.data;
    },
  });

  // console.log({ data });

  const sliceItems1 = items.slice(0);
  return (
    <div className="py-16 container">
      <div className=" grid grid-cols-1 gap-10">
        {data?.restaurants.map((restaurant: any, index: any) => (
          <div key={index} className="">
            <h6 className="">{restaurant?.name}</h6>
            <div className="grid grid-cols-4 gap-10 mt-8 mb-8">
              {restaurant?.foods.map((item: any, index: any) => (
                <Card item={item} />
             
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopItems;
