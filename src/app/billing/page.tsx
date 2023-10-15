"use client";
import { useForm } from "react-hook-form";
import { items } from "../components/views/data";
import ButtonOne from "../components/shared/ButtonOne";

const Page = () => {
    const form = useForm();
  
  const totalPrice=items.reduce((sum:number,item:any)=>(sum+(item.price*1)),0)
  const totalDeliProducts = totalPrice + 60
  const { register, handleSubmit, formState } = form;
  const { errors, isSubmitting } = formState;
  return (
    <div className="container py-10 2xl:py-[134px]">
      <div className=" bg-[#F9F8F8] p-5 2xl:p-[68px]">
        <h5 className="mb-[11px]">Billing Details</h5>
        <hr className="mb-20 bg-primary" />
        <form
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
                    {...register("name", {
                      required: "Name is required",
                    })}
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
                    {...register("district", {
                      required: "District is required",
                    })}
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
                    {...register("city", {
                      required: "Town/City is required",
                    })}
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
                    {...register("code", {
                      required: "Postal code is required",
                    })}
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
                    {...register("area", {
                      required: "Area is required",
                    })}
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
                    type="number"
                    id="phone"
                    {...register("phone", {
                      required: "Phone number is required",
                    })}
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
                    {...register("email", {
                      required: "Email is required",
                    })}
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
              <h6>{items?.length} items</h6>
            </div>
            <hr />
            <div className="flex justify-between items-center my-4 pr-2">
              <h6>Products Cost</h6>
              <h6>$ {totalPrice}</h6>
            </div>
            <hr />
            <div className="flex justify-between items-center my-4 pr-2">
              <h6>Delivery cost expected</h6>
              <h6>$ 60</h6>
            </div>

            <div className="flex justify-end gap-12 items-center bg-secondary py-4 pr-2">
              <h6>Total Cost</h6>
              <h6>$ {totalDeliProducts}</h6>
            </div>
          </div>
          
          <div className="flex justify-center">
          <ButtonOne title='PLACE ORDER' href='/order' className="bg-[#FC8019] text-white" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Page