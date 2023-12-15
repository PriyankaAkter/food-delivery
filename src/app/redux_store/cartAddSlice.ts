import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductType } from "../types/type";

export interface CartState {
  products: ProductType[]; // Assuming ProductType is imported or defined somewhere
  
}

const initialState: CartState = {
  products: [],
  
};

const slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // addCart: (state, action: PayloadAction<ProductType>) => {
    //   const isExist = state.products.find(
    //     (product) => product.id === action.payload.id
    //   );
    //   if (!isExist) {
    //     state.products.push(action.payload);
    //     if (!localStorage.getItem("cart")) {
    //       localStorage.setItem("cart", JSON.stringify([action.payload]));
    //     } else {
    //       localStorage.setItem("cart", JSON.stringify(state.products));
    //     }
    //   }
    // },

    addCart: (state, action: PayloadAction<ProductType>) => {
      const newProduct = action.payload;
      const existingProducts = state.products;

      if (existingProducts.length === 0) {
        const updatedProducts = [newProduct];
        state.products = updatedProducts;
        localStorage.setItem('cart', JSON.stringify(updatedProducts));
        console.log('Product added to the empty cart.');
      } else if (
        existingProducts[0]?.restaurant?.id === newProduct.restaurant?.id
      ) {
        const isProductInCart = existingProducts.some(
          (product) => product.id === newProduct.id
        );

        if (!isProductInCart) {
          const updatedProducts = [...existingProducts, newProduct];
          state.products = updatedProducts;
          localStorage.setItem('cart', JSON.stringify(updatedProducts));
          console.log('Product added to the cart.');
        } else {
          console.log('This product is already in your cart.');
        }
      } else {
        const updatedProducts = [newProduct];
        state.products = updatedProducts;
        localStorage.setItem('cart', JSON.stringify(updatedProducts));
        console.log('Product added to the cart. Existing cart replaced.');
      }
    },
    // addCart: (state, action: PayloadAction<ProductType>) => {
    //   const newProduct = action.payload;
    //   const existingProducts = state.products;
    
    //   // Check if the cart is empty or products are from the same restaurant
    //   if (
    //     existingProducts.length === 0 ||
    //     existingProducts[0]?.restaurant?.id === newProduct.restaurant?.id
    //   ) {
    //     // Check if the new product is not already in the cart
    //     const isProductInCart = existingProducts.some(
    //       (product) => product.id === newProduct.id
    //     );
    
    //     if (!isProductInCart) {
    //       // Add the new product to the cart
    //       const updatedProducts = [...existingProducts, newProduct];
    //       state.products = updatedProducts;
    
    //       // Update localStorage
    //       localStorage.setItem("cart", JSON.stringify(updatedProducts));
    //     } else {
        
    //       console.log("This product is already in your cart.");
    //     }
    //   } else {
        
    //     const updatedProducts = [newProduct];
    //     state.products = updatedProducts;
  
        
    //     localStorage.setItem("cart", JSON.stringify(updatedProducts));
    //   }
    // },
    
    clearCart: (state) => {
      state.products = [];
      localStorage.removeItem("cart");
    },
    removeProduct: (state, action) => {
      const findId = state.products.findIndex(
        (product) => product.id === action.payload
      );
      if (findId !== -1) {
        state.products.splice(findId, 1);
        localStorage.setItem("cart", JSON.stringify(state.products));
      }
    },

    incrementQuantity: (state, action) => {
      const { id } = action.payload || {};
      const findId = state.products.findIndex((product) => product.id === id);

      if (findId !== -1 && state.products[findId]) {
        const updatedProducts = [...state.products];
        updatedProducts[findId] = {
          ...updatedProducts[findId],
          quantity: (updatedProducts[findId].quantity || 0) + 1,
        };

        state.products = updatedProducts;
        localStorage.setItem("cart", JSON.stringify(updatedProducts));
      }
    },
    decrementQuantity: (state, action) => {
      const { id } = action.payload || {};
      const findId = state.products.findIndex((product) => product.id === id);

      if (findId !== -1 && state.products[findId]) {
        const updatedProducts = [...state.products];
        updatedProducts[findId] = {
          ...updatedProducts[findId],
          quantity: (updatedProducts[findId].quantity || 0) - 1,
        };

        state.products = updatedProducts;
        localStorage.setItem("cart", JSON.stringify(updatedProducts));
      }
    },
  },
});

export const {
  addCart,
  removeProduct,
  clearCart,
  incrementQuantity,
  decrementQuantity,
} = slice.actions;
export default slice.reducer;
