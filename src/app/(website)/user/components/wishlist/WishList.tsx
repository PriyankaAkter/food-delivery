"use client";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/app/redux_store/store";
import { ProductType } from "@/app/types/type";
import { addCart } from "@/app/redux_store/cartAddSlice";
import { removeWishist } from "@/app/redux_store/wishlistAddSlice";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const WishList = () => {

  const {data:session} = useSession()
  
  const dispatch = useAppDispatch();
  // const cartProducts = useAppSelector((state) => state.cart.products);
  const wishlist = useAppSelector((state) => state?.wishlist?.products);
  const { data, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const userData = await axios.get(
        `http://localhost:3000/api/user/${session?.user?.id}`
      );
      return userData.data;
    },
  });

  if (isLoading) {
    return <h6>Loading...</h6>;
  }
  if (error) return "An error has occurred: " + error.message;

  return (
    <div className=" ">
      <div className="">
        
        <div className="overflow-x-auto">
          <table className="border w-full ">
            <thead className="rounded-2xl ">
              <tr className="py-4">
                <th className="text-base font-normal text-primary py-4">
                  Products
                </th>
                <th className="text-base font-normal text-primary">Price</th>
                <th className="text-base font-normal text-primary">Quantity</th>
                <th className="text-base font-normal text-primary"></th>
                <th></th>
              </tr>
            </thead>
            <tbody className="border">
              {data?.user?.wishlist?.length > 0 &&
                data?.user?.wishlist?.map((e: ProductType, index: any) => {
                  // console.log(e);
                  return (
                    <tr key={index} className="text-center  border">
                      <td className="flex items-center gap-2 sm:gap-6 py-4 pl-2 ">
                        <div className="w-16 h-14  relative bg-[#F0E4E6]">
                          <Image
                            src={e?.image || ""}
                            alt="Images"
                            fill
                            className="object-cover"
                          />
                        </div>

                        <span className="text-base sm:text-[22px] font-normal text-primary">
                          {e?.name}
                        </span>
                      </td>
                      <td className="text-base sm:text-[22px] font-normal text-primary px-8">
                        {e?.price} tk
                      </td>

                      <td className="text-base sm:text-[22px] font-medium text-primary px-8">
                        {e?.stock}
                      </td>
                      <td className="">
                        <button
                          onClick={() => dispatch(addCart(e))}
                          className="bg-[#F29F05] py-3 rounded-[4px]  text-white flex items-center gap-3 w-full justify-center"
                        >
                          Add to Cart
                        </button>
                      </td>
                      <td className="px-8 ">
                        <button
                        
                          onClick={() => {console.log("Button clicked!")
                          dispatch(removeWishist(e?.id))}}
                          className="text-base sm:text-2xl"
                        >
                          <RxCross2 className="w-4 h-4 text-primary inline-block" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        
      </div>
    </div>
  );
};

export default WishList;
