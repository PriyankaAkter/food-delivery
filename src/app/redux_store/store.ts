
import { configureStore } from "@reduxjs/toolkit";
import cartAddSlice from "./cartAddSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import wishlistAddSlice from "./wishlistAddSlice";

export const store = configureStore({
  reducer:{
    cart:cartAddSlice,
    wishlist:wishlistAddSlice
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

