import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductType } from "../types/type";

export interface CartState {
  products: ProductType[]; // Assuming ProductType is imported or defined somewhere
  quantity: number;
}

const initialState: CartState = {
  products: [],
  quantity: 1,
};

const slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action: PayloadAction<ProductType>) => {
      const isExist = state.products.find(
        (product) => product.id === action.payload.id
      );
      if (!isExist) {
        state.products.push(action.payload);
        if (!localStorage.getItem("cart")) {
          localStorage.setItem("cart", JSON.stringify([action.payload]));
        } else {
          localStorage.setItem("cart", JSON.stringify(state.products));
        }
      }
    },
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

    addQuantity: (state, action) => {
      const { id } = action.payload || {};
      const findId = state.products.findIndex(product => product.id === id);
    
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
      const findId = state?.products.findIndex(
        (product) => product?.id === action.payload.id
      );
      if (findId !== -1) {
        const productQuantity = state?.products[findId];
        productQuantity["quantity"] = productQuantity["quantity"] - 1;
        state.products[findId] = productQuantity;
        localStorage.setItem("cart", JSON.stringify(state.products));
      }
    },
  },
});

export const { addCart, removeProduct, clearCart, addQuantity,decrementQuantity } = slice.actions;
export default slice.reducer;
