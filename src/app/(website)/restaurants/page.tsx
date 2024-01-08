"use client";
import { useState } from "react";
import SearchBar from "../popular-foods/components/SearchBar";

import { items } from "../components/views/data";
import RestaurantCard from "./components/RestaurantCard";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "lucide-react";


const Page = () => {
 
  const { data, isLoading, error } = useQuery({
    queryKey: ["restaurants"],
    queryFn: async () => {
      const restaurantData = await axios.get(
        `http://localhost:3000/api/restaurant`
      );
      return restaurantData.data;
    },
  });

// console.log({data});

return (
  <div className="py-10 container">
    <h6 className="text-black mb-4">All Restaurants</h6>
    {/* <div className="h-[2px] w-20 bg-[#F3AB24] my-10"></div> */}
    
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-16">
      {
        data?.restaurants?.map((item:any,index:any)=>
          <RestaurantCard key="index" item={item}  />
        )
      }
    </div>
  </div>
  );
};

export default Page;
