import { RiFolderSharedLine } from "react-icons/ri";
import Image from "next/image";
import { AiOutlineHome, AiOutlineHistory } from "react-icons/ai";
import { MdDashboard, MdLogout } from "react-icons/md";
import { RiCoupon5Line } from "react-icons/ri";
import { FiSettings } from "react-icons/fi";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { UserLogOut } from "./UserLogOut";


export const SideBar = async () => {
  const session = await getServerSession(authOptions);
  console.log({ session });

  return (
    <div className="w-[200px] 2xl:w-[450px] h-fit bg-[#f1f2f6] py-14 px-14 ">
    
      <div className="grid gap-5 ">
        
        <div className="flex gap-8 items-center">
          <div>
            <AiOutlineHistory className="text-primary w-5 h-5 hover:text-secondary" />
          </div>
          <Link
            href="/user/order-history"
            className="text-xl font-medium hover:text-secondary"
          >
            Order History
          </Link>
        </div>

        
        <div className="flex gap-8 items-center">
          <div>
            <FiSettings className="text-primary w-5 h-5 hover:text-secondary" />
          </div>
          <Link
            href="/user/settings"
            className="text-xl font-medium hover:text-secondary"
          >
            Account Settings
          </Link>
        </div>
        <div className="flex gap-8 items-center">
          <div>
            <MdLogout className="text-primary w-5 h-5 hover:text-secondary" />
          </div>
          <UserLogOut />
        </div>
      </div>
    </div>
  );
};
