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
import { useDispatch } from "react-redux";
import { addCart } from "@/app/redux_store/cartAddSlice";
import { ProductType } from "@/app/types/type";
import { useAppDispatch, useAppSelector } from "@/app/redux_store/store";


interface ItemHeroCards {
  item: ProductType
}



const ItemHero:React.FC<ItemHeroCards> = ({item} ) => {
  // console.log({ item });

  const products = {
    id: item?.id,
    name: item?.name,
    image: item?.image, 
    slug: item?.slug,
    price: item?.price,
    stock: item?.stock,
    
    categoryId: item?.categoryId,
    description: item?.description,
    RestaurantId: item?.RestaurantId
    // restaurant: RestaurantColumnType

  }

  console.log({products});
  
  // const dispatch = useDispatch();
  // const carts = useSelector((state) => state.cart.products);
  // const isExist = carts.find(cart=>item?.id===cart?.id)
  const dispatch = useAppDispatch()
  const cart = useAppSelector((state)=>state.cart.products)
  return (
    <div className="flex  gap-20 items-center py-24  max-w-[1200px] mx-auto">
      <div>
        <div className="w-[500px] h-[415px] relative">
          <Image src={item?.image || ""} alt="Food" fill className="object-cover" />
        </div>
      </div>
      <div className="grid gap-3">
        <div className="grid gap-2">
          <h3 className="font-bold ">{item?.name}</h3>
          <p>Ingredients: {item?.description}</p>
          <p>Baking Time: {item?.restaurant?.deliveryTime}</p>
          <div className="flex items-center gap-2">
            <ImSpoonKnife className="w-5 h-5 text-black" />
            <h6 className="font-bold">{item?.restaurant?.name}</h6>
          </div>

          <h3 className="text-[#F29F05]">{item?.price} tk</h3>
          <p>{item?.stock}</p>
          {/* <div
            className="bg-[#b2ffc0] px-6 py-2 w-fit rounded-md flex justify-center items-center
          "
          >
            
          </div> */}
        </div>
        <div className="">
          <div className="flex items-center gap-4 mb-6">
            <button className="border border-[#F29F05]  text-[#F29F05]rounded-[4px]  p-3">
              <AiOutlinePlus className="w-4 h-4 " />
            </button>
            <h6 className="text-[#F29F05]">{cart?.length}</h6>
            <button className="border border-[#F29F05]  rounded-[4px]  p-3">
              <AiOutlineMinus />
            </button>
          </div>
          <div>
            <button onClick={()=>dispatch(addCart(products))} className="bg-[#F29F05] text-white flex items-center gap-2 py-4 px-8 rounded-md">
              <AiOutlineShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemHero;
