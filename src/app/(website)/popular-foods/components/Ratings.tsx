import React from 'react'
import { items } from '../../components/views/data';
import { AiFillStar } from 'react-icons/ai';

const Ratings = () => {
  const uniqueRatings = new Set();

  const unique_ratings = items.filter((item) => {
    if (!uniqueRatings.has(item.rating)) {
      uniqueRatings.add(item.rating);
      return true;
    }
    return false;
  });

  // console.log({unique_ratings});
  return (
    <div 
    className="w-full py-4 px-7 h-fit"
    style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.16)" }}
  >
    <h6 className="py-4">Rating</h6>
    {unique_ratings.map((item: any) => (
      <div className="py-4 flex justify-between items-center">
        <div className="flex items-center  gap-2">
          <input className="w-4 h-4 sb" type="checkbox" />
         
          <AiFillStar className="text-[#F3AB24] w-4 h-4" />
        </div>
        <h6>{item.rating}</h6>
      </div>
    ))}
  </div>
  )
}

export default Ratings