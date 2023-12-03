'use client'
import axios from 'axios';
import OrderCard from './OrderCard'
import { useQuery } from '@tanstack/react-query';
import { OrderType } from '@/app/types/type';

const Dashboard = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
          const ordersData = await axios.get(
            `http://localhost:3000/api/orders`
          );
          return ordersData.data;
        },
      });
    
      if (isLoading) {
        return <h6>Loading...</h6>;
      }
      if (error) return "An error has occurred: " + error.message;
    
      // console.log({data});
  return (
    <div className=" py-20 pl-10 w-[1500px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8">
       {
        data?.orders?.map((order:OrderType,index:number)=>(

            <OrderCard order={order} />
        ))
       }
        {/* <OrderCard /> */}

        </div>
        {/* <OrderCard /> */}
        {/* <OrderCard /> */}
      </div>
  )
}

export default Dashboard