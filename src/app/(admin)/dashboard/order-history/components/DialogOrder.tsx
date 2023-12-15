'use client'
import { OrderType, ProductType } from "@/app/types/type";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { AiOutlinePlus } from "react-icons/ai";
// import {useState} from 'react'

type DialogOrderType = {
  initialValue?: OrderType;
};

export function DialogOrder({ initialValue }: DialogOrderType) {
  const {data:session} = useSession()
  // console.log({ initialValue });
 
  


  // const filterItems = initialValue?.items?.filter((item:ProductType)=>item?.restaurant?.email === session?.user?.email)
  // const [isAdd,setIsAdd] = useState(true)
  // console.log({filterItems});

  const totalPrice = initialValue?.items?.reduce((sum, item) => sum + (Number(item.price) * Number(item?.quantity)), 0);
  // console.log({totalPrice});

  // const totalItems = filterItems?.reduce((sum, item) => sum + (1 * Number(item?.quantity)), 0);
  const totalItems = initialValue?.items?.reduce(
    (sum, item) => sum + 1 * Number(item?.quantity),
    0
  );
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#F57213] hover:bg-[#F57213] text-white">
          view
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px] bg-white">
        <DialogHeader>
          <DialogTitle>Order #{initialValue?.id}</DialogTitle>
          <DialogDescription>{new Date(initialValue?.createdAt)?.toLocaleString()}</DialogDescription>
        </DialogHeader>
        <div className="grid ">
          {initialValue?.items?.map((item: ProductType, index: number) => (
            <div className="flex border-y  justify-between pr-6  items-center py-4 " key={index}>
              <div className="flex gap-5 items-center py-4">
                <div className="w-16 h-16 relative">
                  <Image
                    src={item?.image || ""}
                    alt="product"
                    fill
                    className="rounded-full"
                  />
                </div>
                <div>
                  <h6>{item?.name}</h6>
                  <p>{item?.restaurant?.name}</p>
                  <p>
                    {item?.description}
                  </p>
                </div>
              </div>
              <div className="flex gap-5 items-center py-4 ">
                <p>{item?.price } tk</p>
                <p>Quantity: {item?.quantity}</p>
              </div>
            </div>
          ))}
          
        </div>
        <DialogFooter className="grid grid-cols-2">
          <h6>{totalItems} Items</h6>
          <h6 className="text-end">Total: {totalPrice} tk</h6>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
