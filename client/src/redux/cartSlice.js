import { createSlice } from "@reduxjs/toolkit";

// 1️⃣ Charger le panier depuis localStorage
const savedCart = JSON.parse(localStorage.getItem("cartData"));

const initialState = savedCart || {
  cartItems: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find(
        (p) => p.id === item.id
      );

      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.cartItems.push({ ...item, quantity: item.quantity });
      }
      cartSlice.caseReducers.calculateTotals(state);
      // 🔥 Sauvegarde
      localStorage.setItem("cartData", JSON.stringify(state));
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (p) => p.id !== action.payload
      );
      cartSlice.caseReducers.calculateTotals(state);
      // 🔥 Sauvegarde
      localStorage.setItem("cartData", JSON.stringify(state));
    },

    increaseQty: (state, action) => {
      const item = state.cartItems.find((p) => p.id === action.payload);
      if (item) item.quantity++;
      cartSlice.caseReducers.calculateTotals(state);

      // 🔥 Sauvegarde
      localStorage.setItem("cartData", JSON.stringify(state));
    },

    decreaseQty: (state, action) => {
      const item = state.cartItems.find((p) => p.id === action.payload);

      if (item.quantity > 1) item.quantity--;
      else state.cartItems = state.cartItems.filter((p) => p.id !== action.payload);

      cartSlice.caseReducers.calculateTotals(state);

      // 🔥 Sauvegarde
      localStorage.setItem("cartData", JSON.stringify(state));
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;

      // 🔥 Sauvegarde
      localStorage.setItem("cartData", JSON.stringify(state));
    },

    calculateTotals: (state) => {
      let qty = 0;
      let total = 0;

      state.cartItems.forEach((item) => {
        qty += item.quantity;
        total += item.quantity * item.price;
      });

      state.totalQuantity = qty;
      state.totalAmount = total;
    },
  },

 
});

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
