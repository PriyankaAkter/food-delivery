import Image from "next/image";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { ProductType } from "@/app/types/type";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "@/app/redux_store/cartAddSlice";
import { RootState } from "@/app/redux_store/store";
import { useState } from "react";
import Link from "next/link";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { addWishlist } from "@/app/redux_store/wishlistAddSlice";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface CardProps {
  item: ProductType;
}

const Card: React.FC<CardProps> = ({ item }) => {
  const dispatch = useDispatch();
  const {data: session} = useSession()
  const cartProducts = useSelector((state: RootState) => state.cart.products);
  const isExistCart = cartProducts.find((c) => item?.id === c?.id);
  const wishList = useSelector((state: RootState) => state.wishlist.products);
  const isExist = wishList.find((w) => item?.id === w?.id);
  const [showConfirmation, setShowConfirmation] = useState(false);
 const router = useRouter()

  const handleAddToCart = () => {
    // Check if the user is logged in
    if (!session?.user) {
      // Redirect to the sign-in page
      router.push('/sign-in'); // Replace '/signin' with your actual sign-in page route
    } else {
      // Continue with the existing logic if the user is logged in
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
    <div
      style={{ boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.16)" }}
      className="w-full bg-white pb-7 grid gap-3 relative rounded-md"
    >
      <div className="w-full h-[254px] relative">
        <Image
          src={item?.image || ""}
          alt="Food"
          fill
          objectFit="cover"
          className="rounded-t-md"
        />
      </div>
      <div className="px-5">
        <div className="flex justify-between items-center ">
          <Link href={`/shop/${item?.slug}`} className="text-xl font-semibold">
            {item?.name}
          </Link>
          <button
            disabled={isExist}
            className="text-lg"
            onClick={() => {
              try {
                dispatch(addWishlist(item));
                toast.success("Wishlist added successfully");
              } catch (error) {
                toast.error("Error Occur!");
              }
            }}
          >
            
            {session?.user ? !isExist ? (
              <FaRegHeart className="w-7 h-7 text-[#F29F05]" />
            ) : (
              <FaHeart className="w-7 h-7 text-[#F29F05]" />
            ):""}
          </button>
        </div>
        <p>{item?.description}</p>
        
        <h6 className="text-[#FFB93E] text-[28px] font-medium mt-5">
          {item?.price}.00 tk
        </h6>
   
        <button
          disabled={isExistCart}
          onClick={handleAddToCart}
          className="bg-[#F29F05] py-3 rounded-[4px] mt-7 text-white flex items-center gap-3 w-full justify-center"
        >
          <AiOutlineShoppingCart className="w-[22px] h-[22px] text-white" />
          Add to Cart
        </button>

        {/* Custom Confirmation Modal */}
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
  );
};

export default Card;
