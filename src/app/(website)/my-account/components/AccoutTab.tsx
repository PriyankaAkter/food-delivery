"use client";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  mobile: string;
  email: string;
  country: string;
  address: string;
  openAndClosed: string;
};
const AccountTab = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    reset()
  };

  //   console.log(watch("example")); // watch input value by passing the name of it

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-28">
      <h5>Change your account details</h5>
      <div className="grid grid-cols-2 gap-16 mt-10">
        <div className="grid gap-2">
          <label htmlFor="mobile">Mobile Number</label>
          <input
            className="border border-gray-500 rounded-sm py-2"
            type="text"
            {...register("mobile", { required: true })}
          />
          <p className="text-red-600">
            {errors.mobile && <span>Mobile Number is required</span>}
          </p>
        </div>

        <div className="grid gap-2">
          <label htmlFor="email">Email Address</label>
          <input
            className="border border-gray-500 rounded-sm py-2"
            type="email"
            {...register("email", { required: true })}
          />
          <p className="text-red-600">
            {errors.email && <span>Email Address is required</span>}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-16 my-6">
        <div className="grid gap-2">
          <label htmlFor="country">Country</label>
          <input
            className="border border-gray-500 rounded-sm py-2"
            type="text"
            {...register("country", { required: true })}
          />
          <p className="text-red-600">
            {errors.country && <span>Country is required</span>}
          </p>
        </div>

        <div className="grid gap-2">
          <label htmlFor="address">Address</label>
          <input
            className="border border-gray-500 rounded-sm py-2"
            type="text"
            {...register("address", { required: true })}
          />
          <p className="text-red-600">
            {errors.address && <span>Address is required</span>}
          </p>
        </div>
      </div>
      <div className="grid gap-2 my-6">
        <label htmlFor="country">Open & Closed Hour</label>
        <input
          className="border border-gray-500 rounded-sm py-2"
          type="text"
          {...register("openAndClosed", { required: true })}
        />
        <p className="text-red-600">
          {errors.openAndClosed && <span>This field is required</span>}
        </p>
      </div>
      <input
        type="submit" value="Save Changes"
        className="text-xl rounded-[10px] bg-[#F57213] text-white py-2 px-6"
      />
    </form>
  );
};

export default AccountTab;



