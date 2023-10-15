import Image from "next/image";
import { ImSpoonKnife } from "react-icons/im";
import { AiFillHeart, AiFillStar } from "react-icons/ai";
import ButtonOne from "@/app/components/shared/ButtonOne";

const ItemHero = ({item}:any) => {
  console.log({item});
  
  return (
    <div className="grid grid-cols-2 py-24 container">
      <div>
        <div className="w-[627px] h-[600px] relative">
          <Image src={item?.img} alt="Food" fill />
        </div>
      </div>
      <div className="grid gap-3">
        <div className="grid gap-2">
          <h2>{item?.name}</h2>
          <div className="flex items-center gap-2">
            <ImSpoonKnife className="w-5 h-5 text-black" />
            <h6 className="font-bold">{item?.shop}</h6>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur. Morbi fames ultricies sit
            nam. Pellentesque fringilla eleifend sit accumsan mi. Posuere
            facilisis aliquam arcu sed.
          </p>
          <div className="bg-[#FFECDF] px-6 w-fit rounded-md flex justify-center items-center
          ">
            <p>In Stock</p>
          </div>
          <h3>{item?.price} tk</h3>
        </div>
        <div className="grid gap-2">
          <div className="flex items-center gap-2 justify-start">
            {[1, 2, 3, 4, 5].map((item: any, index: number) => (
              <AiFillStar key={index} className="w-5 h-5 text-[#FFB93E]" />
            ))}
          </div>

          <div className="flex gap-8">
            <ButtonOne
              href="/cart"
              title="Add to Cart"
              className="text-[#FC8019]  border border-[#FC8019]"
            />
            <ButtonOne
              href="/cart"
              title="Buy Now"
              className="bg-[#FC8019]  text-white"
            />
          </div>
          <div className="flex gap-5 items-center justify-between">
            <h6>Our Ingradients:</h6>
            <p>
              Organic Flavour, Othentic Spices,Fresh Vegetable, Fresh Puffed
              Rice, Salt, Soy Sauce, Mutton, Capsycum, Sugar.{" "}
            </p>
          </div>
          {/* <ButtonOne
            href="/"
            title="Add to Wishlist"
            className="border border-black bg-inherit  text-black w-[288px]"
          /> */}
          <div className="border border-black bg-inherit rounded-md text-xl font-medium  text-black w-[288px] flex items-center justify-center gap-2"><AiFillHeart /><span>Add to Wishlist</span></div>
        </div>
      </div>
    </div>
  );
};

export default ItemHero;
