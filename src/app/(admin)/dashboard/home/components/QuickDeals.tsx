import { Button } from "@/components/ui/button";

const QuickDeals = () => {
  return (
    <div
      className="px-9 py-4 w-full rounded-lg"
      style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.16)" }}
    >
      <h6>Quick Deals</h6>
      <div className="grid gap-5 mt-5">
        <div className="grid grid-cols-2 gap-4 place-items-center justify-items-start border-b-[1px] px-5 py-3">
          <p className="font-medium">2 Customers</p>
          <p>New Customers</p>
        </div>
        <div className="grid grid-cols-2 gap-4 place-items-center justify-items-start border-b-[1px] px-5 py-3">
          <p className="font-medium">1 Orders</p>
          <p>Awaiting Process</p>
        </div>
        {/* <div className="grid grid-cols-2 gap-4 place-items-center justify-items-start border-b-[1px] px-5 py-3">
          <p className="font-medium">11 Orders</p>
          <p>On Hold</p>
        </div> */}
        <div className="grid grid-cols-2 gap-4 place-items-center justify-items-start border-b-[1px] px-5 py-3">
          <p className="font-medium">0 Orders</p>
          <p>Cancelled</p>
        </div>
        {/* <div className="grid grid-cols-3 gap-4 place-items-center justify-items-start border-b-[1px] px-5 py-3">
          <p className="font-medium">24 Orders</p>
          <p>Low In Stock</p>
          
        </div>
        <div className="grid grid-cols-3 gap-4 place-items-center justify-items-start border-b-[1px] px-5 py-3">
          <p className="font-medium">22 Items</p>
          <p>Out of Stock</p>
          
        </div> */}
      </div>
    </div>
  );
};

export default QuickDeals;
