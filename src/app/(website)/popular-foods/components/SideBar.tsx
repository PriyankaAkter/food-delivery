import React from 'react'
import PriceRange from './PriceRange'
import FoodsMenu from './FoodsMenu'
import Ratings from './Ratings'


const SideBar = () => {
  return (
    <div className='w-[460px] grid gap-10 h-fit mb-10'>
        {/* <PriceRange /> */}
        <FoodsMenu />
        {/* <Ratings /> */}
    </div>
  )
}

export default SideBar