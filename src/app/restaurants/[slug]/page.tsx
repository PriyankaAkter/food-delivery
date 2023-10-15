'use client'
import Hero from './components/Hero'
import { useParams } from 'next/navigation'
import { items } from '@/app/components/views/data'
import AllItems from './components/AllItems'

const Page = () => {
  const params = useParams()


  const item = items.find((item:any)=> item.shop_slug==params.slug)
  console.log({item});

  const allItems = items.filter((item1:any)=>item1.shop_slug==item?.shop_slug)
  // console.log({allItems});
  
  return (
    <div>
        <Hero item={item} />
        <AllItems allItems={allItems} />
        {/* <AllItems /> */}
    </div>
  )
}

export default Page