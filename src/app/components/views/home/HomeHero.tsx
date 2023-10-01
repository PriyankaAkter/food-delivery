import Image from "next/image";
import React from "react";

export const HomeHero = () => {
  return (
    <div className=" py-20">
      <div className="flex gap-[60px]">
        <div className="flex-1">
          <h1>
            Premium <span className="text-[#FC8019]">quality</span>
          </h1>
          <h1 className="flex gap-1">
            Food for your
            <span>
              <Image
                src="/assests/images/Group2.svg"
                className="w-[125px] h-[75px] rounded-[50px] bg-[#FFEDD0] py-5 pl-0  pr-[50px]"
                width={10}
                height={10}
                alt="image"
              />
            </span>
            <span className="text-[#FC8019]">healthy</span>
          </h1>
          <h1 className="flex gap-1">
            <span>
              <Image
                src="/assests/images/Group 1.svg"
                className="w-[125px] h-[75px] rounded-[50px] bg-[#FFD0D0] pb-5  pt-0  px-[50px]"
                width={40}
                height={40}
                alt="image"
              />
            </span>
            & Daily Life
          </h1>
          <p className="w-full xl:w-[712px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>

          <form>
            <input
              type="text"
              className="w-[622px] border border-[#808080] py-[5px] rounded-[10px]"
              placeholder="Enter Restaurant name"
            ></input>
          </form>
        </div>
        <div className="flex-1">
          <div className="relative w-full xl:w-[400px] h-[600px]">
            <Image src="/assests/images/hero1.png" fill alt="image" />
          </div>
        </div>
      </div>
    </div>
  );
};
