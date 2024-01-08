// import { RiFolderSharedLine } from "react-icons/ri";
// import Image from "next/image";
// import { AiOutlineHome, AiOutlineHistory } from "react-icons/ai";
// import { MdDashboard, MdLogout } from "react-icons/md";
// import { RiCoupon5Line } from "react-icons/ri";
// import { FiSettings } from "react-icons/fi";
// import Link from "next/link";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import { UserLogOut } from "./UserLogOut";

// export const SideBar = async () => {
//   const session = await getServerSession(authOptions);
//   console.log({ session });

//   return (
//     <div className="w-[200px] 2xl:w-[450px] h-fit bg-[#f1f2f6] py-14 px-14 ">

//       <div className="grid gap-5 ">

//         <div className="flex gap-8 items-center">
//           <div>
//             <AiOutlineHistory className="text-primary w-5 h-5 hover:text-secondary" />
//           </div>
//           <Link
//             href="/user/order-history"
//             className="text-xl font-medium hover:text-secondary"
//           >
//             Order History
//           </Link>
//         </div>

//         <div className="flex gap-8 items-center">
//           <div>
//             <FiSettings className="text-primary w-5 h-5 hover:text-secondary" />
//           </div>
//           <Link
//             href="/user/settings"
//             className="text-xl font-medium hover:text-secondary"
//           >
//             Account Settings
//           </Link>
//         </div>
//         <div className="flex gap-8 items-center">
//           <div>
//             <MdLogout className="text-primary w-5 h-5 hover:text-secondary" />
//           </div>
//           <UserLogOut />
//         </div>
//       </div>
//     </div>
//   );
// };

"use client";
import { useState } from "react";

import { AiOutlineHistory } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
import { UserLogOut } from "./UserLogOut";
import OrderHistory from "./order-history/OrderHistory";
import Settings from "./settings/Settings";
import WishList from "./wishlist/WishList";
import { FaRegHeart } from "react-icons/fa";

// ... other imports ...

export const SideBar = () => {
  const [selectedComponent, setSelectedComponent] = useState("OrderHistory");

  const handleComponentChange = (component: any) => {
    setSelectedComponent(component);
  };

  return (
    <div className="flex gap-8 flex-col lg:flex-row  w-[1300px]">
      <div className="w-full  lg:w-[600px] h-fit text-white bg-[#F29F05] py-14 px-14 ">
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
            onClick={() => handleComponentChange("WishList")}
          >
            <div>
              <FaRegHeart className="text-primary w-5 h-5 hover:text-secondary" />
            </div>
            <span className="text-xl font-medium hover:text-secondary">
              WishList
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
        {/* Render the selected component */}
        {selectedComponent === "OrderHistory" && <OrderHistory />}
        {selectedComponent === "WishList" && <WishList />}
        {selectedComponent === "Settings" && <Settings />}
      </div>
    </div>
  );
};
