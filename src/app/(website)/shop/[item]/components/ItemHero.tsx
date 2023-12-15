import Image from "next/image";
import { ImSpoonKnife } from "react-icons/im";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { addCart } from "@/app/redux_store/cartAddSlice";
import { ProductType, ReviewType } from "@/app/types/type";
import { useAppDispatch, useAppSelector } from "@/app/redux_store/store";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Reviews from "./Reviews";
import StarRating from "@/app/(website)/user/components/order-history/StarRating";

interface ItemHeroCards {
  item: ProductType;
}

const ItemHero: React.FC<ItemHeroCards> = ({ item }) => {
  const products = {
    id: item?.id,
    name: item?.name,
    image: item?.image,
    slug: item?.slug,
    price: item?.price,
    stock: item?.stock,
    quantity: item?.quantity,
    categoryId: item?.categoryId,
    description: item?.description,
    RestaurantId: item?.RestaurantId,
  };
  const { data: reviewData } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const reviews = await axios.get(`http://localhost:3000/api/reviews`);
      return reviews.data;
    },
  });

  console.log({ reviewData });
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.products);
  return (
    <div className="py-24  max-w-[1200px] mx-auto">
      <div className="flex  gap-20 items-center ">
        <div>
          <div className="w-[500px] h-[415px] relative">
            <Image
              src={item?.image || ""}
              alt="Food"
              fill
              className="object-cover"
            />
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
          </div>
          <div className="">
            <div>
              <button
                onClick={() => dispatch(addCart(products))}
                className="bg-[#F29F05] text-white flex items-center gap-2 py-4 px-8 rounded-md"
              >
                <AiOutlineShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      {
        reviewData?.reviews && reviewData.reviews.some(
          (review: ReviewType) => review?.productId === item?.id
        ) ? (<div className="">
        <h5 className="my-16">All Reviews</h5>
        <div className="grid gap-10">
        {reviewData?.reviews?.map(
          (review: ReviewType, index: number) =>
            review?.productId === item?.id && (
              <div key={index} className="">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 relative">
                    <Image
                      src={review?.user?.image || ""}
                      alt="Profile"
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                  <h6>{review?.user?.name}</h6>
                </div>
                 
                 <StarRating value={review?.rating} onChange={() => {}} />
                <p>{new Date(review?.createdAt)?.toLocaleString()}</p>
               
               
                <h6>{review?.comment}</h6>
                
              </div>
            )
        )}
        </div>
        
      </div>) : (<div></div>)
      }
      
    </div>
  );
};

export default ItemHero;
