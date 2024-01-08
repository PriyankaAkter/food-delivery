"use client";
import { clearCart } from "@/app/redux_store/cartAddSlice";
import { useAppDispatch, useAppSelector } from "@/app/redux_store/store";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
// import ConfettiExplosion from "react-confetti-explosion";
import { MdDone } from "react-icons/md";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const payment_intent = searchParams.get("payment_intent");
  const { data: session } = useSession();
  // console.log({session});
  const dispatch = useAppDispatch()
  const cart = useAppSelector((state) => state?.cart?.products);
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const userData = await axios.get(
        `http://localhost:3000/api/user/${session?.user?.id}`
      );
      return userData.data;
    },
  });
  console.log({data});
  
  const totalPrice = cart.reduce(
    (sum: number, item: any) => sum + item?.price * item?.quantity,
    0
  );
  const deliveryCost = totalPrice + 60
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataResponse = await axios.get(
          `http://localhost:3000/api/user/${session?.user?.id}`
        );
        setUserData(userDataResponse?.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoadingUser(false);
      }
    };

    if (session?.user?.id) {
      fetchUserData();
    }
  }, [session?.user?.id]);

  useEffect(() => {
    if (payment_intent && userData && cart && cart.length > 0) {
      setIsLoading(true);
      const makeRequest = async () => {
        try {
          const orderData = {
            price: deliveryCost,
            items: cart,
            restaurantName: cart[0]?.restaurant?.name,
            payment_id: payment_intent,
            status: "Paid",
            restaurantId: cart[0]?.RestaurantId,
            billingaddress: userData?.user?.address,
            billingphone: userData?.user?.phone,
          };

          // Send order data to create order
          const { data: orderResponse } = await axios.post(
            'http://localhost:3000/api/orders',
            orderData
          );

          // Update product stock for each item in the cart
          for (const item of cart) {
            await axios.put(`http://localhost:3000/api/products/${item?.id}`, {
              stock: item?.stock - item?.quantity,
            });
          }

          dispatch(clearCart());
          console.log({ orderResponse });
          setError(null);
        } catch (error) {
          console.error('Error creating order:', error);
          setError('Order Create Failed');
        } finally {
          setIsLoading(false);
        }
      };

      makeRequest();
    }
  }, [payment_intent, cart, userData]);

  if (isLoadingUser) return <div>Loading user data...</div>;
  if (isLoading) return <div>loading....</div>;
  if (error) return <div>{error}</div>;

  // useEffect(() => {
  //   if (payment_intent && data && cart && cart.length > 0) {
  //     setIsLoading(true);
  //     const makeRequest = async () => {
  //       try {
  //       //   const userData = await axios.get(`http://localhost:3000/api/user/${session?.user?.id}`);
  //       // const { data:userInfo } = userData;
  //       // console.log({userInfo});
        
  //       // if (!userInfo) {
  //       //   throw new Error("User data not available");
  //       // }
  //         const orderData = {
  //           price: deliveryCost,
  //           items: cart,
  //           restaurantName: cart[0]?.restaurant?.name,
  //           payment_id: payment_intent,
  //           status: "Paid",
  //           restaurantId: cart[0]?.RestaurantId,
  //           billingaddress: data?.user?.address,
  //           billingphone: data?.user?.phone
  //         };

  //         // Send order data to create order
  //         const { data: orderResponse } = await axios.post('http://localhost:3000/api/orders', orderData);
  //         console.log({orderResponse});
          
  //         // Update product stock for each item in the cart
  //         for (const item of cart) {
  //           await axios.put(`http://localhost:3000/api/products/${item?.id}`, {
  //             stock: item?.stock - item?.quantity,
  //           });
  //         }

  //         dispatch(clearCart());
  //         console.log({ orderResponse });
  //         setError(null);
  //       } catch (error) {
  //         console.error('Error creating order:', error);
  //         setError("Order Create Failed");
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     };

  //     makeRequest();
  //   }
  // }, [payment_intent, cart, data]);

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
