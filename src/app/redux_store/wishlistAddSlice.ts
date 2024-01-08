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
      // const newProduct = action.payload;
      const isExist = state.products.find(
        (product) => product.id === action.payload.id
      );
      
      if (!isExist) {
        state.products.push(action.payload);
      } else {
        // Update the existing product's properties if needed
        // For now, just log a message
        console.log('Product already exists in the wishlist. You might want to update its properties.');
      }
    
      // Update local storage with the complete wishlist array
      localStorage.setItem("wishlist", JSON.stringify(state.products));
    },
   
    // removeWishlist: (state, action: PayloadAction<number>) => {
    //   const findId = state.products.findIndex(
    //     (product) => product.id === action.payload
    //   );
    //   if (findId !== -1) {
    //     state.products.splice(findId, 1);
    //     localStorage.setItem("wishlist", JSON.stringify(state.products));
    //   }
    // },

    
   
    removeWishist: (state, action) => {
      const findId = state.products.findIndex(
        (product) => product.id === action.payload
      );
      if (findId !== -1) {
        state.products.splice(findId, 1);
        localStorage.setItem("wishlist", JSON.stringify(state.products));
      }
    },
    clearWishlist: (state) => {
      state.products = [];
      localStorage.removeItem("wishlist");
    },
   
    
  },
});

export const {
    addWishlist,
    removeWishist,
    clearWishlist,

} = wishlistSlice.actions;
export default wishlistSlice.reducer;
