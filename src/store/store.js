import { configureStore } from "@reduxjs/toolkit";
import UIReducer from "../store/state-slice/UiSlice";
import cartReducer from "../store/state-slice/cartSlice";
import booksReducer from "../store/state-slice/booksSlice";

const store = configureStore({
  reducer: {
    ui: UIReducer,
    cart: cartReducer,
    books: booksReducer
  },
});
export default store;
