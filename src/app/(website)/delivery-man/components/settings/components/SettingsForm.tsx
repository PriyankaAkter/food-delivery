"use client";
import { CustomerType, RestaurantColumnType } from "@/app/types/type";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

const SettingsForm = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm<CustomerType>();

  const cloud_name = "dvbkbxen4";
  const preset_key = "wzcxmcgg";

  const { data, isLoading, error } = useQuery({
    queryKey: ["deliveryMan"],
    queryFn: async () => {
      const deliveryManData = await axios.get(
        `http://localhost:3000/api/delivery-man/${session?.user?.id}`
      );
      return deliveryManData.data;
    },
  });

  if (isLoading) {
    return <h6>Loading...</h6>;
  }
  if (error) return "An error has occurred: " + error.message;

  // console.log({ data });

  const onSubmit: SubmitHandler<CustomerType & { image: FileList }> = async (
    data
  ) => {
    // console.log(data);
    try {
      if (data.image) {
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
  
        console.log({ data, imageUrl });
  
        const updateProduct = await axios.put(
          `http://localhost:3000/api/user/${session?.user?.id}`,
          {
            id: data.id,
            name: data?.name,
            email: data?.email,
            address: data?.address,
            phone: data?.phone,
            image: imageUrl,
          }
        );
        queryClient.invalidateQueries({ queryKey: ["user"] });
        toast.success("Profile updated successfully");
        return updateProduct.data;
      } else {
        
  
        const updateProduct = await axios.put(
          `http://localhost:3000/api/user/${session?.user?.id}`,
          {
            id: data.id,
            name: data?.name,
            email: data?.email,
            address: data?.address,
            phone: data?.phone,
          }
        );
        queryClient.invalidateQueries({ queryKey: ["user"] });
        toast.success("Profile updated successfully");
        return updateProduct.data;
      }
    } catch (error) {
      toast.error("Error Occur!");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" w-full">
      <h5 className="text-center">Account Settings</h5>
      {/* <div>
        <p>Personal Information</p>
        <div>
          <div className="w-28 h-28 relative">
            <Image src={} alt="profile" fill className="rounded-full" />
          </div>
        </div>
      </div> */}
      <div className="grid gap-4">
        <div className="grid gap-2">
          <label htmlFor="name">Name</label>
          <input
            disabled
            className="border border-gray-500 rounded-md py-3 pl-2"
            type="name"
            {...register("name")}
            defaultValue={data?.user?.name}
          />
        </div>
        <div className="grid grid-cols-2 gap-16">
          <div className="grid gap-2">
            <label htmlFor="email">Email Address</label>
            <input
              disabled
              className="border border-gray-500 rounded-md py-3 pl-2"
              type="email"
              {...register("email")}
              defaultValue={data?.user?.email}
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="phone">Phone</label>
            <input
              className="border border-gray-500 rounded-md py-3 pl-2"
              type="phone"
              {...register("phone")}
              defaultValue={data?.user?.phone}
            />
          </div>
        </div>

        <div className="grid gap-2">
          <label htmlFor="address">Address</label>
          <textarea
            // className="border  w-full"
            className="border border-gray-500 rounded-md py-3 pl-2 w-full"
            rows={10}
            {...register("address")}
            id="address"
            defaultValue={data?.user?.address}
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
        className="p-3 rounded-lg bg-[#F57213] text-white mt-8 cursor-pointer"
      />
    </form>
  );
};

export default SettingsForm;
