import { items } from "../data";
import Image from "next/image";
import { AiFillStar } from "react-icons/ai";
import { PiCookingPotFill } from "react-icons/pi";
import { BsPeopleFill } from "react-icons/bs";

const HomePersonalRecommendations = () => {
    const sliceItems1 = items.slice(14)
  return (
    <div className='py-16'>
        <h6 className="mb-8">Personalized recommendations</h6>
        <div className="grid grid-cols-4 gap-24 rounded-[10px] ">
          {sliceItems1.map((item, index) => (
            <div className="bg-[#F8F8F8] p-8 grid gap-5" key={index}>
              <div className="w-full h-[256px] relative">
                <Image src={item.img} alt="Food" fill />
              </div>
              <h6 className="font-bold">{item.name}</h6>
              <div className="flex justify-between items-center">
                <p className="font-bold">{item.shop}</p>
                <div className="flex items-center gap-2 justify-center">
                  <AiFillStar className="w-5 h-5 text-[#1AC84B]" />
                  <p className="font-bold">{item.rating}</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <PiCookingPotFill className="w-5 h-4 text-[#FC8019]" />
                  <h6>{item.time}</h6>
                </div>
                <div className="flex items-center gap-1">
                  <BsPeopleFill className="w-5 h-4 text-[#FC8019]" />
                  <h6>{item.price} tk</h6>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
  )
}

export default HomePersonalRecommendations