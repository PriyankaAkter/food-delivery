import ButtonOne from '@/app/components/shared/ButtonOne'
import { items } from '@/app/components/views/data'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { AiFillClockCircle, AiFillStar } from 'react-icons/ai'
import { IoIosArrowForward } from 'react-icons/io'

const RestaurantHome = () => {
    const uniqueObjects = Array.from(new Set(items.map(obj => obj.shop)))
  .map(shop => items.find(obj => obj.shop === shop));

// console.log(uniqueObjects);
//     const sliceItems1 = uniqueObjects.slice(0, 4);
  return (
    <div className="py-16 container" >
    <div className="flex  justify-between items-center mb-5">
      <h5 className="mb-5 font-bold">Nearby Restaurants</h5>
      
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 rounded-[10px]" >
      {uniqueObjects.map((item:any, index:any) => (
        <div className="bg-white p-5 grid gap-3 rounded-md" key={index} style={{boxShadow:'0px 4px 20px 0px rgba(0, 0, 0, 0.16)'}}>
          
          <div className="w-full h-[256px] relative">
            <Image src={item.shopImg} alt="Res" fill objectFit="cover" />
          </div>
          <Link href={`/restaurants/${item.shop_slug}`} className="font-bold">{item.shop}</Link>

          <div className="flex items-center gap-2 justify-start">
            <AiFillStar className="w-5 h-5 text-[#FFB93E]" />

            <p className="font-bold">5.0</p>
          </div>
          <div className="flex items-center gap-2 justify-start">
            <AiFillClockCircle className="w-5 h-5  text-gray-400" />

            <p className="font-bold text-gray-400">1hr 20min</p>
          </div>
          

          <ButtonOne
            href="/shop"
            title="Visit"
            className="text-white py-3 bg-[#FC8019] w-full"
          />
        </div>
      ))}
    </div>
  </div>
  )
}

export default RestaurantHome