import { CategoryType } from "@/app/types/type";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

// type FormInputsType = {
//   id: number;
//   cat_id: number;
//   name: string;
//   slug: string;
// };

type DialogDemoType = {
  title: string;
  button1?: string;
  update: string;
  icon?: JSX.Element;
  className?: string;
  initialValue?: CategoryType
};

export function DialogDemo({
  title,
  button1,
  update,
  icon,
  className,
  initialValue
}: DialogDemoType) {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm({
    defaultValues: initialValue
  });
  const queryClient = useQueryClient();

  const onSubmit:any = async (data:CategoryType) => {
try {
  if(!initialValue){
    const createCategory = await axios.post("http://localhost:3000/api/categories",data)
    queryClient.invalidateQueries({ queryKey: ["categories"] });
    toast.success('Category added successfully')
    return createCategory.data
  }
  else{
    const updateCategory = await axios.put(`http://localhost:3000/api/categories/${initialValue.id}`,data)
    queryClient.invalidateQueries({ queryKey: ["categories"] });
    toast.success('Category updated successfully')
    return updateCategory.data
  }
} catch (error) {
  toast.error("Error Occur!");
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
              Slug
            </Label>
            <Input
              id="slug"
              defaultValue=""
              {...register("slug", { required: true })}
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
