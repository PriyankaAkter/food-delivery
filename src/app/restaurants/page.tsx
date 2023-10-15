import React from 'react'
import RestaurantHome from './components/RestaurantHome'
// import RestaurantHome from './components/RestaurantHome'

const Page = () => {
  return (
    <div>
      <div className='w-screen h-[300px] bg-black flex justify-center items-center'>
        <h1 className='text-white'>RESTAURANTS</h1>
    </div>
        <RestaurantHome />
    </div>
  )
}

export default Page