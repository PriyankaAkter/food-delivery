"use client"
import Image from "next/image";
import { AiFillStar, AiOutlineShoppingCart } from "react-icons/ai";
import { ImSpoonKnife } from "react-icons/im";
import { AiOutlineHeart } from "react-icons/ai";
import ButtonOne from "./ButtonOne";
import Link from "next/link";
import { ProductType } from "@/app/types/type";
import { useDispatch } from "react-redux";
import { addCart, clearCart } from "@/app/redux_store/cartAddSlice";
import { useAppDispatch } from "@/app/redux_store/store";


interface CardProps {
  item: ProductType;
}




const Card:React.FC<CardProps> = ({item}) => {
   const dispatch = useAppDispatch()
  //  console.log({item});
   
  return (
    <div
      style={{ boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.16)" }}
      className="w-full bg-white pb-7 grid gap-3 relative rounded-md"
    >
      <div className="w-full h-[254px] relative">
        <Image src={item?.image || ""} alt="Food" fill objectFit="cover" className="rounded-t-md" />
      </div>
      <div className="px-5">
        <div className="flex justify-between items-center">
          <Link
            href={`/shop/${item?.slug}`}
            className="font-medium text-[#0F172A] text-2xl"
          >
            {item?.name}
          </Link>
          <AiOutlineHeart className="w-6 h-6 text-black" />
        </div>

        <h6 className="text-[#FFB93E] text-[28px] font-medium mt-5">{item?.price}.00 tk</h6>
        
        {/* <h6>{item?.restaurant?.name}</h6> */}
        <p>{item?.restaurant?.deliveryTime}</p>
        
        {/* <button onClick={()=> dispatch(clearCart())} className="bg-[#F29F05] py-3 rounded-[4px] mt-7 text-white flex items-center gap-3 w-full justify-center">
          <AiOutlineShoppingCart className="w-[22px] h-[22px] text-white" />
          Add to Cart
        </button> */}
      </div>
    </div>
  );
};

export default Card;
