import { createSlice } from "@reduxjs/toolkit";

const likeSlice=createSlice({
   name:"like",
   initialState:{value:false, number : 0},
   reducers:{
      likeToFalse:(state)=>{state.value=false},
      likeToTrue:(state)=>{state.value=true},
      likeNumber:(state,action)=>{state.number = action.payload},
   }
});

export const {likeToFalse, likeToTrue, likeNumber}=likeSlice.actions;
export default likeSlice.reducer;