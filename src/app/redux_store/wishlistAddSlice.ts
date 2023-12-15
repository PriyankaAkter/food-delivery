import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductType } from "../types/type";

export interface wishlistState {
  products: ProductType[]; // Assuming ProductType is imported or defined somewhere
  
}

const initialState: wishlistState = {
  products: [],
  
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addWishlist: (state, action: PayloadAction<ProductType>) => {
      const isExist = state.products.find(
        (product) => product.id === action.payload.id
      );
      if (!isExist) {
        state.products.push(action.payload);
        if (!localStorage.getItem("wishlist")) {
          localStorage.setItem("wishlist", JSON.stringify([action.payload]));
        } else {
          localStorage.setItem("wishlist", JSON.stringify(state.products));
        }
      }
    },

    
    clearCart: (state) => {
      state.products = [];
      localStorage.removeItem("wishlist");
    },
    removeWishist: (state, action) => {
      const findId = state.products.findIndex(
        (product) => product.id === action.payload
      );
      if (findId !== -1) {
        state.products.splice(findId, 1);
        localStorage.setItem("wishlist", JSON.stringify(state.products));
      }
    },

   
    
  },
});

export const {
    addWishlist,
    removeWishist,
  clearCart,

} = wishlistSlice.actions;
export default wishlistSlice.reducer;
