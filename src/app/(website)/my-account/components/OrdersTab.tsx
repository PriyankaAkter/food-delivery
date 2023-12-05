import BasicTable from '@/app/(admin)/dashboard/components/shared/BasicTable'
import { customerOrders, orderHistoryData } from '@/app/(admin)/dashboard/components/shared/data'


import React from 'react'
import { columns } from './columns'
import BasicTable1 from '@/app/(admin)/dashboard/components/shared/BasicTable1'

const OrdersTab = () => {
  return (
    <div className='border rounded-md p-8'>
        <h5 className='border-b py-4'>My Orders</h5>
        <BasicTable1 data={customerOrders} columns={columns} />
    </div>
  )
}

export default OrdersTab