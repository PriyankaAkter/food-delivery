import React from 'react'
import { SideBar } from './components/SideBar'
import Settings from './components/settings/Settings'
import OrderHistory from './components/order-history/OrderHistory'

const page = () => {
  return (
    <div className='container flex gap-16 py-16'>
      <SideBar />
      {/* <OrderHistory /> */}
      {/* <Settings /> */}
    </div>
  )
}

export default page