"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
const OrderCard = () => {
  const [isChecked, setIsChecked] = useState(false);
  const handleClick = () => {
    setIsChecked(!isChecked);
  };
  return (
    <div className=" w-[441px] border border-[#E9EFF6] rounded-[10px] p-6">
      <div>
        <h6>Order #316</h6>
        <p>5 Dec 2023, 13:29</p>
      </div>
      <hr />
      <div>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-base">
              Client Details
            </AccordionTrigger>
            <AccordionContent>
              <p>Name: Priyanka</p>
              <p>Email: priyanka555@gmail.com</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <hr />
      <div className="h-[420px] overflow-y-auto px-3">
        <div className="flex gap-6 py-3 items-center">
          <div className="w-20 h-16 relative">
            <Image
              src="/assests/images/home/img1.png"
              alt="product"
              fill
              className="rounded-full"
            />
          </div>
          <div className="w-full grid gap-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h6>Custurd Pudding</h6>
                <p>Milk with bananas, Apple..</p>
              </div>
              <button onClick={handleClick} className="pt-2">
                {!isChecked ? <ImCheckboxUnchecked /> : <ImCheckboxChecked />}
              </button>
            </div>

            <div className="flex justify-between items-center">
              <p className="font-medium">150.00 tk</p>
              <p className="font-medium">Quantity: 1</p>
            </div>
          </div>
        </div>
        <hr />
        <div className="flex gap-6 py-3 items-center">
          <div className="w-20 h-16 relative">
            <Image
              src="/assests/images/home/img5.png"
              alt="product"
              fill
              className="rounded-full"
            />
          </div>
          <div className="w-full grid gap-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h6>Custurd Pudding</h6>
                <p>Milk with bananas, Apple..</p>
              </div>
              <button onClick={handleClick} className="pt-2">
                {!isChecked ? <ImCheckboxUnchecked /> : <ImCheckboxChecked />}
              </button>
            </div>

            <div className="flex justify-between items-center">
              <p className="font-medium">150.00 tk</p>
              <p className="font-medium">Quantity: 1</p>
            </div>
          </div>
        </div>
        <hr />
        <div className="flex gap-6 py-3 items-center">
          <div className="w-20 h-16 relative">
            <Image
              src="/assests/images/home/img4.png"
              alt="product"
              fill
              className="rounded-full"
            />
          </div>
          <div className="w-full grid gap-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h6>Custurd Pudding</h6>
                <p>Milk with bananas, Apple..</p>
              </div>
              <button onClick={handleClick} className="pt-2">
                {!isChecked ? <ImCheckboxUnchecked /> : <ImCheckboxChecked />}
              </button>
            </div>

            <div className="flex justify-between items-center">
              <p className="font-medium">150.00 tk</p>
              <p className="font-medium">Quantity: 1</p>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="flex justify-between items-center py-4">
        <div>
          <p>X Items</p>
          <p className="font-medium">1000.00 tk</p>
        </div>
        <Button className="bg-[#F57213] hover:bg-[#F57213] text-white">Accept</Button>
      </div>
    </div>
  );
};

export default OrderCard;
