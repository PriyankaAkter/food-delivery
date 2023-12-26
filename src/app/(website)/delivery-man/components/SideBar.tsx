"use client";
import { useState } from "react";

import { AiOutlineHistory } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { MdLogout } from "react-icons/md";

import { FaRegHeart } from "react-icons/fa";
import { UserLogOut } from "../../user/components/UserLogOut";

import Settings from "./settings/Settings";
import OrderHistory from "./order-history/OrderHistory";


// ... other imports ...

export const SideBar = () => {
  const [selectedComponent, setSelectedComponent] = useState("OrderHistory");

  const handleComponentChange = (component: any) => {
    setSelectedComponent(component);
  };

  return (
    <div className="flex gap-8  w-[1300px]">
      <div className="w-[200px] 2xl:w-[400px] h-fit text-white bg-[#F29F05] py-14 px-14 ">
        <div className="grid gap-5 ">
          <div
            className="flex gap-8 items-center cursor-pointer"
            onClick={() => handleComponentChange("OrderHistory")}
          >
            <div>
              <AiOutlineHistory className="text-primary w-5 h-5 hover:text-secondary" />
            </div>
            <span className="text-xl font-medium hover:text-secondary">
              Order History
            </span>
          </div>
         
          <div
            className="flex gap-8 items-center cursor-pointer"
            onClick={() => handleComponentChange("Settings")}
          >
            <div>
              <FiSettings className="text-primary w-5 h-5 hover:text-secondary" />
            </div>
            <span className="text-xl font-medium hover:text-secondary">
              Account Settings
            </span>
          </div>

          <div className="flex gap-8 items-center cursor-pointer">
            <div>
              <MdLogout className="text-primary w-5 h-5 hover:text-secondary" />
            </div>
            <UserLogOut />
          </div>
        </div>
      </div>
      <div className="w-full">
        {selectedComponent === "OrderHistory" && <OrderHistory />}
        {selectedComponent === "Settings" && <Settings />}
      </div>
    </div>
  );
};
