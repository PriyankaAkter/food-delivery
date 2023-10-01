import React from 'react'
import { items } from '../data'
import Image from 'next/image'

const HomeCategories = () => {
    const sliceItems1 = items.slice(8,14)
  return (
    <div className='py-16'>
        <h6 className='mb-8 font-bold'>What’s on your mind?</h6>
        <div className="grid grid-cols-6 gap-[52px]">
          {sliceItems1.map((item, index) => (
            <div className=" p-8 grid gap-5" key={index}>
              <div className="w-full h-[150px] relative">
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