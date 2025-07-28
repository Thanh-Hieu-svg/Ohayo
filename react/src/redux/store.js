import { configureStore } from "@reduxjs/toolkit";
import shopReducer from "./shopSlice";
import searchReducer from "./searchSlice";
import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: {
    shop: shopReducer,
    search: searchReducer,
    cart: cartReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("cart", JSON.stringify(state.cart.items));
});

export default store;