"use client";
import { clearCart } from "@/app/redux_store/cartAddSlice";
import { useAppDispatch, useAppSelector } from "@/app/redux_store/store";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
// import ConfettiExplosion from "react-confetti-explosion";
import { MdDone } from "react-icons/md";

const SuccessPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const payment_intent = searchParams.get("payment_intent");
  const { data: session } = useSession();
  console.log({session});
  const dispatch = useAppDispatch()
  const cart = useAppSelector((state) => state?.cart?.products);
  const totalPrice = cart.reduce(
    (sum: number, item: any) => sum + item?.price * item?.quantity,
    0
  );
  const [isLoading,setIsLoading] = useState(true);
  const [error,setError] = useState<null| string>(null)

  useEffect(() => {
    if (payment_intent && cart && cart.length > 0  ) {
      setIsLoading(true)
      const makeRequest = async () => {
        try {
           const data = await axios.post('http://localhost:3000/api/orders',{
            price: totalPrice,
            items: cart,
            restaurantName: cart[0]?.restaurant?.name,
            // userEmail: session?.user?.email,
            // userName: session?.user?.name,
            payment_id:payment_intent,
            status:"Paid",
            restaurantId: cart[0]?.RestaurantId
            // deliver: "PENDING"
          })
          dispatch(clearCart());
          console.log({data});
          
          setError(null)
         
        } catch (error: any) {
          console.error('Error creating order:', error);
          setError("Order Create Failed");
        } finally {
          setIsLoading(false);
          
        }
      };
      if (payment_intent && cart && cart.length > 0 ) {
        makeRequest();
      }
    }
  }, [payment_intent,cart.length]);

  if(isLoading) return <div>loading....</div>
  if(error) return <div>{error}</div>
  return (
    <>
      <div className="container py-40">
        <div
          className="w-fit py-32 px-32 rounded-xl grid gap-4 justify-items-center mx-auto"
          style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.16)" }}
        >
          <h4 className="">Payment successful</h4>
          <div className="bg-[#F29F05] rounded-full w-fit p-3">
            <MdDone className="font-bold text-white w-8 h-8 " />
          </div>
        </div>

        {/* <ConfettiExplosion className="absolute m-auto"
      /> */}
      </div>
    </>
  );
};

export default SuccessPage;
