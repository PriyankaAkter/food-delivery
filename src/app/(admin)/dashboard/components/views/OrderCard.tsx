"use client";
import { items } from "@/app/(website)/components/views/data";
import { OrderType, ProductType } from "@/app/types/type";
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

interface OrderProps {
  order: OrderType;
}

const OrderCard: React.FC<OrderProps> = ({ order }) => {
  const [isChecked, setIsChecked] = useState(false);
  const handleClick = () => {
    setIsChecked(!isChecked);
  };

  


  const totalPrice = order?.items?.reduce((sum, item) => sum + (Number(item.price) * Number(item?.quantity)), 0);
  // console.log({totalPrice});
  const totalItems = order?.items?.reduce((sum, item) => sum + (1 * Number(item?.quantity)), 0);

  return (
    <div className="w-full  border border-[#E9EFF6] h-auto  rounded-[10px] p-10">
      <div>
        <h6>Order #{order?.id}</h6>
        <p>{order?.createdAt}</p>
      </div>
      <hr />
      <div>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-base">
              Client Details
            </AccordionTrigger>
            <AccordionContent>
              <p>Name: {order?.userName}</p>
              <p>Email: {order?.userEmail}</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <hr />

      <div className="h-[420px] overflow-y-auto px-3 ">
        {order?.items?.map((item: ProductType, index: number) => (
          <div className="flex gap-6 py-3 items-center" key={index}>
            <div className="w-20 h-16 relative">
              <Image
                src={item?.image || ""}
                alt="product"
                fill
                className="rounded-full"
              />
            </div>
            <div className="w-full grid gap-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h6>{item?.name}</h6>
                  <p>{item?.description}</p>
                </div>
                <button onClick={handleClick} className="pt-2">
                  {!isChecked ? <ImCheckboxUnchecked /> : <ImCheckboxChecked />}
                </button>
              </div>

              <div className="flex justify-between items-center">
                <p className="font-medium">{item?.price} tk</p>
                <p className="font-medium">Quantity: {item?.quantity}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <hr />
      
      <div className="flex justify-between items-center py-4">
        <div>
          <p>{totalItems} Items</p>
          <p className="font-medium">{totalPrice} tk</p>
        </div>
        <Button className="bg-[#F57213] hover:bg-[#F57213] text-white">
          Accept
        </Button>
      </div>
    </div>
  );
};

export default OrderCard;
