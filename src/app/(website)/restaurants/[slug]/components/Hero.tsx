import Image from "next/image";
import { BiMap } from "react-icons/bi";
import { AiFillStar } from "react-icons/ai";
import { RiCoupon5Fill } from "react-icons/ri";
import { BsTelephoneForwardFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { RestaurantColumnType } from "@/app/types/type";


interface RestaurantCardProps {
  item: RestaurantColumnType;
}

const Hero:React.FC<RestaurantCardProps> = ({item}) => {
  return (
    <div className="w-screen bg-black xl:h-[300px]">
      <div className="container py-6 flex gap-10 items-center">
        <div className="flex flex-col md:flex-row text-white gap-8 xl:gap-20 xl:items-center">
          <div className="w-[300px] sm:w-[400px] h-[250px] relative">
            <Image src={item?.image || ""} alt="Images" fill />
          </div>
          <div className="flex flex-col xl:flex-row xl:items-center xl:gap-20 gap-5 justify-center">

          
          <div>
            <h4>{item?.name}</h4>
            <div className="flex items-center gap-2">
              <BiMap className="w-4 h-4 text-[#F29F05]" />
              <p>{item?.address}</p>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <BsTelephoneForwardFill className="w-4 h-4 text-[#F29F05]" />
              <p>{item?.phone}</p>
            </div>
            <div className="flex items-center gap-2">
              <MdEmail className="w-4 h-4 text-[#F29F05]" />
              <p>{item?.email}</p>
            </div>
          </div>

          <div>
            <p>{item?.deliveryTime}</p>
            <p>Delivery Time</p>
          </div>
          </div>
        </div>
        {/* <div className="border border-[#F29F05] rounded-lg p-4 grid gap-5">
          <h6 className="text-[#F29F05]">Offers</h6>
          <div className="flex gap-2 items-center">
            <RiCoupon5Fill className="w-4 h-4 text-[#F29F05]" />
            <p className="text-white">50% off up to 100 tk | use code TRYNEW</p>
          </div>
          <div className="flex gap-2 items-center">
            <RiCoupon5Fill className="w-4 h-4 text-[#F29F05]" />
            <p className="text-white">20% off | use code PARTY</p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Hero;
