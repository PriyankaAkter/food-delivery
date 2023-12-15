"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/redux_store/store";
import { addWishlist } from "@/app/redux_store/wishlistAddSlice";
import { useSession } from "next-auth/react";
import { FaRegHeart } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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

  const loadWishlistFromLocalStorage = () => {
    if (typeof window !== "undefined" && session?.user) {
      const storedProducts = localStorage.getItem(
        `wishlist_${session.user.id}`
      );

      if (storedProducts) {
        try {
          const products = JSON.parse(storedProducts);
          if (Array.isArray(products)) {
            dispatch(addWishlist(products));
          } else {
            console.error("Stored products is not an array:", products);
          }
        } catch (error) {
          console.error("Error parsing stored products:", error);
        }
      }
    }
  };

  // Load wishlist from local storage when the component mounts
  useEffect(() => {
    loadWishlistFromLocalStorage();
  }, []);

  // Load wishlist from local storage when the user changes (login/logout)
  useEffect(() => {
    loadWishlistFromLocalStorage();
  }, [session]);

  // ... (your existing code)

  return session?.user ? (
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
