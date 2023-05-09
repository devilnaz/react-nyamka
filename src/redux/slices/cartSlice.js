import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  totalCount: 0,
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct(state, action) {
      const findProduct = state.products.find((obj) => obj.id === action.payload.id);

      if (findProduct) {
        findProduct.count++;
      } else {
        state.products.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = state.products.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);

      state.totalCount = state.products.reduce((sum, obj) => {
        return obj.count + sum;
      }, 0);
    },
    minusProduct(state, action) {
      const findProduct = state.products.find((obj) => obj.id === action.payload.id);

      if (findProduct) {
        findProduct.count--;
      }
    },
    removeProduct(state, action) {
      state.products = state.products.filter((obj) => obj.id !== action.payload);

      state.totalPrice = state.products.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);

      state.totalCount = state.products.reduce((sum, obj) => {
        return obj.count + sum;
      }, 0);
    },
    clearProducts(state) {
      state.products = [];
      state.totalPrice = 0;
      state.totalCount = 0;
    },
  },
});

export const { addProduct, removeProduct, minusProduct, clearProducts } = cartSlice.actions;

export default cartSlice.reducer;
