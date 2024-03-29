"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { CustomerType } from "@/app/types/type";
import axios from "axios";
import { useAppSelector } from "@/app/redux_store/store";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";



const BillingDetails = () => {
  const { data: session } = useSession();
  const cart = useAppSelector((state) => state?.cart?.products);
 
  const form = useForm();
  const queryClient = useQueryClient();
  const router = useRouter();
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

  // console.log({ data });
  queryClient.invalidateQueries({ queryKey: ["user"] });

  const { register, handleSubmit, formState } = form;


  // console.log({ cart });

  const totalPrice = cart.reduce(
    (sum: number, item: any) => sum + item?.price * item?.quantity,
    0
  );

  const deliveryCost = totalPrice + 60

  const onSubmit: SubmitHandler<CustomerType> = async (data) => {
    try {
      const res = await axios.post("/api/create-intent", deliveryCost);

      const clientSecret = res.data.clientSecret;

      // Update user information
      const updateUserData = await axios.put(`/api/user/${session?.user?.id}`, {
        name: data.name,
        email: data.email,
        address: data.address,
        phone: data.phone,
        
      });

      // Redirect to the payment page with the client secret
      router.push(`/payment/${clientSecret}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full xl:w-[900px] mx-auto py-10 px-2">
      <div className=" bg-[#F9F8F8] p-5 2xl:p-[68px]">
        <h5 className="mb-[11px]">Billing Details</h5>
        <hr className="mb-10 md:mb-20 bg-primary" />
        <form
          onSubmit={handleSubmit(onSubmit)}
          action="/"
          className="grid gap-12"
        >
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-10">
              <div className="grid gap-3">
                <label htmlFor="name" className="text-base">
                  Full Name
                </label>
                <div>
                  <input
                    type="text"
                    id="name"
                    disabled
                    {...register("name")}
                    defaultValue={data?.user?.name}
                    className="border border-theme-gray w-full pl-4 py-4"
                  />
                </div>
                {/* <p className="text-red-500">{errors?.name?.message}</p> */}
              </div>
              <div className="grid gap-3">
                <label htmlFor="email" className="text-base">
                  Email Address
                </label>
                <div>
                  <input
                    type="email"
                    id="email"
                    disabled
                    {...register("email")}
                    defaultValue={data?.user?.email}
                    className="border border-theme-gray w-full pl-4 py-4"
                  />
                </div>
                {/* <p className="text-red-500">{errors.email?.message}</p> */}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              <div className="grid gap-3">
                <label htmlFor="address" className="text-base">
                  address
                </label>
                <div>
                  <input
                    type="text"
                    id="address"
                    {...register("address",{ required: true })}
                    defaultValue={data?.user?.address}
                    className="border border-theme-gray w-full pl-4 py-4"
                  />
                </div>
                {/* <p className="text-red-500">{errors.address?.message}</p> */}
              </div>
              <div className="grid gap-3">
                <label htmlFor="phone" className="text-base">
                  Phone number
                </label>
                <div>
                  <input
                    type="text"
                    id="phone"
                    {...register("phone",{ required: true })}
                    defaultValue={data?.user?.phone}
                    className="border border-theme-gray w-full pl-4 py-4"
                  />
                </div>
                {/* <p className="text-red-500">{errors.phone?.message}</p> */}
              </div>
            </div>

            {/* <div className="grid gap-3">
              <label htmlFor="optional" className="text-base">
                Message
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
            </div> */}
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
              <h6>{deliveryCost} tk</h6>
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
