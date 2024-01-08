"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/redux_store/store";
import { addWishlist } from "@/app/redux_store/wishlistAddSlice";
import { useSession } from "next-auth/react";
import { FaRegHeart } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ProductType } from "@/app/types/type";

const WishListCount = () => {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const wishlist = useAppSelector((state: any) => state.wishlist.products);
  const { data, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const userData = await axios.get(
        `http://localhost:3000/api/user/${session?.user?.id}`
      );
      return userData.data;
    },
  });

  // console.log({data});
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedProducts = localStorage.getItem("wishlist");
      
      if (storedProducts) {
        try {
          const products = JSON.parse(storedProducts);
  
          // Check if the parsed data is an array
          if (Array.isArray(products)) {
            products.forEach((element: any) => {
              dispatch(addWishlist(element));
            });
          } else {
            console.error("Stored products is not an array:", products);
          }
        } catch (error) {
          console.error("Error parsing stored products:", error);
        }
      }
    }
  }, []);

  // ... (your existing code)

  return session?.user && session?.user?.role==="USER" ? (
    <div className="flex items-center gap-1 relative">
      <div className="w-4 h-4 bg-[#F29F05] rounded-full flex items-center justify-center text-white text-[12px] absolute -right-2 -top-2">
        {data?.user?.wishlist?.length}
      </div>
      <div>
        <FaRegHeart className="w-6 h-6 text-black" />
      </div>
    </div>
  ) : null;
};

export default WishListCount;
