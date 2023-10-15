import Image from "next/image";
import { BiMap } from "react-icons/bi";
import { AiFillStar } from "react-icons/ai";
import { RiCoupon5Fill } from "react-icons/ri";


const Hero = ({item}:any) => {
  return (
    <div className="w-screen bg-black h-[300px]">
      <div className="container py-6 flex gap-10 items-center">
        <div className="flex text-white gap-20 items-center">
          <div className="w-[400px] h-[250px] relative">
            <Image src={item?.shopImg} alt="Images" fill />
          </div>
          <div>
            <h4>{item?.shop}</h4>
            <div className="flex items-center gap-2">
              <BiMap className="w-4 h-4 text-[#FC8019]" />
              <p>Uttara, Dhaka</p>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <AiFillStar className="w-4 h-4 text-green-500" />
              <p>4.0</p>
            </div>
            <p>100+ ratings</p>
          </div>

          <div>
            <p>{item?.time}</p>
            <p>Delivery Time</p>
          </div>
          <div>
            <p>{item?.price}tk</p>
            <p>Cost for two</p>
          </div>
        </div>
        <div className="border border-[#FC8019] rounded-lg p-4 grid gap-5">
          <h6 className="text-[#FC8019]">Offers</h6>
          <div className="flex gap-2 items-center">
            <RiCoupon5Fill className="w-4 h-4 text-[#FC8019]" />
            <p className="text-white">50% off up to 100 tk | use code TRYNEW</p>
          </div>
          <div className="flex gap-2 items-center">
            <RiCoupon5Fill className="w-4 h-4 text-[#FC8019]" />
            <p className="text-white">20% off | use code PARTY</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
