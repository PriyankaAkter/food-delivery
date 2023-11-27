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
  const { data, isLoading, error } = useQuery({
    queryKey: ["restaurants"],
    queryFn: async () => {
      const restaurantData = await axios.get(
        `http://localhost:3000/api/allfoods`
      );
      return restaurantData.data;
    },
  });


  console.log({data});
  

  const params = useParams();
  const foodSlug = params.item;

  // Find the restaurant that contains the desired food item
  const restaurant = data?.restaurants.find((restaurant:RestaurantColumnType) =>
    restaurant?.foods?.some((food:ProductType) => food.slug === foodSlug)
  );

  // Find the specific food item
  const foodItem = restaurant?.foods.find((food:ProductType) => food.slug === foodSlug);


 console.log({foodItem});
 
  return (
    <div>
        <ItemHero item={foodItem} />
        {/* <RelatedItems relatedItems={relatedItems} /> */}
    </div>
  )
}

export default Page