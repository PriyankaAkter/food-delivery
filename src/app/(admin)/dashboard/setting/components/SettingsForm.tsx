"use client";
import { RestaurantColumnType } from "@/app/types/type";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  mobile: string;
  email: string;
  country: string;
  address: string;
  openAndClosed: string;
};
const SettingsForm = () => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    
    formState: { errors },
  } = useForm<RestaurantColumnType>();

  const cloud_name = "dvbkbxen4";
  const preset_key = "wzcxmcgg";

  const { data, isLoading, error } = useQuery({
    queryKey: ["restaurant"],
    queryFn: async () => {
      const restaurantData = await axios.get(
        `http://localhost:3000/api/restaurants`
      );
      return restaurantData.data;
    },
  });

  if (isLoading) {
    return <h6>Loading...</h6>;
  }
  if (error) return "An error has occurred: " + error.message;

  // console.log(data?.restaurant);


  const onSubmit: SubmitHandler<RestaurantColumnType & { image: FileList }> = async (data) => {
    console.log(data);
    const file = data?.image[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", preset_key);
      const uploadFile = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData
      );

      const imageUrl = uploadFile.data.secure_url;
      console.log({ imageUrl });

      // Continue with the rest of your onSubmit logic
      console.log({ data, imageUrl });
    const updateProduct = await axios.put(
      `http://localhost:3000/api/restaurants`,
      {
        id: data.id,
        name: data?.name,
        slug: data?.slug,
        email: data?.email,
        address: data?.address,
        phone: data?.phone,
        deliveryTime: data?.deliveryTime,
        closingHour: data?.closingHour,
        openingHour: data?.openingHour,
        image: imageUrl
      }
    );
    queryClient.invalidateQueries({ queryKey: ["products"] });
    return updateProduct.data;
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="my-16">
      <h5>Change your account details</h5>
      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-16 mt-8">
          <div className="grid gap-2">
            <label htmlFor="name">Restaurant Name</label>
            <input disabled
              className="border border-gray-500 rounded-md py-3 pl-2"
              type="name"
              {...register("name")}
              defaultValue={data?.restaurant?.name}
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="slug">Restaurant Slug</label>
            <input
              className="border border-gray-500 rounded-md py-3 pl-2"
              type="slug"
              {...register("slug")}
              defaultValue={data?.restaurant?.slug}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-16">
          <div className="grid gap-2">
            <label htmlFor="email">Email Address</label>
            <input
            disabled
              className="border border-gray-500 rounded-md py-3 pl-2"
              type="email" 
              {...register("email")}
              defaultValue={data?.restaurant?.email}
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="phone">Phone</label>
            <input
              className="border border-gray-500 rounded-md py-3 pl-2"
              type="phone"
              {...register("phone")}
              defaultValue={data?.restaurant?.phone}
            />
          </div>
          
        </div>
        <div className="grid grid-cols-3 gap-8">
        <div className="grid gap-2">
            <label htmlFor="deliveryTime">Delivery Time</label>
            <input
              className="border border-gray-500 rounded-md py-3 pl-2"
              type="deliveryTime"
              {...register("deliveryTime")}
              defaultValue={data?.restaurant?.deliveryTime}
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="openingHour">Opening Hour</label>
            <input
              className="border border-gray-500 rounded-md py-3 pl-2"
              type="openingHour"
              {...register("openingHour")}
              defaultValue={data?.restaurant?.openingHour}
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="closingHour">Closing Hour</label>
            <input
              className="border border-gray-500 rounded-md py-3 pl-2"
              type="closingHour"
              {...register("closingHour")}
              defaultValue={data?.restaurant?.closingHour}
            />
          </div>
        </div>
        <div className="grid gap-2">
          <label htmlFor="address">Address</label>
          <textarea
            // className="border  w-full"
            className="border border-gray-500 rounded-md py-3 pl-2 w-full"
            rows={10}
            {...register("address", { required: true })}
            id="address"
            defaultValue={data?.restaurant?.address}
          ></textarea>
          <div className="flex flex-col items-start gap-3">
            <label htmlFor="image" className="text-right">
              Image
            </label>
            <input type="file" id="image" {...register("image")} />
          </div>
        </div>
        
      </div>
      <input
        type="submit"
        value="Save Changes"
        className="p-3 rounded-lg bg-[#F57213] text-white mt-8"
      />
    </form>
  );
};

export default SettingsForm;
