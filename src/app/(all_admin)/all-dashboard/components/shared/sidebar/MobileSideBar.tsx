"use client";
import { useState } from "react";
import { BiMenu, BiX } from "react-icons/bi";
import Image from "next/image";
import clsx from "clsx";
import Link from "next/link";
import { SuperAdminLogOur } from "../SuperAdminLogOur";
import { useSession } from "next-auth/react";
const MobileSideBar = () => {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  return (
    <div className="bg-white 2xl:hidden py-5 w-screen shadow-md ">
      <nav className="grid grid-cols-1 container1 gap-4 ">
        <div className="flex justify-between items-center">
        <div className="flex gap-4">
            {/* <div className="w-12 h-12 relative ">
              <Image
                fill
                src="/assests/images/home/img1.png"
                alt="profile"
                className="rounded-full"
              />
            </div> */}
            <div>
              {/* <p>Hello,</p> */}
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
              <Link href="/all-dashboard" className="">
                <span>Dashboard</span>
              </Link>
            </li>
            <li
              onClick={() => {
                setOpen(false);
              }}
              className={` font-semibold text-xl`}
            >
              <Link href="/all-dashboard/restaurants" className="">
                <span>All Restaurants</span>
              </Link>
            </li>
            <li
              onClick={() => {
                setOpen(false);
              }}
              className={` font-semibold text-xl`}
            >
              <Link href="/all-dashboard/delivery-mans" className="">
                <span>All Delivery Man</span>
              </Link>
            </li>
            <li
              onClick={() => {
                setOpen(false);
              }}
              className={` font-semibold text-xl`}
            >
              <Link href="/all-dashboard/categories" className="">
                <span> All Categories</span>
              </Link>
            </li>
            <div className="">
              <SuperAdminLogOur />
            </div>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default MobileSideBar;
