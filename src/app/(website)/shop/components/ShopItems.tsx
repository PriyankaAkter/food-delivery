import Card from '@/app/(website)/components/shared/Card'
import { items } from '@/app/(website)/components/views/data'
import React from 'react'
import { IoIosArrowForward } from 'react-icons/io'

const ShopItems = () => {
    const sliceItems1 = items.slice(0)
    return (
      <div className="py-16 container">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 rounded-[10px] ">
          {sliceItems1.map((item, index) => (
            <Card key={index} item={item} />
          ))}
        </div>
      </div>
  )
}

export default ShopItems