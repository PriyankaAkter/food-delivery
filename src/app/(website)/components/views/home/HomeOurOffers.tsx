import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { items } from "../data";
import Card from "../../shared/Card";

const HomeOurOffers = () => {
  const sliceItems1 = items.slice(0, 4);
  return (
    <div className="mt-16 pb-10 container">
      <p className="text-[#F3AB24] mb-4">Offers</p>
      <div className="flex  justify-between items-center mb-5">
        <h5 className="mb-8 font-semibold text-4xl">Our Best Offers</h5>
        <div className="text-black flex gap-2  items-center">
          <p className="font-bold">View All</p>
          <IoIosArrowForward className="w-5 h-5" />
        </div>
      </div>
      <div className=" grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 rounded-[10px] ">
        {sliceItems1.map((item: any, index: any) => (
          <div className="relative">
            <Card key={index} item={item} />
            <div className="absolute top-4 right-4 w-fit bg-[#F29F05] py-1 px-2 rounded-[4px] text-base text-white">
              5% off
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeOurOffers;
