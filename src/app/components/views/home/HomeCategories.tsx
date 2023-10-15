import React from 'react'
import { items } from '../data'
import Image from 'next/image'

const HomeCategories = () => {
    const sliceItems1 = items.slice(8,14)
  return (
    <div className='py-16 container'>
        <h5 className='mb-8 font-bold'>Our Categories</h5>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 lg:gap-8 2xl:gap-[52px]">
          {sliceItems1.map((item, index) => (
            <div className="p-4 2xl:p-8 grid gap-5 place-items-center" key={index}>
              <div className="w-full h-[150px] lg:h-[180px] xl:w-[150px] xl:h-[150px] relative">
                <Image src={item.img} alt="Food" fill />
              </div>
              <h6 className="font-bold text-center">{item.name}</h6>
              
            </div>
          ))}
        </div>
    </div>
  )
}

export default HomeCategories