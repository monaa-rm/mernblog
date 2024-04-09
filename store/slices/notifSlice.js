import { createSlice } from "@reduxjs/toolkit";

const notifSlice=createSlice({
   name:"notif",

   initialState:{value:0},
   reducers:{
      setnotifValue:(state,action)=>{state.value=action.payload},
   }
});

export const {setnotifValue}=notifSlice.actions;
export default notifSlice.reducer;