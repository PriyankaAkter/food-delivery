import React from "react";
import OrderCard from "./components/views/OrderCard";
import { SideBar } from "./components/shared/SideBar";
import Dashboard from "./components/views/Dashboard";
import MobileSideBar from "./components/shared/sidebar/MobileSideBar";


const Page = () => {
  return (
    
    <div className='flex' >
    <SideBar />
    <div className='container1'>

    <Dashboard  />
    </div>
</div>
  );
};

export default Page;
