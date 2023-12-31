"use client";

import { OrderType, ProductType } from "@/app/types/type";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";
interface OrderProps {
  order: OrderType;
}

const OrderCard: React.FC<OrderProps> = ({ order }) => {
  const componentRef = useRef(null);
  const queryClient = useQueryClient();
  const [selectedDeliveryMan, setSelectedDeliveryMan] = useState("");
  const [deliveryStatus, setDeliveryStatus] = useState(
    order?.delivery || "PENDING"
  );
  const [isCanceled, setIsCanceled] = useState(false);
  const {
    data: deliveryMan,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const userData = await axios.get(`http://localhost:3000/api/user`);
      return userData.data;
    },
  });
  // print invoice
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  if (isLoading) {
    return <h6>Loading...</h6>;
  }
  if (error) return "An error has occurred: " + error.message;

  // console.log({ deliveryMan });

  const handleStatus = async () => {
    try {
      if (isCanceled) {
        return alert("Order is canceled. Cannot change status.");
      }
      let newStatus;
      switch (deliveryStatus) {
        case "PENDING":
          newStatus = "PROCESSING";
          break;
        case "PROCESSING":
          newStatus = "READY_FOR_DELIVERY";
          break;

        case "READY_FOR_DELIVERY":
          newStatus = "DELIVERED";
          break;
        default:
          newStatus = "PENDING";
      }

      const updateStatus = await axios.put(
        `http://localhost:3000/api/orders/${order?.id}`,
        {
          delivery: newStatus,
        }
      );

      setDeliveryStatus(newStatus);

      console.log({ updateStatus });
    } catch (error: any) {
      console.error("Error updating order status:", error);
    }
  };

  const handleCancel = async () => {
    try {
      setIsCanceled(true);

      const cancelStatusUpdate = await axios.put(
        `http://localhost:3000/api/orders/${order?.id}`,
        {
          delivery: "CANCELLED",
        }
      );

      console.log({ cancelStatusUpdate });
    } catch (error: any) {
      console.error("Error updating cancellation status:", error);
    }
  };

  const handleAssign = async () => {
    try {
      const updateOrder = await axios.put(
        `http://localhost:3000/api/orders/${order?.id}`,
        {
          deliveryBoy: selectedDeliveryMan,
        }
      );
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Delivery Boy assigned successfully");
      console.log({ updateOrder });

      setSelectedDeliveryMan("");
    } catch (error: any) {
      toast.error("Error Occur!");
      console.error("Error assigning delivery man:", error);
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
  const deliveryCost = Number(totalPrice) + 60;

  return (
    <div className="w-full  border border-[#E9EFF6] h-auto  rounded-[10px] p-10 print">
      <div ref={componentRef}>
        <div>
          <h6>Order #{order?.id}</h6>
          <p>{new Date(order?.createdAt)?.toLocaleString()}</p>
        </div>
        <hr />
        <div>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-base">
                Client Details
              </AccordionTrigger>
              <AccordionContent>
                <p>Name: {order?.user?.name}</p>
                <p>Phone: {order?.user?.phone}</p>
                <p>Address: {order?.user?.address}</p>
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
            <p className="font-medium">Total: {deliveryCost} tk</p>
            <p className="font-medium">Status: {deliveryStatus}</p>
            <p className="font-medium">
              Delivery Boy name: {order?.deliveryBoy}
            </p>
            {/* {
              order?.deliveryBoy ? (<p className="font-medium">Delivery Boy name: {order?.deliveryBoy}</p>) : (<p className="font-medium">Delivery Boy name: Not Assigned yet!</p>)
            }
             */}
            {/* 
            <p className="font-medium">Delivery Boy phone: {order?.deliveryBoyPhone}</p> */}
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button
              onClick={() => handleStatus()}
              disabled={
                order?.delivery == "DELIVERED" || order?.delivery == "CANCELLED"
              }
              className="bg-[#F57213] hover:bg-[#F57213] text-white"
            >
              {deliveryStatus}
            </Button>
            {order?.delivery !== "DELIVERED" &&
              order?.delivery !== "CANCELLED" && (
                <Button
                  onClick={() => handleCancel()}
                  className="bg-[#0db407] hover:bg-[#0db407] text-white"
                >
                  Cancel
                </Button>
              )}
          </div>
          <Button
            onClick={handlePrint}
            className="bg-[#F57213] hover:bg-[#F57213] text-white"
          >
            Invoice Print
          </Button>
        </div>
        {
          order?.delivery !== "DELIVERED" && <div className="flex gap-2 items-center mt-6">
          <select
            name="show"
            id="show"
            className="border border-[#94A3B8] py-2 px-4 w-full rounded-md"
            value={selectedDeliveryMan}
            onChange={(e) => setSelectedDeliveryMan(e.target.value)}
          >
            <option value="" disabled>
              Select delivery Man
            </option>
            {deliveryMan?.users
              ?.filter((d: any) => d?.role === "DELIVERY_MAN")
              .map((d: any, index: number) => (
                <option key={index} value={d?.name}>
                  {d?.name}
                </option>
              ))}
          </select>
          <Button
            onClick={handleAssign}
            className="bg-[#F57213] hover:bg-[#F57213] text-white"
          >
            Assign
          </Button>
        </div>
        }
        
      </div>
    </div>
  );
};

export default OrderCard;
