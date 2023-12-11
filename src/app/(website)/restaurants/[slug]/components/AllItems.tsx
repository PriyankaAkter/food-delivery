import Card from '@/app/(website)/components/shared/Card'
import { ProductType, RestaurantColumnType } from '@/app/types/type';
import React from 'react'
import { IoIosArrowForward } from 'react-icons/io'


interface AllItemsProps {
  item: RestaurantColumnType;
}


const AllItems:React.FC<AllItemsProps> = ({item}) => {
  return (
    <div className="py-16 container">
      <div className="flex  justify-between items-center mb-5">
        <h5 className="mb-5 font-bold">ALL Food Items</h5>
        
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3  gap-8 rounded-[10px] ">
        {item?.foods?.map((foodItem: ProductType, index: number) => (
          <Card key={index} item={foodItem} />
        )) ?? [] }
      </div>
    </div>
  )
}

export default AllItems