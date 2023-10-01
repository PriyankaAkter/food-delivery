import Image from "next/image";
import Link from "next/link";
import { FiFacebook } from "react-icons/fi";
import { BsInstagram } from "react-icons/bs";
import { FiTwitter } from "react-icons/fi";

const Footer = () => {
  return (
    <div className="bg-[#FC8019] w-screen py-28 ">
      <div className="container grid grid-cols-3 items-center   text-white">
        <div className="flex gap-2 items-center">
          <div className="w-6 h-5 relative">
            <Image src="/assests/images/home/logo.png" alt="Logo" fill />
          </div>
          <h4>Food Court</h4>
        </div>
        <div className="grid justify-items-center gap-5">
          <div className="flex gap-[60px]">
            <Link href="/about" className="text-base font-medium">About Us</Link>
            <Link href="/about" className="text-base font-medium">Shop</Link>
            <Link href="/about" className="text-base font-medium">Help & Support</Link>
            <Link href="/about" className="text-base font-medium">T & C</Link>
          </div>
          <div className="flex gap-5 ">
            <FiFacebook className="w-6 h-6 text-white" />
            <BsInstagram className="w-6 h-6 text-white" />
            <FiTwitter className="w-6 h-6 text-white" />
          </div>
        </div>
        <div>
        <p className="text-right">
          Contact: <span>0171234567</span>
        </p>
        </div>
        
      </div>
    </div>
  );
};

export default Footer;
