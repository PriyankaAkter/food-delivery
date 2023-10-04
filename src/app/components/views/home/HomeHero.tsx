import Image from "next/image";
import ButtonOne from "../../shared/ButtonOne";

export const HomeHero = () => {
  return (
    <div className="py-20">
      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-[60px] ">
        <div className="flex flex-col justify-center gap-10">
          <div className="text-5xl leading-[60px] 2xl:text-[60px] font-medium">
            Premium <span className="text-[#FC8019]">quality</span> <br />
            Food for your
            <span className="text-[#FC8019]"> healthy </span>& Daily Life
          </div>
          <p className="w-full xl:w-[712px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>

          {/* <form className="flex flex-col 2xl:flex-row gap-5 w-full">
            <input
              type="text"
              className="w-full lg:w-[622px] border border-[#808080] py-5 pl-5 rounded-[10px]"
              placeholder="Enter Restaurant name"
            ></input>
            
          </form> */}
          <ButtonOne href="/" title="Get Started" className="bg-black text-white w-[200px]" />
        </div>
        <div className="grid 2xl:grid-cols-2 gap-[60px] 2xl:place-items-center ">
          <div className="relative w-full sm:w-[450px] 2xl:w-full h-[350px] 2xl:h-[600px]">
            <Image src="/assests/images/home/hero1.png" fill alt="image" objectFit="cover" className="rounded-xl" />
          </div>
          <div className="relative w-full h-[350px] 2xl:h-[450px] hidden 2xl:flex">
            <Image src="/assests/images/home/hero2.png" fill alt="image" objectFit="cover" className="rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};
