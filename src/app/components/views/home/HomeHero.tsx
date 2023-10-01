import Image from "next/image";
import ButtonOne from "../../shared/ButtonOne";

export const HomeHero = () => {
  return (
    <div className="py-20">
      <div className="grid grid-cols-2 gap-[60px] ">
        <div className="flex flex-col justify-center gap-10">
          <div className="text-[60px] font-medium">
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

          <form className="flex gap-5 w-full">
            <input
              type="text"
              className="w-[622px] border border-[#808080] py-1 pl-4 rounded-[10px]"
              placeholder="Enter Restaurant name"
            ></input>
            <ButtonOne href="/" title="Get Started" className="bg-black text-white" />
          </form>
        </div>
        <div className="grid grid-cols-2 gap-[60px] place-items-center ">
          <div className="relative w-full h-[600px] cover">
            <Image src="/assests/images/home/hero1.png" fill alt="image" />
          </div>
          <div className="relative w-full h-[450px] cover">
            <Image src="/assests/images/home/hero2.png" fill alt="image" />
          </div>
        </div>
      </div>
    </div>
  );
};
