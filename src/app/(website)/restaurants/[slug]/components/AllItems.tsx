import Card from "@/app/(website)/components/shared/Card";
import { ProductType, RestaurantColumnType } from "@/app/types/type";
import React, { useState } from "react";
import SearchBar from "./SearchBar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface AllItemsProps {
  item: RestaurantColumnType;
}

const AllItems: React.FC<AllItemsProps> = ({ item }) => {
  const [data, setData] = useState("");
  // const [page, setPage] = useState(10);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const {
    data: categoryData,
    isLoading: categoryLoading,
    error: categoryError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3000/api/categories");
      return response.data;
    },
  });

  if (categoryLoading) {
    return <h6>Loading categories...</h6>;
  }
  if (categoryError) {
    return <div>An error occurred: {categoryError.message}</div>;
  }

  const Filter = (e: any) => {
    setData(e.target.value);
  };

  const filteredItems = item?.foods?.filter(
    (foodItem: ProductType) =>
      (foodItem?.name?.toLowerCase().includes(data) ||
        foodItem?.name?.includes(data)) &&
      (selectedCategories.length === 0 ||
        selectedCategories.includes(foodItem?.category?.name))
  );

  return (
    <div className="py-16 container">
      <div className="flex flex-col xl:flex-row gap-10 ">
        <div
          className="w-full sm:w-[360px] py-4 px-7 h-fit"
          style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.16)" }}
        >
          <h6 className="py-4">Foods Category</h6>

          {categoryData?.categories?.map((category: any) => (
            <div
              className="py-4 flex justify-between items-center"
              key={category.name}
            >
              <div className="flex items-center gap-2">
                <input
                  className="w-4 h-4 sb"
                  type="checkbox"
                  checked={selectedCategories.includes(category.name)}
                  onChange={() =>
                    setSelectedCategories((prevCategories) => {
                      if (prevCategories.includes(category.name)) {
                        return prevCategories.filter(
                          (cat) => cat !== category.name
                        );
                      } else {
                        return [...prevCategories, category.name];
                      }
                    })
                  }
                />
                <h6>{category.name}</h6>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full ">
          <div
            className="flex items-center justify-between py-4 px-7 mb-8"
            style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.16)" }}
          >
            <SearchBar Filter={Filter} placeholder="Search foods" />
            {/* <div className="flex gap-2 items-center">
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
            </div> */}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10  ">
            {filteredItems?.map((foodItem: ProductType, index: number) => (
              <Card key={index} item={foodItem} />
            )) ?? []}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllItems;
