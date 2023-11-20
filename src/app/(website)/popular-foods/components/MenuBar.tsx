"use client";
import { useState } from "react";
import Card from "../../components/shared/Card";
import { items } from "../../components/views/data";
import SearchBar from "./SearchBar";
import { BsSearch } from "react-icons/bs";

const MenuBar = () => {
  const [data, setData] = useState("");
  const [page, setPage] = useState(10);
  
  // const pageSize = 1;
  // const lastIndex = pageSize * page
  // const firstIndex = 0;//0
  // const nextDisable = Math.ceil((items.length)/page)
  const Filter = (e: any) => {
    setData(e.target.value);
  };
  const SearchItems = items.filter((item: any) =>
    item.name.toLowerCase().includes(data) || item.name.includes(data)
  );
  const Showitems = SearchItems.slice(0, page);
  //  console.log({nextDisable});

  return (
    <div className="w-full ">
      <div
        className="flex justify-between items-center mb-12 py-4 px-7"
        style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.16)" }}
      >
        <SearchBar Filter={Filter} placeholder="Search foods" />
        <div className="flex gap-2 items-center">
          <p>Show: </p>
          <select
            name="show"
            id="show"
            value={page}
            onChange={(e) => setPage(parseInt(e.target.value))}
            className="border border-[#94A3B8] py-2 px-4"
          >
            <option value="10" className="cursor-pointer">
              10
            </option>
            <option value="20" className="cursor-pointer">
              20
            </option>
            <option value="30" className="cursor-pointer">
              30
            </option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-7 mb-10">
        {Showitems.map((item) => (
          <Card item={item} />
        ))}
      </div>
      {/* <div className="flex justify-end gap-8 items-center pb-10">
        <button className="text-xl font-semibold" onClick={()=>setPage(page - 1)} disabled={page==1}>Previous</button>
        <h6>{page}</h6>
        <button className="text-xl font-semibold" onClick={()=>setPage(page + 1)} disabled={page==nextDisable}>Next</button>
      </div> */}
    </div>
  );
};

export default MenuBar;
