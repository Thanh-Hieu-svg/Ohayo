import { createSlice } from "@reduxjs/toolkit";

const getInitialCart = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user?._id) return [];
  const cart = localStorage.getItem(`cart_${user._id}`);
  return cart ? JSON.parse(cart) : [];
};

const initialState = {
  items: getInitialCart(),
};

const saveCartToStorage = (items) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?._id)
    localStorage.setItem(`cart_${user._id}`, JSON.stringify(items));
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const { product, quantity } = action.payload;
      const existing = state.items.find(
        (item) => item.product._id === product._id
      );
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ product, quantity });
      }
      saveCartToStorage(state.items);
    },
    removeFromCart(state, action) {
      state.items = state.items.filter(
        (item) => item.product._id !== action.payload
      );
      saveCartToStorage(state.items);
    },
    updateQuantity(state, action) {
      const { productId, quantity } = action.payload;
      const item = state.items.find((item) => item.product._id === productId);
      if (item) item.quantity = quantity;
      saveCartToStorage(state.items);
    },
    resetCart(state) {
      state.items = [];
      saveCartToStorage([]);
    },
    clearCart(state) {
      state.items = [];
      saveCartToStorage([]);
    },
    setCart(state, action) {
      state.items = action.payload;
      saveCartToStorage(state.items);
    }
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, resetCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;