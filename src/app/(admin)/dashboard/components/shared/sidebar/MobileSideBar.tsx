"use client";
import { useState } from "react";
import { BiMenu, BiX } from "react-icons/bi";
import Image from "next/image";
import clsx from "clsx";
import Link from "next/link";
import { useSession } from "next-auth/react";

import { AdminLogOut } from "../AdminLogOut";
const MobileSideBar = () => {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  return (
    <div className="bg-white 2xl:hidden py-5 w-screen shadow-md">
      <nav className="grid grid-cols-1 container1 gap-4 ">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 relative">
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
          </div>
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
              <Link
                href="/dashboard"
                className="text-xl font-medium hover:text-secondary"
              >
                Dashboard
              </Link>
            </li>
            <li
              onClick={() => {
                setOpen(false);
              }}
              className={` font-semibold text-xl`}
            >
              <Link
                href="/dashboard/order-history"
                className="text-xl font-medium hover:text-secondary"
              >
                Order History
              </Link>
            </li>
            <li
              onClick={() => {
                setOpen(false);
              }}
              className={` font-semibold text-xl`}
            >
              <Link
                href="/dashboard/products"
                className="text-xl font-medium hover:text-secondary"
              >
                Products
              </Link>
            </li>
            <li
              onClick={() => {
                setOpen(false);
              }}
              className={` font-semibold text-xl`}
            >
               <Link
              href="/dashboard/setting"
              className="text-xl font-medium hover:text-secondary"
            >
              Settings
            </Link>
            </li>
           
            <div className="flex gap-8 items-center">
              <AdminLogOut />
            </div>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default MobileSideBar;
