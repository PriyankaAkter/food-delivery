import React from "react";
import OrderCard from "./components/views/OrderCard";
import { SideBar } from "./components/shared/SideBar";

const Page = () => {
  return (
    <div className="flex">
      <SideBar />
      <div className="w-[1460px] px-8 grid grid-cols-3 gap-8 py-20">
        <OrderCard />
        <OrderCard />
        <OrderCard />
      </div>
    </div>
  );
};

export default Page;
