"use client";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import ButtonOne from "../../components/shared/ButtonOne";
import { items } from "../../components/views/data";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/app/redux_store/store";
import { ProductType } from "@/app/types/type";
import {
  clearCart,
  decrementQuantity,
  incrementQuantity,
  removeProduct,
} from "@/app/redux_store/cartAddSlice";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaRegFaceSadTear } from "react-icons/fa6";

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// console.log({stripe});

const CartItems = () => {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state?.cart?.products);
  console.log({ cart });

  // const cart = getCart();

  const totalPrice = cart.reduce(
    (sum: number, item: any) => sum + item?.price * item?.quantity,
    0
  );
  const router = useRouter();

  const handleCheckout = async () => {
    if (session && session?.user?.role==="USER") {
      router.push("/billing");
    } else {
      router.push("/sign-in");
      // try {
      //   const res = await axios.post('http://localhost:3000/api/create-intent',totalPrice)
      //   const data = await res.data
      //   // console.log({data});

      //   router.push(`/payment/${data?.clientSecret}`)
      // } catch (error) {
      //   console.log(error);
      // }
    }
  };

  return (
    <div className="my-[134px] container">
      {cart.length > 0 ? (
        <div className="container py-28">
          <div className="overflow-x-auto">
            <table className="border w-full ">
              <thead className="rounded-2xl ">
                <tr className="py-4">
                  <th className="text-base font-normal text-primary py-4">
                    Products
                  </th>
                  <th className="text-base font-normal text-primary">Price</th>
                  <th className="text-base font-normal text-primary">
                    Quantity
                  </th>
                  <th className="text-base font-normal text-primary">
                    Subtotal
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="border">
                {cart.length > 0 &&
                  cart?.map((e: ProductType, index: any) => {
                    console.log(e);
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
                        <td className="px-8">
                          <div className="text-base sm:text-[22px] font-normal text-primary w-28 sm:w-[171px] mx-auto p-1 bg-[#EFF6F1] rounded-full flex justify-between items-center">
                            <button
                              disabled={e?.quantity == 1}
                              onClick={() => dispatch(decrementQuantity(e))}
                              className="bg-white p-2 rounded-full text-base sm:text-2xl"
                            >
                              <AiOutlineMinus />
                            </button>
                            <span>{e?.quantity}</span>
                            <button
                              disabled={e?.quantity === e?.stock}
                              onClick={() => dispatch(incrementQuantity(e))}
                              className="bg-white p-2 rounded-full text-base sm:text-2xl"
                            >
                              <AiOutlinePlus />
                            </button>
                          </div>
                        </td>
                        <td className="text-base sm:text-[22px] font-medium text-primary px-8">
                          {e?.price && e?.price * (e?.quantity || 0)} tk
                        </td>
                        <td className="px-8">
                          <button
                            onClick={() => dispatch(removeProduct(e?.id))}
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
            <div className="w-full flex justify-end">
              <div className="flex justify-evenly items-center gap-32 py-5 w-[620px] border">
                <h6>Total Price</h6>
                <h6>{totalPrice} tk</h6>
              </div>
            </div>
          </div>
          <button
            onClick={handleCheckout}
            className="bg-[#F29F05] text-white font-medium text-xl  py-3 px-8 rounded-md mt-5"
          >
            Checkout
          </button>
          {/* <ButtonOne
            href="/billing"
            title="Checkout"
            className="border border-secondary"
          /> */}
        </div>
      ) : (
        <div className="mx-auto   flex flex-col items-center gap-6 py-10 my-20">
          <div className="w-[360px]  h-[220px] relative">
            <Image
              src="/assests/images/home/empty-cart.png"
              fill
              alt="empty-cart"
            />
          </div>
          <h3>Your Cart is empty!</h3>
          <h6 className="text-center">
            Looks like you haven't added anything in your cart.
            <br />
            Go ahead and explore our shop.
          </h6>
          <ButtonOne
            href="/shop"
            title="Continue Shopping"
            className="bg-[#F29F05] rounded-md text-white"
          />
        </div>
      )}
    </div>
  );
};

export default CartItems;
