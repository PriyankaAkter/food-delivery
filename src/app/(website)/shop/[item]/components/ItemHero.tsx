import Image from "next/image";
import { ImSpoonKnife } from "react-icons/im";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { addCart } from "@/app/redux_store/cartAddSlice";
import { ProductType, ReviewType } from "@/app/types/type";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "@/app/redux_store/store";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Reviews from "./Reviews";
import StarRating from "@/app/(website)/user/components/order-history/StarRating";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

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
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const cartProducts = useSelector((state: RootState) => state.cart.products);
  const isExistCart = cartProducts.find((c) => item?.id === c?.id);
  const wishList = useSelector((state: RootState) => state.wishlist.products);
  const isExist = wishList.find((w) => item?.id === w?.id);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const router = useRouter();

  const handleAddToCart = () => {
    if (!session?.user) {
      router.push("/sign-in");
    } else {
      if (cartProducts.length === 0) {
        dispatch(addCart(item));
        toast.success("Product added successfully");
      } else if (cartProducts[0]?.restaurant?.id !== item.restaurant?.id) {
        setShowConfirmation(true);
      } else {
        dispatch(addCart(item));
        toast.success("Product added successfully");
      }
    }
  };

  const handleConfirmAddToCart = () => {
    dispatch(addCart(item));
    setShowConfirmation(false);
  };

  const handleCancelAddToCart = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="py-24 container xl:max-w-[1200px] mx-auto ">
      <div className="flex flex-col lg:flex-row gap-10 xl:gap-20 lg:items-center ">
        <div>
          <div className="w-full h-[250px] sm:w-[500px] sm:h-[415px] relative">
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
            {/* <p>{item?.stock}</p> */}
          </div>
          <div className="">
            <div>
              <button
                disabled={isExistCart || item?.stock === 0} 
                onClick={handleAddToCart}
                className={`${
                  item?.stock === 0
                    ? "bg-[#F29F05] cursor-not-allowed"
                    : "bg-[#F29F05]"
                } py-3 rounded-[4px] mt-7 text-white flex items-center gap-3 w-fit px-20 justify-center`}
              >
                <AiOutlineShoppingCart className="w-[22px] h-[22px] text-white" />
                {item?.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </button>
            </div>
            {showConfirmation && (
          <div className="custom-modal">
            <p>
              Adding a product from a different restaurant will replace your
              existing cart. Do you want to proceed?
            </p>
            <button onClick={handleConfirmAddToCart}>Yes</button>
            <button onClick={handleCancelAddToCart}>No</button>
          </div>
        )}
          </div>
        </div>
      </div>
      {reviewData?.reviews &&
      reviewData.reviews.some(
        (review: ReviewType) => review?.productId === item?.id
      ) ? (
        <div className="">
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
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default ItemHero;
