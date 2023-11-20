"use client";

import RestaurantDataTable from "./components/RestaurantDataTable";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { columns } from "./components/columns";
import BasicTable from "../components/shared/BasicTable";

const Page = () => {
  
  return (
    <div className="container1 py-16">
      <RestaurantDataTable />
      {/* <BasicTable data={data.restaurants} columns={columns} /> */}
    </div>
  );
};

export default Page;
