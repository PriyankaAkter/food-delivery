import Image from "next/image";
import Link from "next/link";
import React from "react";

const DesktopNavbar = () => {
  return (
    <div className="w-screen bg-[#FC8019] h-20 flex">
      <div className="container flex justify-between items-center text-white">
        <div className="flex gap-2 items-center">
        <div className="w-6 h-5 relative">
            <Image src="/assests/images/home/logo.png" fill alt="logo" />
          </div>
          <h6>Food Court</h6>
        </div>
        <nav className="flex gap-16 text-xl font-bold">
          
            <Link href="/">Home</Link>
        
            <Link href="/shop">Shop</Link>

            <Link href="/contact">Contact</Link>
         
        </nav>
      </div>
    </div>
  );
};

export default DesktopNavbar;