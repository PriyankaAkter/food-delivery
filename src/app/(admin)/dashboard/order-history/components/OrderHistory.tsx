import React from 'react'
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'
import BasicTable from '../../components/shared/BasicTable'
import { orderHistoryData } from '../../components/shared/data'
import { columns } from './columns'

const OrderHistory = () => {
  return (
    
      <div
        className="rounded-[10px] w-[1460px] mx-auto"
        style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.16)" }}
      >
        <div className="flex justify-between items-center py-8 px-6">
          <h6>All Orders</h6>
        </div>
        <hr className="pb-10" />
        <BasicTable data={orderHistoryData} columns={columns} />
        <div className="py-10">
          <hr />
          <div className="flex justify-between items-center px-6 pt-5">
            <h6>Rows Per Page 10</h6>
            <div className="flex items-center gap-4">
              <GrFormPrevious className="w-6 h-6 text-black" />
              <h6>1</h6>
              <h6>2</h6>
              <GrFormNext className="w-6 h-6 text-black" />
            </div>
          </div>
        </div>
      </div>
    
  )
}

export default OrderHistory