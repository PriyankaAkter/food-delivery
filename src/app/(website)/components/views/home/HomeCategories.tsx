'use client'
import {useState} from 'react'
import { items } from "../data";
import HomeMenu from './HomeMenu';

const HomeCategories = () => {
  const [cat,setCat] = useState('pizza')
  const uniqueCategories: any = [];

  // Iterate through the items and extract unique categories
  items.forEach((item) => {
    if (!uniqueCategories.includes(item.category)) {
      uniqueCategories.push(item.category);
    }
  });

  console.log(uniqueCategories);
  return (
    <div className="py-16 container">
      <p className="text-[#F3AB24] mb-4">Menus</p>
      <h5 className="mb-8 font-semibold text-4xl">Our Popular Menu</h5>
      <div className="grid grid-cols-10 gap-14 mt-16">
        {uniqueCategories.map((item: any, index: any) => (
          <button
            key={index}
            className={item=='Pizza'?`h-fit w-fit text-16 py-3 px-7 rounded-[24px] bg-[#F3AB24] text-white`:`h-fit w-fit text-16 py-3 px-7 rounded-[24px] border border-[#CBD5E1]`}
          >
            {item}
          </button>
        ))}
      </div>
      <HomeMenu />
    </div>
  );
};

export default HomeCategories;
