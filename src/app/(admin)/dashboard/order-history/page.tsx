
import { SideBar } from "../components/shared/SideBar";
import OrderHistory from "./components/OrderHistory";

export function Page() {
  return (
    <div className='flex' >
        <SideBar />
        <div className='py-8 px-10'>

        <OrderHistory  />
        </div>
    </div>
  );
}

export default Page;
