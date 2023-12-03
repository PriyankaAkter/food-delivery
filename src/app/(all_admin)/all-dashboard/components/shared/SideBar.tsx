import { RiFolderSharedLine } from "react-icons/ri";
import Image from "next/image";
import { AiOutlineHome,AiOutlineHistory } from "react-icons/ai";
import {BiSolidMessageAlt } from "react-icons/bi";
import { MdDashboard, MdLogout } from "react-icons/md";
import { RiCoupon5Line } from "react-icons/ri";
import { FiSettings } from "react-icons/fi";
import Link from "next/link";
import { SuperAdminLogOur } from "./SuperAdminLogOur";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const SideBar = async () => {
  const session = await getServerSession(authOptions)
  return (
    <div className="w-[400px] bg-[#f1f2f6] py-14 px-14 h-screen">
      <div className="flex justify-between items-center mb-24">
        <div className="flex gap-4">
          <div className="w-16 h-16 relative ">
            <Image
              fill
              src="/assests/images/home/img1.png"
              alt="profile"
              className="rounded-full"
            />
          </div>
          <div>
            {/* <p>Hello,</p> */}
            <h6>{session?.user?.name}</h6>
            <p>{session?.user?.role}</p>
          </div>
        </div>

        <div className="">
          <RiFolderSharedLine className="text-primary w-5 h-5" />
        </div>
      </div>
      <div className="grid gap-5 mt-24">
        <div className="flex gap-8 items-center">
          <div>
            <AiOutlineHome className="text-primary w-5 h-5 hover:text-secondary" />
          </div>
          <Link
            href="/all-dashboard"
            className="text-xl font-medium hover:text-secondary"
          >
            Dashboard
          </Link>
        </div>
        <div className="flex gap-8 items-center">
          <div>
            <AiOutlineHistory className="text-primary w-5 h-5 hover:text-secondary" />
          </div>
          <Link
            href="/all-dashboard/restaurants"
            className="text-xl font-medium hover:text-secondary"
          >
            All Restaurants
          </Link>
        </div>

        <div className="flex gap-8 items-center">
          <div>
            <AiOutlineHistory className="text-primary w-5 h-5 hover:text-secondary" />
          </div>
          <Link
            href="/all-dashboard/categories"
            className="text-xl font-medium hover:text-secondary"
          >
            All Categories
          </Link>
        </div>
       
       
        
        <div className="flex gap-8 items-center">
          <div>
            <MdLogout className="text-primary w-5 h-5 hover:text-secondary" />
          </div>
          <SuperAdminLogOur />
          
         
        </div>
      </div>

    </div>
  );
};


