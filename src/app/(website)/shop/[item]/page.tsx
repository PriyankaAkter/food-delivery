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
        `http://localhost:3000/api/allproducts/${foodSlug}`
      );
      return product.data;
    },
  });
  console.log({params});
 //all products fetch
  const { data:allProducts} = useQuery({
    queryKey: ["allproducts"],
    queryFn: async () => {
      const allproducts = await axios.get(
        `http://localhost:3000/api/allproducts`
      );
      return allproducts.data;
    },
  });

  console.log({allProducts});
  

  return (
    <div>
        <ItemHero item={data?.product} />
        {/* <RelatedItems relatedItems={relatedItems} /> */}
    </div>
  )
}

export default Page;
