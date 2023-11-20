'use client'
import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { items } from "../data";
import Card from "../../shared/Card";

const HomeMenu = () => {
    const [cat,setCat] = useState('Pizza')
    const uniqueCategories: any = [];
  
    // Iterate through the items and extract unique categories
    items.forEach((item) => {
      if (!uniqueCategories.includes(item.category)) {
        uniqueCategories.push(item.category);
      }
    });
  
    // console.log(uniqueCategories);

    const sliceItems = items.filter((item)=>item.category==cat)
    // console.log({sliceItems});
    
  return (
    <div className="mt-16 pb-10 container">
      <p className="text-[#F3AB24] mb-4">Menus</p>
      <h5 className="mb-8 font-semibold text-4xl">Our Popular Menu</h5>
      <div className="grid grid-cols-10 gap-14 mt-16">
        {uniqueCategories.map((item: any, index: any) => (
          <button
            key={index}
            onClick={()=> setCat(item)}
            className={item==cat?`h-fit w-fit text-16 py-3 px-7 rounded-[24px] bg-[#F3AB24] text-white`:`h-fit w-fit text-16 py-3 px-7 rounded-[24px] border border-[#CBD5E1]`}
          >
            {item}
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
      <div className=" grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 rounded-[10px] ">
        {sliceItems.map((item: any, index: any) => (
          <div key={index}>
            <Card  item={item} />
           
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeMenu;


