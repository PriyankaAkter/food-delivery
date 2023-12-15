import React from 'react'
import PriceRange from './PriceRange'
import FoodsMenu from './FoodsMenu'
import Ratings from './Ratings'


const SideBar = () => {
  return (
    <div className='w-[360px] grid gap-10 h-fit mb-10'>
        <FoodsMenu />
    </div>
  )
}

export default SideBar