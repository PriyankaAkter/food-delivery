"use client";
import { useState } from "react";
import { items } from "../../components/views/data";
const Offers = () => {
  // const [data,setData] = useState(50)
  const uniqueCategories: any = [];

  items.forEach((item) => {
    if (!uniqueCategories.includes(item.category)) {
      uniqueCategories.push(item.category);
    }
  });
  //   console.log({uniqueCategories});

  return (
    <div
      className="w-full py-4 px-7"
      style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.16)" }}
    >
      <h6 className="py-4">Foods Menu</h6>
      {uniqueCategories.map((item: any) => (
        <div className="border-t py-7 flex justify-between items-center">
          <div className="flex items-center  gap-2">
            <input className="w-4 h-4 sb" type="checkbox" />
            <h6>{item}</h6>
          </div>
          <h6>30</h6>
        </div>
      ))}
    </div>
  );
};

export default Offers;
