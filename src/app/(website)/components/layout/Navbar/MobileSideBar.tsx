"use client";
import { useState } from "react";
import { BiMenu, BiX } from "react-icons/bi";
import Image from "next/image";
import clsx from "clsx";
import Link from "next/link";

import { useSession } from "next-auth/react";
import WishListCount from "./WishListCount";
import CartCount from "./CartCount";
import { DropdownMenuRadioGroupDemo } from "./DropDown";
const MobileSideBar = () => {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  return (
    <div className="bg-white lg:hidden py-5 w-screen shadow-md ">
      <nav className="grid grid-cols-1 container gap-4 ">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex gap-2 items-center">
            <div className="w-5 h-4 relative">
              <Image
                src="/assests/images/home/logo-yellow.svg"
                fill
                alt="logo"
              />
            </div>
            <h5 className="font-bold text-[#FFB93E] text-[20px]">
              FoodExpress
            </h5>
          </Link>
          {/* <div className="flex gap-4">
            <div className="w-12 h-12 relative ">
              <Image
                fill
                src={session?.user?.image || ""}
                alt="profile"
                className="rounded-full"
              />
            </div>
            <div>
              
              <h6 className="text-base font-medium">{session?.user?.name}</h6>
              <p>{session?.user?.role}</p>
            </div>
          </div> */}
          <div
            onClick={() => {
              setOpen(!open);
            }}
          >
            {open ? (
              <BiX className="w-6 2xl:w-8 h-6 2xl:h-8 text-primary" />
            ) : (
              <BiMenu className="w-6 md:w-8 h-6 md:h-8 text-primary" />
            )}
          </div>
        </div>

        <div className={clsx("py-32 h-screen", open ? "block" : "hidden")}>
          <ul className="flex flex-col items-center gap-10">
            <li
              onClick={() => {
                setOpen(false);
              }}
              className={` font-semibold text-xl`}
            >
              <Link href="/">Home</Link>
            </li>
            <li
              onClick={() => {
                setOpen(false);
              }}
              className={` font-semibold text-xl`}
            >
              <Link href="/shop">Shop</Link>
            </li>
            <li
              onClick={() => {
                setOpen(false);
              }}
              className={` font-semibold text-xl`}
            >
              <Link href="/restaurants">Restaurants</Link>
            </li>
            <div className="flex items-center flex-col  gap-5">
              

              {session?.user ? (
                <div className="flex flex-col items-center gap-2">
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
                <div className="flex flex-col items-center gap-10">
                  <Link
                  onClick={() => {
                    setOpen(false);
                  }}
                    href="/sign-in"
                    className=" text-black font-semibold text-xl"
                  >
                    Sign In
                  </Link>
                  <Link
                  onClick={() => {
                    setOpen(false);
                  }}
                    href="/sign-up"
                    className=" text-black font-semibold text-xl"
                  >
                    Register
                  </Link>
                </div>
              )}
              <div className="flex items-center gap-5">
                <WishListCount />
                <CartCount />
              </div>
            </div>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default MobileSideBar;
