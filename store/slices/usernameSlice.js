import { createSlice } from "@reduxjs/toolkit";

const usernameSlice=createSlice({
   name:"username",
   initialState:{value: ""},
   reducers:{
      setusernameValue:(state,action)=>{state.value = action.payload},
   }
});

export const {setusernameValue}=usernameSlice.actions;
export default usernameSlice.reducer;