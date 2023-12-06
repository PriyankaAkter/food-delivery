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
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";

interface OrderProps {
  order: OrderType;
}

const OrderCard: React.FC<OrderProps> = ({ order }) => {
  const [deliveryStatus, setDeliveryStatus] = useState(
    order?.delivery || "PENDING"
  );
  const [isCanceled, setIsCanceled] = useState(false);

  const handleStatus = async () => {
    try {
      if (isCanceled) {
        console.log("Order is canceled. Cannot change status.");
        // const cancleStatus = await axios.put(
        //   `http://localhost:3000/api/orders/${order?.id}`,
        //   {
        //     delivery: "CANCLE",
        //   }
        // );
        return alert("Order is canceled. Cannot change status.")
      }
      let newStatus;
      switch (deliveryStatus) {
        case "PENDING":
          newStatus = "PROCESSING";
          break;
        case "PROCESSING":
          newStatus = "OUT_OF_DELIVERY";
          break;
        case "OUT_OF_DELIVERY":
          newStatus = "DELIVERED";
          break;
        // case "delivered":
        //   // If it's delivered, clicking again will reset to pending
        //   newStatus = "pending";
        //   break;
        default:
          newStatus = "PENDING";
      }

      const updateStatus = await axios.put(
        `http://localhost:3000/api/orders/${order?.id}`,
        {
          delivery: newStatus,
        }
      );

      // Update the local state to reflect the new delivery status
      setDeliveryStatus(newStatus);

      console.log({ updateStatus });
    } catch (error: any) {
      console.error("Error updating order status:", error);
    }
  };


  const handleCancel = async () => {
    try {
      setIsCanceled(true);
  
      const cancelStatusUpdate = await axios.put(`http://localhost:3000/api/orders/${order?.id}`, {
        delivery: "CANCELLED", 
      });
  
      console.log({ cancelStatusUpdate });
    } catch (error: any) {
      console.error("Error updating cancellation status:", error);
    }
  };

  const totalPrice = order?.items?.reduce(
    (sum, item) => sum + Number(item.price) * Number(item?.quantity),
    0
  );
  const totalItems = order?.items?.reduce(
    (sum, item) => sum + 1 * Number(item?.quantity),
    0
  );

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
                  <p>{item?.restaurant?.name}</p>
                </div>
                {/* <button onClick={handleClick} className="pt-2">
                  {!isChecked ? <ImCheckboxUnchecked /> : <ImCheckboxChecked />}
                </button> */}
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
        <div className="flex gap-2">
          <Button
            onClick={() => handleStatus()}
            disabled={order?.delivery=="DELIVERED" || order?.delivery=="CANCELLED"}
            className="bg-[#F57213] hover:bg-[#F57213] text-white"
          >
           {deliveryStatus}
          </Button>
          {order?.delivery !== "CANCELLED" && (
          <Button onClick={() => handleCancel()} className="bg-[#0db407] hover:bg-[#0db407] text-white">
            Cancel
          </Button>
        )}
        </div>
        {/* <Button className="bg-[#F57213] hover:bg-[#F57213] text-white">
          {order?.delivery}
        </Button> */}
      </div>
    </div>
  );
};

export default OrderCard;
