import Image from "next/image";
import Link from "next/link";
import React from "react";
import ButtonOne from "../../shared/ButtonOne";
import { FiShoppingBag } from "react-icons/fi";
import { BiSearch } from "react-icons/bi";

const DesktopNavbar = () => {
  return (
    <div className="w-screen bg-inherit h-32 lg:flex hidden">
      <div className="container flex justify-between items-center ">
        <Link href="/" className="flex gap-2 items-center">
          <div className="w-6 h-5 relative">
            <Image src="/assests/images/home/logo-orange.png" fill alt="logo" />
          </div>
          <h5 className="font-bold">Food Court</h5>
        </Link>
        <nav className="2xl:flex gap-16 text-xl font-bold hidden ">
          
            <Link href="/">Home</Link>
        
            <Link href="/shop">Shop</Link>

            <Link href="/contact">Contact</Link>
         
        </nav>
        <div className="flex items-center  gap-5">
          <form >
            <input
              type="text"
              className="w-[450px] border border-[#808080] py-4 pl-4 rounded-[10px]"
              placeholder="Enter item or restaurant yaou are looking for"
            ></input>
            {/* <BiSearch className="w-8 h-8 text-black" /> */}
          </form>
          <FiShoppingBag className="w-8 h-8 text-black" />
          <ButtonOne
            href="/login"
            title="Sign Up"
            className="bg-[#FC8019] text-white"
          />
          <ButtonOne
            href="/login"
            title="Log In"
            className="bg-[#FC8019] text-white"
          />
        </div>

      </div>
    </div>
  );
};

export default DesktopNavbar;
