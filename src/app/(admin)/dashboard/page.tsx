import React from "react";
import OrderCard from "./components/views/OrderCard";
import { SideBar } from "./components/shared/SideBar";

const Page = () => {
  return (
    <div className="flex">
      <SideBar />
      <div className="container1 py-20 px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-2 gap-16 ">
        <OrderCard />
        <OrderCard />

        </div>
        {/* <OrderCard /> */}
        {/* <OrderCard /> */}
      </div>
    </div>
  );
};

export default Page;
