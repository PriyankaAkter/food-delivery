import Card from '@/app/components/shared/Card'
import React from 'react'
import { IoIosArrowForward } from 'react-icons/io'

const AllItems = ({allItems}:any) => {
  return (
    <div className="py-16 container">
      <div className="flex  justify-between items-center mb-5">
        <h5 className="mb-5 font-bold">ALL Food Items</h5>
        
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 rounded-[10px] ">
        {allItems.map((item:any, index:number) => (
          <Card key={index} item={item} />
        ))}
      </div>
    </div>
  )
}

export default AllItems