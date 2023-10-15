import Image from "next/image";
import { AiFillStar } from "react-icons/ai";
import { ImSpoonKnife } from "react-icons/im";
import { AiFillHeart } from "react-icons/ai";
import ButtonOne from "./ButtonOne";
import Link from "next/link";

const Card = ({ item }: any) => {
  return (
    <div style={{boxShadow:'0px 4px 20px 0px rgba(0, 0, 0, 0.16)'}} className="bg-white p-5 grid gap-3 relative rounded-md">
    
      <div className="absolute w-11  h-11 flex items-center justify-center rounded-full  bg-white top-7 right-7 z-10">
        <AiFillHeart className="w-7 h-7 text-[#FC8019]" />
      </div>
      <div className="w-full h-[256px] relative">
        <Image src={item.img} alt="Food" fill objectFit="cover" />
      </div>
      <Link href={`/shop/${item.food_slug}`} className="font-bold">{item.name}</Link>
      <div className="flex gap-2 items-center">
        <ImSpoonKnife className="w-5 h-5 text-black" />
        <h6 className="font-bold">{item.shop}</h6>
      </div>
      <h6>{item.price} tk</h6>
      <div className="flex items-center gap-2 justify-start">
        {[1, 2, 3, 4, 5].map((item: any, index: number) => (
          <AiFillStar key={index} className="w-5 h-5 text-[#FFB93E]" />
        ))}

        <p className="font-bold">5.0</p>
      </div>
      <div className="flex justify-between">
        <ButtonOne
          href="/cart"
          title="Add to Cart"
          className="text-[#FC8019] py-3 border border-[#FC8019]"
        />
        <ButtonOne
          href="/cart"
          title="Buy Now"
          className="bg-[#FC8019] py-3 text-white"
        />
      </div>
    </div>
  );
};

export default Card;
