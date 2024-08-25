import {createSlice} from '@reduxjs/toolkit';
const initialUIState = {cartVisible:false};
const UISlice = createSlice({
  name:'ui',
  initialState: initialUIState,
  reducers:{
    toggleCart:(state)=>{
      state.cartVisible = !state.cartVisible;
    }

  }
})
export const UIAction = UISlice.actions;
export default UISlice.reducer;