
import { SideBar } from "../components/shared/SideBar";
import OrderHistory from "./components/OrderHistory";

export function Page() {
  return (
    <div className='flex' >
        <SideBar />
        <div className='p-20'>

        <OrderHistory  />
        </div>
    </div>
  );
}

export default Page;
