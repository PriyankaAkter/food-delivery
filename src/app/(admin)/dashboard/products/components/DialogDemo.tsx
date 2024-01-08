import { CategoryType, ProductType } from "@/app/types/type";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import prisma from "@/lib/db";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

type DialogDemoType = {
  title: string;
  button1?: string;
  update: string;
  icon?: JSX.Element;
  className?: string;
  initialValue?: ProductType;
};
type ProductFormType = ProductType & {
  image: string | FileList;
};
export function DialogDemo({
  title,
  button1,
  update,
  icon,
  className,
  initialValue,
}: DialogDemoType) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isLoading },
  } = useForm<ProductFormType>({
    defaultValues: initialValue || {},
  });

  const cloud_name = "dvbkbxen4";
  const preset_key = "wzcxmcgg";

  //for session

  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const categoryData = await axios.get(
        `http://localhost:3000/api/categories`
      );
      return categoryData.data;
    },
  });

  // fetch restaurants

  const { data: restaurantFetch } = useQuery({
    queryKey: ["restaurant"],
    queryFn: async () => {
      const resraurantData = await axios.get(
        `http://localhost:3000/api/session`
      );

      return resraurantData.data;
    },
  });

  const onSubmit: SubmitHandler<ProductFormType> = async (data) => {
    console.log({ data });

    try {
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
      
      if (data?.price === undefined || data.price <= 0 || isNaN(data.price)) {
        toast.error("Price must be a valid positive number");
        return;
      }
      if (data?.stock === undefined || data?.stock < 0 || isNaN(data?.stock)) {
        toast.error("Stock can not be negative number");
        return;
      }
      if (!initialValue) {
        const createProduct = await axios.post(
          `http://localhost:3000/api/products`,
          {
            id: data.id,
            name: data.name,
            slug: data.slug,
            price: data.price,
            stock: data.stock,
            categoryId: data.categoryId,
            RestaurantId: restaurantFetch?.getRestaurant?.id,
            description: data.description,
            image: imageUrl,
          }
        );
        queryClient.invalidateQueries({ queryKey: ["products"] });
        toast.success("Product added successfully");
        // Reset only specific fields if needed

        return createProduct.data;
      } else {
        const updateProduct = await axios.put(
          `http://localhost:3000/api/products/${initialValue.id}`,
          {
            id: data.id,
            name: data.name,
            slug: data.slug,
            price: data.price,
            stock: data.stock,
            categoryId: data.categoryId,
            RestaurantId: restaurantFetch?.getRestaurant?.id,
            description: data.description,
            image: imageUrl,
          }
        );
        queryClient.invalidateQueries({ queryKey: ["products"] });
        toast.success("Product updated successfully");
        return updateProduct.data;
      }
    } catch (error) {
      console.error("Error handling file or submitting form:", error);
      toast.error("Error occur!");
    }
  };

  // };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={className}>
          {icon}
          {button1}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[350px] sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          action=""
          className="grid gap-4 py-4 "
        >
          <div className="flex flex-col items-start gap-3">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue=""
              {...register("name", { required: true })}
            />
          </div>
          <div className="flex flex-col items-start gap-3">
            <Label htmlFor="slug" className="text-right">
              slug
            </Label>
            <Input
              id="slug"
              defaultValue=""
              {...register("slug", { required: true })}
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col items-start gap-3">
              <Label htmlFor="price" className="text-right">
                price
              </Label>
              <Input
                {...register("price", { required: true, valueAsNumber: true,  })}
                id="price"
                defaultValue=""
                className=""
              />
            </div>
            <div className="flex flex-col items-start gap-3">
              <Label htmlFor="stock" className="text-right">
                stock
              </Label>
              <Input
                {...register("stock", { required: true, valueAsNumber:true })}
                id="stock"
                defaultValue=""
                className=""
              />
            </div>
          </div>
          <div className="flex flex-col items-start gap-3">
            <Label htmlFor="categoryId" className="text-right">
              category
            </Label>
            <select
              {...register("categoryId", { required: true })}
              name="categoryId"
              id="categoryId"
              className="w-full border py-2 rounded-md pl-2"
            >
              {data?.categories?.map((item: any, index: number) => (
                <option value={item?.id} key={index}>
                  {item?.slug}
                </option>
              ))}
            </select>
          </div>

          {/* <div className="flex flex-col items-start gap-3">
            <Label htmlFor="restaurantId" className="text-right">
              restaurant
            </Label>
            <select
              {...register("RestaurantId", { required: true })}
              name="RestaurantId"
              id="RestaurantId"
              className="w-full border py-2 rounded-md pl-2"
            >
              {restaurantFetch?.restaurants?.map((item: any, index: number) => (
                <option value={item?.id} key={index}>
                  {item?.name}
                </option>
              ))}
            </select>
          </div> */}

          
          <div className="flex flex-col items-start gap-3">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <textarea
              className="border  w-full"
              rows={5}
              {...register("description", { required: true })}
              id="description"
              defaultValue=""
            ></textarea>
          </div>

          <div className="flex flex-col items-start gap-3">
            <Label htmlFor="image" className="text-right">
              Image
            </Label>
            <Input type="file" id="image" {...register("image")} />
          </div>
          <DialogFooter className="flex flex-row gap-2">
            <Button
              type="reset"
              className="bg-[#F57213] hover:bg-[#F57213] text-white"
            >
              Cancle
            </Button>
            <Button
              type="submit"
              className="bg-[#F57213] hover:bg-[#F57213] text-white"
            >
              {update}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
