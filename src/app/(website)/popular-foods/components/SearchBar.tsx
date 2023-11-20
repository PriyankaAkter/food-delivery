"use client";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { items } from "../../components/views/data";


// type SearchBarTypes = {
//   Filter:string,
//   placeholder?:string
// }
const SearchBar = ({Filter,placeholder}:any) => {

  return (
    <div
      className=""
      
    >
      <form className="flex flex-col 2xl:flex-row gap-5 w-[379px] relative">
        <input
          onChange={Filter}
          type="text"
          className="w-full border border-[#CBD5E1] outline-none py-3 pl-5 rounded-[4px]"
          placeholder={placeholder}
        ></input>
        <div className="absolute right-5 top-4">
          <BsSearch className="w-4 h-4 text-[#94A3B8]" />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
