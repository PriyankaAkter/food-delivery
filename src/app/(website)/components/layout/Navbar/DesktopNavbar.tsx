import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";

import { Divide } from "lucide-react";
import UserAcoount from "./UserAcoount";
import { IoBagHandleOutline } from "react-icons/io5";

import { signIn, signOut } from "next-auth/react";
import prisma from "@/lib/db";
import { DropdownMenuCheckboxItem } from "@radix-ui/react-dropdown-menu";
import { DropdownMenuRadioGroupDemo } from "./DropDown";
import { useDispatch } from "react-redux";
import CartCount from "./CartCount";

const DesktopNavbar = async () => {
  const session = await getServerSession(authOptions);
  // console.log({session});
  

  return (
    <div className="w-screen bg-inherit h-32 lg:flex hidden">
      <div className="container flex justify-between items-center ">
        <Link href="/" className="flex gap-2 items-center">
          <div className="w-6 h-5 relative">
            <Image src="/assests/images/home/logo-yellow.svg" fill alt="logo" />
          </div>
          <h5 className="font-bold text-[#FFB93E] text-[28px]">Food Court</h5>
        </Link>
        <nav className="2xl:flex gap-16 text-[18px] font-medium text-[#0F172A] ">
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/restaurants">Restaurants</Link>
          {/* <Link href="/shop">Best Offers</Link> */}
          <Link href="/contact">Contact Us</Link>
        </nav>
        <div className="flex items-center  gap-2">
          <CartCount />
          
          {session?.user ? (
            <div className="flex items-center gap-2">
              <div className="flex  items-center gap-2">
                <DropdownMenuRadioGroupDemo />
                <div>
                  <h6>{session?.user?.name}</h6>
                  <p>{session?.user?.role}</p>
                </div>
              </div>
              {/* <UserAcoount /> */}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/sign-in"
                className="bg-[#FFB93E] text-white font-medium py-3 px-5 rounded-[4px]"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="bg-[#FFB93E] text-white font-medium py-3 px-5 rounded-[4px]"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DesktopNavbar;
