import { items } from "../data";
import Image from "next/image";
import { AiFillStar } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { AiFillHeart,AiFillClockCircle } from "react-icons/ai";
import ButtonOne from "../../shared/ButtonOne";

const HomeNearbyRes = () => {
  const sliceItems1 = items.slice(0, 4);
  // console.log({sliceItems1});
  
  return (
    <div className="py-16 container" >
      <div className="flex  justify-between items-center mb-5">
        <h5 className="mb-5 font-bold">Nearby Restaurants</h5>
        <div className="text-[#FC8019] flex gap-2  items-center">
          <p className="font-bold">See More</p>
          <IoIosArrowForward className="w-5 h-5" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 rounded-[10px]" >
        {sliceItems1.map((item, index) => (
          <div className="bg-white p-5 grid gap-3 rounded-md" key={index} style={{boxShadow:'0px 4px 20px 0px rgba(0, 0, 0, 0.16)'}}>
            
            <div className="w-full h-[256px] relative">
              <Image src={item.shopImg} alt="Res" fill objectFit="cover" />
            </div>
            <h6 className="font-bold">{item.shop}</h6>

            <div className="flex items-center gap-2 justify-start">
              <AiFillStar className="w-5 h-5 text-[#FFB93E]" />

              <p className="font-bold">5.0</p>
            </div>
            <div className="flex items-center gap-2 justify-start">
              <AiFillClockCircle className="w-5 h-5  text-gray-400" />

              <p className="font-bold text-gray-400">1hr 20min</p>
            </div>
            

            <ButtonOne
              href={`/restaurants/${item.shop_slug}`}
              title="Visit"
              className="text-white py-3 bg-[#FC8019] w-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeNearbyRes;
