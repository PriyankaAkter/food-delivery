import { ProductType, ReviewType } from "@/app/types/type";
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
import { ChangeEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import StarRating from "./StarRating";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

type DialogDemoType = {
  title: string;
  button1?: string;
  update: string;
  icon?: JSX.Element;
  className?: string;
  initialValue?: string;
};

export function DialogDemo({
  title,
  button1,
  update,
  icon,
  className,
  initialValue
}: DialogDemoType) {
  const { register, handleSubmit } = useForm();
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [rating, setRating] = useState<number>(0);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const onSubmit = async (data: ReviewType) => {
    console.log(data, rating);
    try {
      const addReview = await axios.post(`http://localhost:3000/api/reviews`, {
        comment: data?.comment,
        rating: rating,
        userId: session?.user?.id,
        productId: initialValue
      });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Review deleted successfully");
      // console.log({addReview});
      
      return addReview.data;
    } catch (error) {
      console.log(error);
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
          <StarRating value={rating} onChange={handleRatingChange} />
          <div className="flex flex-col items-start gap-3">
            <Label htmlFor="comment" className="text-right">
              Comment
            </Label>
            <Input id="comment" {...register("comment", { required: true })} />
          </div>

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
