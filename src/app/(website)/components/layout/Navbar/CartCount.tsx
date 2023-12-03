"use client";
import { addCart } from "@/app/redux_store/cartAddSlice";
import { useAppDispatch, useAppSelector } from "@/app/redux_store/store";
import Link from "next/link";
import { useEffect } from "react";
import { IoBagHandleOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

const CartCount = () => {
  const dispatch = useAppDispatch()
  const cart = useAppSelector((state: any) => state.cart.products);
  console.log({ cart });
  useEffect(() => {
    if (typeof window !== "undefined") {
      const products = JSON.parse(localStorage.getItem("cart"));
     
      if(products){
        products.forEach(element => {
          dispatch(addCart(element))
        });
      }
      
    }
  }, []);

  return (
    <div className="flex items-center gap-1">
      <Link href="/cart">
        {/* <AiOutlineShoppingCart className="w-6 h-6 text-black" /> */}
        <IoBagHandleOutline className="w-6 h-6 text-black" />
      </Link>
      <h6>( {cart.length} )</h6>
    </div>
  );
};

export default CartCount;
