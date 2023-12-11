"use client"
import { IoIosArrowForward } from "react-icons/io";
import RestaurantCard from "../../../restaurants/components/RestaurantCard";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { RestaurantColumnType } from "@/app/types/type";

const HomeNearbyRes = () => {
  
  // const queryClient = useQueryClient();
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
    <div className="py-28 container">
      {/* <p className="text-[#F3AB24] mb-4">Restaurants</p> */}
      <div className="flex  justify-between items-center mb-5">
        <h5 className="mb-8 font-semibold text-4xl">Restaurants</h5>
        <Link href='/restaurants' className="text-black flex gap-2  items-center">
          <p className="font-bold">View All</p>
          <IoIosArrowForward className="w-5 h-5" />
        </Link>
      </div>
      <div className="w-full grid grid-cols-3 gap-10">
        {
          data?.restaurants?.map((item:RestaurantColumnType,index:number)=>
            <RestaurantCard key="index" item={item}  />
          )
        }
      </div>
    </div>
  );
};

export default HomeNearbyRes;
