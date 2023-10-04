import Image from "next/image";
import Link from "next/link";
import { FiFacebook } from "react-icons/fi";
import { BsInstagram } from "react-icons/bs";
import { FiTwitter } from "react-icons/fi";

const Footer = () => {
  return (
    <div className="bg-[#FC8019] w-screen py-16 2xl:py-28 ">
      <div className="container grid grid-cols-1 lg:grid-cols-3 justify-items-center
       text-white gap-5">
        <div className="flex gap-2 items-center">
          <div className="w-6 h-5 relative">
            <Image src="/assests/images/home/logo.png" alt="Logo" fill />
          </div>
          <h4>Food Court</h4>
        </div>
        <div className="grid justify-center items-center  gap-5 2xl:gap-5">
          <div className="flex   gap-5 2xl:gap-[60px]">
        
            <Link href="/shop" className="text-base font-medium">Shop</Link>
            <Link href="/" className="text-base font-medium">Help & Support</Link>
            <Link href="/" className="text-base font-medium">T & C</Link>
          </div>
          <div className="flex gap-5 justify-center">
            <FiFacebook className="w-6 h-6 text-white" />
            <BsInstagram className="w-6 h-6 text-white" />
            <FiTwitter className="w-6 h-6 text-white" />
          </div>
        </div>
        <div>
        <div className="flex items-center justify-end mt-5">
          <p>

          Contact: <span>0171234567</span>
          </p>
        </div>
        </div>
        
      </div>
    </div>
  );
};

export default Footer;
