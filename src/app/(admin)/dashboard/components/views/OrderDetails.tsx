import React from "react";
import { RxBarChart } from "react-icons/rx";
import QuickDeals from "../../home/components/QuickDeals";
import { OrderType } from "@/app/types/type";
interface OrderDetailsProps {
    order: OrderType;
  }
const OrderDetails:React.FC<OrderDetailsProps> = ({order}) => {

    console.log({order});
    const totalPriceSum = order.reduce((sum:number, order:any) => {
        return sum + parseFloat(order.price);
      }, 0);
    //   console.log({totalPriceSum });

  return (
    <div className="px-10 py-4">
      <div className="flex gap-10 ">
        <div className="grid gap-4  ">
          <div className="text-white bg-gradient-to-r from-[#D93BC1] to-[#F9CB1F] rounded-[10px] grid gap-8 bg-blue-600 py-6 px-3 w-[343px] ">
            <h6>Total Earning</h6>
            <div className="flex justify-between items-center">
              <h6>{totalPriceSum} tk</h6>
              <RxBarChart />
            </div>
          </div>
          <div className="text-white bg-gradient-to-r from-[#54C165] to-[#9ED969] rounded-[10px] grid gap-8 bg-blue-600 py-6 px-3 w-[343px] ">
            <h6>Total Orders</h6>
            <div className="flex justify-between items-center">
              <h6>{order?.length}</h6>
              <RxBarChart />
            </div>
          </div>
          <div className="text-white bg-gradient-to-r from-[#54C165] to-[#9ED969] rounded-[10px] grid gap-8 bg-blue-600 py-6 px-3 w-[343px] ">
            <h6>Total Customers</h6>
            <div className="flex justify-between items-center">
              <h6>2</h6>
              <RxBarChart />
            </div>
          </div>
        </div>

        
          <QuickDeals />
        
      </div>
    </div>
  );
};

export default OrderDetails;
