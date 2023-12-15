"use client";
import { items } from "@/app/(website)/components/views/data";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const FoodsMenu = () => {
  // const [filter,setFilter] = useState("Pizza")
  // const queryClient = useQueryClient();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { data, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
        const categoryData = await axios.get(
          `http://localhost:3000/api/categories`
        );
        return categoryData.data;
      }
  });
  
  
  if (isLoading) {
    return <h6>Loading...</h6>;
  }
  if (error) return "An error has occurred: " + error.message;

  const handleCheckboxChange = (categoryName: string) => {
    const updatedCategories = selectedCategories.includes(categoryName)
      ? selectedCategories.filter((category) => category !== categoryName)
      : [...selectedCategories, categoryName];
  
    setSelectedCategories(updatedCategories);
  };


  return (
    <div
      className="w-full py-4 px-7 h-fit"
      style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.16)" }}
    >
      <h6 className="py-4">Foods Category</h6>
      
      {data?.categories?.map((item: any) => (
        <div className="py-4 flex justify-between items-center">
          <div className="flex items-center  gap-2">
            <input className="w-4 h-4 sb" type="checkbox" checked={selectedCategories.includes(item.name)}
        onChange={() => handleCheckboxChange(item.name)} />
            <h6>{item.name}</h6>
          </div>
          
        </div>
      ))}
    </div>
  );
};

export default FoodsMenu;
