import React from "react";
import { RxBarChart } from "react-icons/rx";
import QuickDeals from "../../home/components/QuickDeals";
import { OrderType } from "@/app/types/type";
interface OrderDetailsProps {
    order: OrderType;
  }
  const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
    const totalPriceSum = Object.values(order)
    .filter((singleOrder: any) => singleOrder.delivery === "DELIVERED")
    .reduce((sum: number, singleOrder: any) => {
      return sum + parseFloat(singleOrder.price || 0);
    }, 0);
  

  // Filter orders with delivery status "DELIVERED"
  const deliveredOrders = Object.values(order).filter(
    (singleOrder: any) => singleOrder?.delivery === "DELIVERED"
  );


  // Filter orders with delivery status "PENDING"
  const pendingOrders = Object.values(order).filter(
    (singleOrder: any) => singleOrder?.delivery === "PENDING"
  );

  // Filter orders with delivery status "CANCELLED"
  const cancleOrders = Object.values(order).filter(
    (singleOrder: any) => singleOrder?.delivery === "CANCELLED"
  );

    return (
      <div className="">
        
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="text-white bg-gradient-to-r from-[#D93BC1] to-[#F9CB1F] rounded-[10px] grid gap-8 bg-blue-600 py-6 px-3 ">
              <h6>Total Earning</h6>
              <div className="flex justify-between items-center">
                <h6>{totalPriceSum} tk</h6>
                <RxBarChart />
              </div>
            </div>
            <div className="text-white bg-gradient-to-r from-[#54C165] to-[#9ED969] rounded-[10px] grid gap-8 bg-blue-600 py-6 px-3 ">
              <h6>Total Orders Completed</h6>
              <div className="flex justify-between items-center">
                <h6>{deliveredOrders?.length}</h6>
                <RxBarChart />
              </div>
            </div>
            <div className="text-white bg-gradient-to-r from-[#D93BC1] to-[#F9CB1F] rounded-[10px] grid gap-8 bg-blue-600 py-6 px-3 ">
              <h6>Total Pending Orders</h6>
              <div className="flex justify-between items-center">
                <h6>{pendingOrders?.length}</h6>
                <RxBarChart />
              </div>
            </div>
            <div className="text-white bg-gradient-to-r from-[#54C165] to-[#9ED969] rounded-[10px] grid gap-8 bg-blue-600 py-6 px-3 ">
              <h6>Total Cancle Orders</h6>
              <div className="flex justify-between items-center">
                <h6>{cancleOrders?.length}</h6>
                <RxBarChart />
              </div>
            </div>
          </div>
        </div>
      
    );
  };
  

export default OrderDetails;
