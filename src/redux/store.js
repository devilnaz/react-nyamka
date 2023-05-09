import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";
import cartReducer from "./slices/cartSlice";
import pizza from "./slices/pizzaSlice";

export default configureStore({
  reducer: {
    filterReducer,
    cart: cartReducer,
    pizza,
  },
});
