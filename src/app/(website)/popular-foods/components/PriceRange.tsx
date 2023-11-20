'use client'
import {useState} from 'react'
const PriceRange = () => {
    const [data,setData] = useState(50)
  return (
    <div className='w-full h-fit py-4 px-7' style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.16)" }}>
        <h6 className='py-4'>Price Range</h6>
        
        <div className='border-t py-7'>
          <input className='w-full h-3  rounded-lg appearance-[#E2E8F0]' type="range" min="50" max="1000"   step="50"  onChange={(e:any)=>setData(e.target.value)} />
          <div className='flex justify-between items-center mt-6'>
            <span className='border rounded-[4px] py-3 px-4 border-gray-500'>{data}</span>
            <span className='border rounded-[4px] py-3 px-4 border-gray-500'>1000</span>
          </div>
        </div>
    </div>
  )
}

export default PriceRange