import Image from "next/image";
import React from "react";
import ButtonOne from "../components/shared/ButtonOne";

const Page = () => {
  return (
    <div className="container py-28 flex justify-center items-center">
      <div className="w-[632px] flex flex-col justify-center items-center ">
        <div className="w-[100px] h-[121px] sm:h-[80px] relative  mb-12">
          <Image src="/assests/images/home/frame.png" alt="Images" fill />
        </div>
        <h2 className="mb-4">Your Order confirmed!</h2>
        <p>Your order has been confirmed & will be shipping</p>
        <ButtonOne
          title="TRACK ORDER"
          href="/tracking"
          className="mt-20 bg-[#F29F05] text-white"
        />
      </div>
    </div>
  );
};

export default Page;
