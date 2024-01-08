import { RestaurantColumnType } from "@/app/types/type";
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
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";



type DialogDemoType = {
  title: string;
  button1?: string;
  update: string;
  icon?: JSX.Element;
  className?: string;
  initialValue?: RestaurantColumnType;
};

export function DialogDemo({
  title,
  button1,
  update,
  icon,
  className,
  initialValue,
}: DialogDemoType) {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isLoading },
  } = useForm({
    defaultValues: initialValue,
  });

  const cloud_name = "dvbkbxen4";
  const preset_key = "wzcxmcgg";
  const onSubmit: SubmitHandler<RestaurantColumnType & { image: FileList }> =
    async (data) => {
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

        if (!initialValue) {
          const createRestaurant = await axios.post(
            `http://localhost:3000/api/restaurant`,
            {
              id: data.id,
              name: data.name,
              slug: data.slug,
              email: data.email,
              phone: data.phone,
              image: imageUrl,
            }
          );
          queryClient.invalidateQueries({ queryKey: ["restaurant"] });

          // Reset only specific fields if needed
          reset({
            name: "",
            slug: "",
            email: "",
            phone: "",
            image: null,
          });

          return createRestaurant.data;
        } else {
          const updateRestaurant = await axios.put(
            `http://localhost:3000/api/restaurant/${initialValue.id}`,
            {  id: data.id,
              name: data.name,
              slug: data.slug,
              email: data.email,
              phone: data.phone,
              image: imageUrl, }
          );
          queryClient.invalidateQueries({ queryKey: ["restaurant"] });
          return updateRestaurant.data;
        }
      } catch (error) {
        console.error("Error handling file or submitting form:", error);
        // Handle error here, show a message to the user, etc.
      }
    };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={className}>
          {icon}
          {button1}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          action=""
          className="grid gap-4 py-4"
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
              Restaurant Slug
            </Label>
            <Input
              id="slug"
              defaultValue=""
              {...register("slug", { required: true })}
            />
          </div>
          <div className="flex flex-col items-start gap-3">
            <Label htmlFor="email" className="text-right">
              email
            </Label>
            <Input
              id="email"
              defaultValue=""
              {...register("email", { required: true })}
            />
          </div>
          <div className="flex flex-col items-start gap-3">
            <Label htmlFor="phone" className="text-right">
              phone
            </Label>
            <Input
              id="phone"
              defaultValue=""
              {...register("phone", { required: true })}
            />
          </div>
          <div className="flex flex-col items-start gap-3">
            <Label htmlFor="image" className="text-right">
              Image
            </Label>
            <Input
              type="file"
              id="image"
              {...register("image")}
            />
          </div>
          {/* <input type="submit" /> */}

          <DialogFooter>
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
