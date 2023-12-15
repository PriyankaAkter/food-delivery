'use client'
import React from 'react'
import ItemHero from './components/ItemHero'
import RelatedItems from './components/RelatedItems'
import { useParams } from 'next/navigation'
import { items } from '@/app/(website)/components/views/data'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { ProductType, RestaurantColumnType } from '@/app/types/type'

const Page = () => {
  const params = useParams();
  const foodSlug = params.item;

  //single product fetch
  const { data} = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const product = await axios.get(
        `http://localhost:3000/api/allproducts`
      );
      return product.data;
    },
  });
  // console.log({data});




  const item = data?.products?.find((items:ProductType)=> items?.slug==foodSlug)
  // console.log({item});

  

  return (
    <div>
        <ItemHero item={item} />
        {/* <RelatedItems relatedItems={relatedItems} /> */}
    </div>
  )
}

export default Page;
