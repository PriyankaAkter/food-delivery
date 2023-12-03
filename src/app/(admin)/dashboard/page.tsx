import React from "react";
import OrderCard from "./components/views/OrderCard";
import { SideBar } from "./components/shared/SideBar";
import Dashboard from "./components/views/Dashboard";

const Page = () => {
  return (
    <div className="flex">
      <SideBar />
      <Dashboard />
    </div>
  );
};

export default Page;
