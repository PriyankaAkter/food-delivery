import Image from "next/image";
import Link from "next/link";
import { BsSearch } from "react-icons/bs";

export const HomeHero = () => {
  return (
    <div className="py-20 container">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-[186px] ">
        <div className="flex flex-col justify-center gap-12">
          <h1 className="text-[60px] text-[#0F172A] font-semibold leading-[70px]">
            Best & Fastest <br />
            Delivery in Your Place
          </h1>
          <p className="w-full ">
            Order your foods at any time and we’ll safely delivery them straight
            to your home, we’ll it on time so you are not hungry.
          </p>

          <Link href='/about' className="bg-[#F29F05] w-fit text-white font-medium py-3 px-5 rounded-[4px]">
              Learn More
            </Link>
          {/* <div className="flex gap-7">
            <form className="flex flex-col 2xl:flex-row gap-5 w-[515px] h-12 relative">
              <input
                type="text"
                className="w-full lg:w-[622px] border border-[#808080] py-4 pl-5 rounded-[4px]"
                placeholder="Search foods or restaurants"
              ></input>
              <div className="absolute right-5 top-4">
                <BsSearch className="w-4 h-4 text-[#94A3B8]" />
              </div>
            </form>
            <button className="bg-[#F29F05] text-white font-medium py-3 px-5 rounded-[4px]">
              Search
            </button>
          </div> */}
        </div>

        <div className="relative w-[450px] xl:w-full h-[350px] xl:h-[397px]">
          <Image
            src="/assests/images/home/hero1.png"
            fill
            alt="image"
            
            className="rounded-xl object-cover"
          />
        </div>
      </div>
    </div>
  );
};
