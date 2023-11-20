import { Button } from "@/components/ui/button";

const QuickDeals = () => {
  return (
    <div
      className="px-9 py-4 w-[628px]"
      style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.16)" }}
    >
      <h6>Quick Deals</h6>
      <div>
        <div className="grid grid-cols-3 gap-4 place-items-center justify-items-start border-b-[1px] px-5 py-3">
          <p className="font-medium">38 New Customers</p>
          <p>Last 24 Hours</p>
          <Button className="bg-[#FDF7F2] text-[#F8A366]">Check</Button>
        </div>
        <div className="grid grid-cols-3 gap-4 place-items-center justify-items-start border-b-[1px] px-5 py-3">
          <p className="font-medium">13 Orders</p>
          <p>Awaiting Process</p>
          <Button className="bg-[#FDF7F2] text-[#F8A366]">Check</Button>
        </div>
        <div className="grid grid-cols-3 gap-4 place-items-center justify-items-start border-b-[1px] px-5 py-3">
          <p className="font-medium">11 Orders</p>
          <p>On Hold</p>
          <Button className="bg-[#FDF7F2] text-[#F8A366]">Check</Button>
        </div>
        <div className="grid grid-cols-3 gap-4 place-items-center justify-items-start border-b-[1px] px-5 py-3">
          <p className="font-medium">24 Orders</p>
          <p>Low In Stock</p>
          <Button className="bg-[#FDF7F2] text-[#F8A366]">Check</Button>
        </div>
        <div className="grid grid-cols-3 gap-4 place-items-center justify-items-start border-b-[1px] px-5 py-3">
          <p className="font-medium">22 Items</p>
          <p>Out of Stock</p>
          <Button className="bg-[#FDF7F2] text-[#F8A366]">Check</Button>
        </div>
      </div>
    </div>
  );
};

export default QuickDeals;
