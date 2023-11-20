import BasicTable from '@/app/(admin)/dashboard/components/shared/BasicTable'
import { customerOrders, orderHistoryData } from '@/app/(admin)/dashboard/components/shared/data'


import React from 'react'
import { columns } from './columns'

const OrdersTab = () => {
  return (
    <div className='border rounded-md p-8'>
        <h5 className='border-b py-4'>My Orders</h5>
        <BasicTable data={customerOrders} columns={columns} />
    </div>
  )
}

export default OrdersTab