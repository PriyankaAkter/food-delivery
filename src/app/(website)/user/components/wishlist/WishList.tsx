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

import { useSession } from "next-auth/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { removeWishist } from "@/app/redux_store/wishlistAddSlice";

const WishList = () => {
  const { data: session } = useSession();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const cartProducts = useAppSelector((state) => state.cart.products);
  const wishlist = useAppSelector((state) => state.wishlist.products);
  
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
  
  const handleRemoveFromWishlist = async (item: ProductType) => {
    try {
      dispatch(removeWishist(item.id));
      const updatedWishlist = wishlist.filter((w) => w.id !== item.id);

      const updateWishlistResponse = await axios.put(
        `http://localhost:3000/api/user/${session?.user?.id}`,
        {
          wishlist: updatedWishlist,
        }
      );
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Product removed from wishlist");
      return updateWishlistResponse.data;
    } catch (error) {
      toast.error("Error Occurred!");
    }
  };

  return (
    <div className="w-full overflow-x-auto md:overflow-x-hidden ">
      <h6 className="mb-5 text-center">Wishlist Products</h6>
      <div className="w-full ">
        <table className="border  w-full ">
          <thead className="rounded-2xl">
            <tr className="py-4">
              <th className="text-base sm:text-lg font-normal text-primary py-4">
                Products
              </th>
              <th className="text-base sm:text-lg font-normal text-primary">Price</th>
              {/* <th className="text-base sm:text-lg font-normal text-primary">Stock</th> */}
              <th className="text-base sm:text-lg font-normal text-primary"></th>
              <th></th>
            </tr>
          </thead>
          <tbody className="border">
            {data?.user?.wishlist?.length > 0 &&
              data?.user?.wishlist?.map((e: ProductType, index: any) => {
                return (
                  <tr key={index} className="text-center border">
                    <td className="flex items-center gap-2 sm:gap-6 py-4 pl-2">
                      <div className="w-16 h-14 relative bg-[#F0E4E6]">
                        <Image
                          src={e?.image || ""}
                          alt="Images"
                          fill
                          className="object-cover"
                        />
                      </div>

                      <span className="text-base sm:text-lg font-normal text-primary">
                        {e?.name}
                      </span>
                    </td>
                    <td className="text-base sm:text-lg font-normal text-primary px-8">
                      {e?.price} tk
                    </td>

                    {/* <td className="text-base sm:text-lg font-medium text-primary px-8">
                      {e?.stock && e?.stock > 0 ? "On Stock" : "Out of Stock"}
                    </td> */}
                    <td className="">
  <button
    disabled={e?.stock === 0}
    className={`${
      e?.stock === 0 ? "bg-[#F29F05] cursor-not-allowed" : "bg-[#F29F05]"
    } py-3 rounded-[4px]  text-white flex items-center gap-3 w-full justify-center`}
    onClick={() => {
      try {
        if (cartProducts.length === 0) {
          dispatch(addCart(e));
          toast.success("Product added successfully");
        } else if (cartProducts[0]?.restaurant?.id !== e.restaurant?.id) {
          setShowConfirmation(true);
        } else {
          dispatch(addCart(e));
          toast.success("Product added successfully");
        }
      } catch (error) {
        toast.error("Error adding product to cart");
      }
    }}
  >
    {e?.stock && e?.stock > 0 ? "Add To Cart" : "Out of Stock"}
  </button>
</td>

                    <td className="px-8">
                      <button
                        onClick={() => handleRemoveFromWishlist(e)}
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
  );
};

export default WishList;
