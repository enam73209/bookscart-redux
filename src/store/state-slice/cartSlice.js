import { createSlice } from "@reduxjs/toolkit";
const initialState = { items: [], totalQuantity: 0, cartChanged:false };
const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    replaceCart:(state,action)=>{
      state.items = action.payload.items;
      state.totalQuantity = action.payload.totalQuantity;
    },
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.cartChanged = true;
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
      } else {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          title: newItem.title,
        });
      }
      // console.log(state.items.map(item => ({ ...item })));
    },

    removeCartItem:(state,action)=>{
      const id = action.payload;
      const existingItem = state.items.find((item)=>item.id===id);
      state.totalQuantity--;
      state.cartChanged = true;
      if(existingItem.quantity===1){
            state.items = state.items.filter((item)=>item.id!==id);
      }
      else{
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice-existingItem.price;
      }
    }
  },
});

export const cartAction = cartSlice.actions;
export default cartSlice.reducer;
