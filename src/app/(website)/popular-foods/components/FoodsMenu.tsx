"use client";
import { useState } from "react";
import { items } from "../../components/views/data";
const FoodsMenu = () => {
  // const [filter,setFilter] = useState("Pizza")
  const uniqueCategories = new Set();

  const unique_cat = items.filter((item) => {
    if (!uniqueCategories.has(item.category)) {
      uniqueCategories.add(item.category);
      return true;
    }
    return false;
  });

  // console.log({uniqueRestaurants});

  return (
    <div
      className="w-full py-4 px-7 h-fit"
      style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.16)" }}
    >
      <h6 className="py-4">Foods Category</h6>
      
      {unique_cat.map((item: any) => (
        <div className="py-4 flex justify-between items-center">
          <div className="flex items-center  gap-2">
            <input className="w-4 h-4 sb" type="checkbox"  />
            <h6>{item.category}</h6>
          </div>
          {/* <h6>30</h6> */}
        </div>
      ))}
    </div>
  );
};

export default FoodsMenu;
