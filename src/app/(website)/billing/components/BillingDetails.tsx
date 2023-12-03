"use client";
import { useForm } from "react-hook-form";
import { items } from "../../components/views/data";
import ButtonOne from "../../components/shared/ButtonOne";
import getCart from "@/utilis/getCart";

import { useStripe } from "@stripe/react-stripe-js";

import { ProductType } from "@/app/types/type";
import axios from "axios";
import { useAppSelector } from "@/app/redux_store/store";
import { ZodType, z } from "zod";



type formDataType = {
  name?: string;
  phone?: string;
  area?: string;
  code?: number;
  city?:string;
  district?: string;
  email?: string;
  optional?:string;
};

const signInSchema: ZodType<formDataType> = z
  .object({
    name: z.string().min(1, "Name is required"),
    phone: z.string().min(1, "phone is required"),
    district: z.string().min(1, "district is required"),
    city: z.string().min(1, "city is required"),
    area: z.string().min(1, "area is required"),
    code: z.number(),
    email: z.string().min(1, "Email is required"),
    optional: z.string()
  })

const BillingDetails = () => {
  const form = useForm();

  const { register, handleSubmit, formState } = form;
  // const { errors, isSubmitting } = formState;
  // const stripe = useStripe();
  const cart = useAppSelector((state) => state?.cart?.products);
  console.log({ cart });

  const totalPrice = cart.reduce(
    (sum: number, item:any) => sum + (item?.price * item?.quantity),
    0
  );

  const onSubmit = async (data: formDataType) => {
    console.log(data);
  
    // try {
    //   if (!cart.length) {
    //     return;
    //   }
  
    //   const sessionResponse = await checkoutSession(cart);
  
    //   // Check if sessionResponse is defined before parsing
    //   if (sessionResponse) {
    //     const session = JSON.parse(sessionResponse);
  
    //     // Continue with the rest of your code...
    //     // await axios.post(
    //     //   "http://localhost:3000/api/order/createOrder",
    //     //   {
    //     //     data,
    //     //     cart,
    //     //     sessionId: session.id,
    //     //   }
    //     // );
    //     await postOrder(data, cart, session.id);
    //     stripe?.redirectToCheckout({
    //       sessionId: session.id,
    //     });
    //   } else {
    //     console.error("Failed to retrieve checkout session.");
    //   }
    // } catch (error) {
    //   console.error("Error occurs");
    // }
  };
  
  

  return (
    <div className="container py-10">
      <div className=" bg-[#F9F8F8] p-5 2xl:p-[68px]">
        <h5 className="mb-[11px]">Billing Details</h5>
        <hr className="mb-20 bg-primary" />
        <form
          onSubmit={handleSubmit(onSubmit)}
          action="/"
          className="grid gap-12"
        >
          <div>
            <div className="grid grid-cols-2 gap-10">
              <div className="grid gap-3">
                <label htmlFor="name" className="text-base">
                  Full Name
                </label>
                <div>
                  <input
                    type="text"
                    id="name"
                    {...register("name")}
                    className="border border-theme-gray w-full pl-4 py-4"
                  />
                </div>
                {/* <p className="text-red-500">{errors.name?.message}</p> */}
              </div>
              <div className="grid gap-3">
                <label htmlFor="district" className="text-base">
                  District
                </label>
                <div>
                  <input
                    type="text"
                    id="district"
                    {...register("district")}
                    className="border border-theme-gray w-full pl-4 py-4"
                  />
                </div>
                {/* <p className="text-red-500">{errors.district?.message}</p> */}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-10">
              <div className="grid gap-3">
                <label htmlFor="city" className="text-base">
                  Town/ City
                </label>
                <div>
                  <input
                    type="text"
                    id="city"
                    {...register("city")}
                    className="border border-theme-gray w-full pl-4 py-4"
                  />
                </div>
                {/* <p className="text-red-500">{errors.city?.message}</p> */}
              </div>
              <div className="grid gap-3">
                <label htmlFor="code" className="text-base">
                  Postal code
                </label>
                <div>
                  <input
                    type="number"
                    id="code"
                    {...register("code")}
                    className="border border-theme-gray w-full pl-4 py-4"
                  />
                </div>
                {/* <p className="text-red-500">{errors.code?.message}</p> */}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-10">
              <div className="grid gap-3">
                <label htmlFor="area" className="text-base">
                  Area
                </label>
                <div>
                  <input
                    type="text"
                    id="area"
                    {...register("area")}
                    className="border border-theme-gray w-full pl-4 py-4"
                  />
                </div>
                {/* <p className="text-red-500">{errors.area?.message}</p> */}
              </div>
              <div className="grid gap-3">
                <label htmlFor="phone" className="text-base">
                  Phone number
                </label>
                <div>
                  <input
                    type="text"
                    id="phone"
                    {...register("phone")}
                    className="border border-theme-gray w-full pl-4 py-4"
                  />
                </div>
                {/* <p className="text-red-500">{errors.phone?.message}</p> */}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-10">
              <div className="grid gap-3">
                <label htmlFor="email" className="text-base">
                  Email Address
                </label>
                <div>
                  <input
                    type="email"
                    id="email"
                    {...register("email")}
                    className="border border-theme-gray w-full pl-4 py-4"
                  />
                </div>
                {/* <p className="text-red-500">{errors.email?.message}</p> */}
              </div>
            </div>
            <div className="grid gap-3">
              <label htmlFor="optional" className="text-base">
                Notes about your order, special notes for delivery.
              </label>
              <div>
                <textarea
                  className="border border-theme-gray w-full pl-4 py-4"
                  id="optional"
                  cols={30}
                  rows={10}
                  placeholder="Notes about your order, special notes for delivery."
                  {...register("optional")}
                ></textarea>
              </div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center my-4 pr-2">
              <h6>Your Cart</h6>
              <h6>{cart?.length} items</h6>
            </div>
            <hr />
            <div className="flex justify-between items-center my-4 pr-2">
              <h6>SubTotal</h6>
              <h6>{totalPrice} tk</h6>
            </div>
            <hr />
            <div className="flex justify-between items-center my-4 pr-2">
              <h6>Delivery cost expected</h6>
              <h6>60 tk</h6>
            </div>

            <div className="flex justify-end gap-12 items-center bg-secondary py-4 pr-2">
              <h6>Total Cost</h6>
              <h6>{totalPrice + 60} tk</h6>
            </div>
          </div>

          <div className="flex justify-center">
            <button type="submit" className="bg-[#F29F05] py-3 px-9 text-white">
              PLACE ORDER
            </button>
            {/* <ButtonOne
              title="PLACE ORDER"
              href="/order"
              className="bg-[#F29F05] text-white"
            /> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default BillingDetails;
