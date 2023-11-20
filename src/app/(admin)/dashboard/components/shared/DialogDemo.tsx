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
import { SubmitHandler, useForm } from "react-hook-form";


type FormInputsType = {
  res_id: number
  name: string
  city:string
  email:string
  phone:string
  res_image:string
}


type DialogDemoType = {
  title: string;
  button1?: string;
  update: string;
  icon?: JSX.Element;
  className?: string;
};

export function DialogDemo({
  title,
  button1,
  update,
  icon,
  className,
}: DialogDemoType) {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm();

  const onSubmit:SubmitHandler<FormInputsType> = (data) => {
    console.log({data});
    
  }
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

        <form onSubmit={handleSubmit(onSubmit)} action="" className="grid gap-4 py-4">
          <div className="flex flex-col items-start gap-3">
            <Label htmlFor="res_id" className="text-right">
              Restaurant Id
            </Label>
            <Input
              id="res_id"
              defaultValue=""
              {...register("res_id", { required: true })}
            />
          </div>
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
            <Label htmlFor="city" className="text-right">
              Location
            </Label>
            <Input
              id="city"
              {...register("city", { required: true })}
              defaultValue=""
              className="col-span-6"
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col items-start gap-3">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                {...register("email", { required: true })}
                id="email"
                defaultValue=""
                className=""
              />
            </div>
            <div className="flex flex-col items-start gap-3">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                {...register("phone", { required: true })}
                id="phone"
                defaultValue=""
                className=""
              />
            </div>
          </div>

          <div className="flex flex-col items-start gap-3">
            <Label htmlFor="res_image" className="text-right">
              Photo
            </Label>
            <Input
              id="res_image"
              {...register("res_image", { required: true })}
              type="file"
              defaultValue=""
              className=""
            />
          </div>
          <input type="submit" />
        </form>

        <DialogFooter>
          <Button
            type="submit"
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
      </DialogContent>
    </Dialog>
  );
}
