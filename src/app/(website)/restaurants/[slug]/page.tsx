'use client'
import Hero from './components/Hero'
import { useParams } from 'next/navigation'
import { items } from '@/app/(website)/components/views/data'
import AllItems from './components/AllItems'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { RestaurantColumnType } from '@/app/types/type'

const Page = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["restaurants"],
    queryFn: async () => {
      const restaurantData = await axios.get(
        `http://localhost:3000/api/restaurant`
      );
      return restaurantData.data;
    },
  });

console.log({data});
  const params = useParams()
  console.log({params});

  const item = data?.restaurants.find((item:RestaurantColumnType)=> item.slug==params.slug)
  console.log({item});

  // const allItems = data?.restaurants?.filter((item1:any)=>item1.slug==params.slug)
  // console.log({allItems});
  
  return (
    <div >
        <Hero item={item} />
        
        <AllItems item={item} />
        {/* <AllItems /> */}
    </div>
  )
}

export default Page