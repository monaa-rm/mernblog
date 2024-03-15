import { createSlice } from "@reduxjs/toolkit";

const bookmarkSlice=createSlice({
   name:"bookmark",
   initialState:{value:false},
   reducers:{
      bookmarkToFalse:(state)=>{state.value=false},
      bookmarkToTrue:(state)=>{state.value=true},
   }
});

export const {bookmarkToFalse, bookmarkToTrue}=bookmarkSlice.actions;
export default bookmarkSlice.reducer;