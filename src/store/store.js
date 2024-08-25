import { configureStore } from "@reduxjs/toolkit";
import UIReducer from "../store/state-slice/UiSlice";
import cartReducer from "../store/state-slice/cartSlice";

const store = configureStore({
  reducer: {
    ui: UIReducer,
    cart: cartReducer,
  },
});
export default store;
