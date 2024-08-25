import {createSlice} from '@reduxjs/toolkit';
const initialUIState = {cartVisible:false,notification:null};
const UISlice = createSlice({
  name:'ui',
  initialState: initialUIState,
  reducers:{
    toggleCart:(state)=>{
      state.cartVisible = !state.cartVisible;
    },
    showNotification:(state,action)=>{
          state.notification={
            status : action.payload.status,
            title  : action.payload.title,
            message: action.payload.message
          }
    }

  }
})
export const UIAction = UISlice.actions;
export default UISlice.reducer;