import Image from "next/image";
import { ImSpoonKnife } from "react-icons/im";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineHeart,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShoppingCart,
} from "react-icons/ai";


const ItemHero = ({ item }: any) => {
  console.log({ item });

  return (
    <div className="grid gap-16 grid-cols-2  py-24 container">
      <div>
        <div className="w-full h-[515px] relative">
          <Image src={item?.img} alt="Food" fill className="object-cover" />
        </div>
      </div>
      <div className="grid gap-3">
        <div className="grid gap-2">
          <h3 className="font-bold ">{item?.name}</h3>
          <p>
            Prepared with slow-cooked beef leg bone marrow in a spicy & aromatic
            stew
          </p>
          <p>Baking Time: 10 - 20 min</p>
          <div className="flex items-center gap-2">
            <ImSpoonKnife className="w-5 h-5 text-black" />
            <h6 className="font-bold">{item?.shop}</h6>
          </div>

          {/* <div className="bg-[#FFECDF] px-6 w-fit rounded-md flex justify-center items-center
          ">
            <p>In Stock</p>
          </div> */}
          <h3 className="text-[#F29F05]">{item?.price} tk</h3>
        </div>
        <div className="grid gap-2">
          <div className="flex items-center gap-2 justify-start">
            <AiFillStar className="w-5 h-5 text-[#FFB93E]" />
            <span>(4.5) 25k Reviews</span>
          </div>

          <div className="flex gap-12 mt-6 mb-6">
            <div className="flex gap-7 items-center">
              <button className="border border-[#F29F05] w-fit rounded-[4px]  p-3">
                <AiOutlinePlus className="w-6 h-6 text-[#F29F05]" />
              </button>
              <h6 className="text-[#F29F05]">1</h6>
              <button className="border border-[#F29F05] w-fit rounded-[4px]  p-3">
                <AiOutlineMinus className="w-6 h-6 text-[#F29F05]" />
              </button>
            </div>
            <button className="bg-[#F29F05] w-fit rounded-[4px] text-white flex items-center gap-3 justify-center px-10">
              <AiOutlineShoppingCart className="w-[22px] h-[22px] text-white" />
              Add to Cart
            </button>
          </div>
          
          <button className="bg-inherit text-xl font-medium  text-black w-fit flex items-center justify-center gap-2">
            <AiOutlineHeart />
            <span>Add to Wishlist</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemHero;
