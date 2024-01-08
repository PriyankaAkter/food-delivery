import { RiFolderSharedLine } from "react-icons/ri";
import Image from "next/image";
import { AiOutlineHome, AiOutlineHistory } from "react-icons/ai";
import { BiSolidMessageAlt } from "react-icons/bi";
import { MdDashboard, MdLogout } from "react-icons/md";
import { RiCoupon5Line } from "react-icons/ri";
import { FiSettings } from "react-icons/fi";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { signOut } from "next-auth/react";
import { AdminLogOut } from "./AdminLogOut";

export const SideBar = async () => {
  const session = await getServerSession(authOptions);
  console.log({ session });

  return (
    <div className="w-[200px] 2xl:w-[450px] bg-[#f1f2f6] py-14 px-14 h-screen hidden 2xl:block">
      <div className="flex justify-between items-center mb-24">
        <div className="flex gap-4 items-center">
          <div className="w-16 h-16 relative">
            <Image
              fill
              src={session?.user?.image || ""}
              alt="profile"
              className="rounded-full"
            />
          </div>
          <h6>{session?.user?.name}</h6>
        </div>

        {/* <div className="">
          <RiFolderSharedLine className="text-primary w-5 h-5" />
        </div> */}
      </div>
      <div className="grid gap-5 mt-24">
        <div className="flex gap-8 items-center">
          <div>
            <AiOutlineHome className="text-primary w-5 h-5 hover:text-secondary" />
          </div>
          <Link
            href="/dashboard"
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
            href="/dashboard/order-history"
            className="text-xl font-medium hover:text-secondary"
          >
            Order History
          </Link>
        </div>

        <div className="flex gap-8 items-center">
          <div>
            <RiCoupon5Line className="text-primary w-5 h-5 hover:text-secondary" />
          </div>
          <Link
            href="/dashboard/products"
            className="text-xl font-medium hover:text-secondary"
          >
            Products
          </Link>
        </div>
        <div className="flex gap-8 items-center">
          <div>
            <FiSettings className="text-primary w-5 h-5 hover:text-secondary" />
          </div>
          <Link
            href="/dashboard/setting"
            className="text-xl font-medium hover:text-secondary"
          >
            Settings
          </Link>
        </div>
        <div className="flex gap-8 items-center">
          <div>
            <MdLogout className="text-primary w-5 h-5 hover:text-secondary" />
          </div>
          <AdminLogOut />
        </div>
      </div>
    </div>
  );
};
