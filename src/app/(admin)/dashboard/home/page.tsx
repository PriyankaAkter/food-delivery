"use client";
import { LineChartInteractiveExample } from "./components/LineChat";
import { DonutChartUsageExample2 } from "./components/PieChart";
import QuickDeals from "./components/QuickDeals";
import { RxBarChart } from "react-icons/rx";
const Page = () => {
  return (
    <div className="px-10 py-4">
      <div className="flex gap-20 items-center">
        <div className="grid gap-4  ">
          <div className="text-white bg-gradient-to-r from-[#D93BC1] to-[#F9CB1F] rounded-[10px] grid gap-8 bg-blue-600 py-6 px-3 w-[343px] ">
            <h6>Total Order</h6>
            <div className="flex justify-between items-center">
              <h6>2,436</h6>
              <RxBarChart />
            </div>
          </div>
          <div className="text-white bg-gradient-to-r from-[#82A8F9] to-[#42E0F6] rounded-[10px] grid gap-8 bg-blue-600 py-6 px-3 w-[343px] ">
            <h6>Total Order</h6>
            <div className="flex justify-between items-center">
              <h6>2,436</h6>
              <RxBarChart  />
            </div>
          </div>
          <div className="text-white bg-gradient-to-r from-[#54C165] to-[#9ED969] rounded-[10px] grid gap-8 bg-blue-600 py-6 px-3 w-[343px] ">
            <h6>Total Order</h6>
            <div className="flex justify-between items-center">
              <h6>2,436</h6>
              <RxBarChart  />
            </div>
          </div>
        </div>
        <LineChartInteractiveExample />
        
      </div>
      <div className="flex gap-7 mt-12">
        <div
          className="grid grid-cols-2 place-items-center px-9 py-12 w-[711px]"
          style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.16)" }}
        >
          
            <DonutChartUsageExample2 />
         
          <div className="flex flex-col gap-8">
            <div className="grid gap-3">
              <div className="flex gap-3 items-center">
                <div className="bg-[#F43F5E] w-5 h-2 rounded-lg"></div>
                <h6>Chicken Masala</h6>
              </div>
              <h6>$9800</h6>
            </div>
            <div className="grid">
              <div className="flex gap-3 items-center">
                <div className="bg-[#EAB308] w-5 h-2 rounded-lg"></div>
                <h6>Panir Tikka</h6>
              </div>
              <h6>$1398</h6>
            </div>
            <div className="grid">
              <div className="flex gap-3 items-center">
                <div className="bg-[#F97316] w-5 h-2 rounded-lg"></div>
                <h6>Patty Wraps</h6>
              </div>
              <h6>$1000</h6>
            </div>
          </div>
        </div>
        <QuickDeals />
      </div>
    </div>
  );
};

export default Page;
