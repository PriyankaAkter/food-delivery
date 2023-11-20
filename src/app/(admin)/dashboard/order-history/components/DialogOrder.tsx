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
import Image from "next/image";
import { AiOutlinePlus } from "react-icons/ai";
// import {useState} from 'react'

type DialogOrderType = {
  title: string;
  button1?: string;
  update: string;
  icon?: JSX.Element;
  className?: string;
};

export function DialogOrder() {
  // const [isAdd,setIsAdd] = useState(true)
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#F57213] hover:bg-[#F57213] text-white">view</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] bg-white">
        <DialogHeader>
          <DialogTitle>Order #301</DialogTitle>
          <DialogDescription>5 Dec 2022, 13.25</DialogDescription>
        </DialogHeader>
        <div className="grid">
          <div className="flex border-y  justify-between pr-6 gap-8 items-center py-4">
            <div className="flex gap-5 items-center py-4">
              <div className="w-16 h-16 relative">
                <Image
                  src="/assests/images/home/img1.png"
                  alt="product"
                  fill
                  className="rounded-full"
                />
              </div>
              <div>
                <h6>Indian Dosa</h6>
                <p>
                  Milk with bananas,
                  <br /> Apple..
                </p>
              </div>
            </div>
            <div className="flex gap-5 items-center py-4">
              <p>Quantity: 1</p>
              <p>150.00 tk</p>
            </div>
          </div>
          <div className="pr-5 border-b flex gap-8 justify-between items-center py-4">
            <div className="flex gap-5  items-center py-4">
              <div className="w-16 h-16 relative">
                <Image
                  src="/assests/images/home/img2.png"
                  alt="product"
                  fill
                  className="rounded-full"
                />
              </div>
              <div>
                <h6>Indian Thali</h6>
                <p>Milk with bananas, Apple..</p>
              </div>
            </div>
            <div className="flex gap-5 items-center py-4">
              <p>Quantity: 1</p>
              <p>150.00 tk</p>
            </div>
          </div>
          <div className="flex pr-6 border-b justify-between gap-8 items-center py-4">
            <div className="flex gap-5 items-center py-4">
              <div className="w-16 h-16 relative">
                <Image
                  src="/assests/images/home/img3.png"
                  alt="product"
                  fill
                  className="rounded-full"
                />
              </div>
              <div>
                <h6>Custurd Pudding</h6>
                <p>
                  Milk with bananas,
                  <br /> Apple..
                </p>
              </div>
            </div>
            <div className="flex gap-5 items-center py-4">
              <p>Quantity: 1</p>
              <p>150.00 tk</p>
            </div>
          </div>
        </div>
        <DialogFooter className="grid grid-cols-2">
            <h6>3 Items</h6>
            <h6 className="text-end">Total: 450.00 tk</h6>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
