import Image from "next/image";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { ProductType } from "@/app/types/type";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "@/app/redux_store/cartAddSlice";
import { RootState } from "@/app/redux_store/store";
import { useState } from "react";

interface CardProps {
  item: ProductType;
}

const Card: React.FC<CardProps> = ({ item }) => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state: RootState) => state.cart.products);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleAddToCart = () => {
    // Implement your custom confirmation modal here
    if (cartProducts.length === 0) {
      dispatch(addCart(item));
    } else if (
      cartProducts[0]?.restaurant?.id !== item.restaurant?.id
    ) {
      setShowConfirmation(true);
    } else {
      dispatch(addCart(item));
    }
  };

  const handleConfirmAddToCart = () => {
    dispatch(addCart(item));
    setShowConfirmation(false);
  };

  const handleCancelAddToCart = () => {
    setShowConfirmation(false);
    // You can add additional logic here if needed when the user cancels
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
        <div className="flex justify-between items-center">
          {/* ... (rest of the content) */}
        </div>
        <h6 className="mt-4">{item?.restaurant?.name}</h6>
        <h6 className="text-[#FFB93E] text-[28px] font-medium mt-5">
          {item?.price}.00 tk
        </h6>

        <button
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
