import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { userInittalModel, UserData } from "../../models/models";

const INITTAL_STATE: userInittalModel = {
    user: null,
    success: false,
  };
  
  const authSlice = createSlice({
    name: "user",
    initialState: INITTAL_STATE,
    reducers: {
      userLoggedIn: (state, action: PayloadAction<UserData>) => {
        state.user = action.payload;
        state.success = true;
      },
      logout:(state)=>{
        state.user=null;
        state.success=false
      },
      setProfile:(state,action:any)=>{
        const data ={...state.user,...action.payload};
        state.user=data
      },
      updateData:(state,action:PayloadAction<UserData>)=>{
        const data={...state.user,...action.payload};
        state.user=data;
      }
    },
  });

  export const { userLoggedIn,logout,setProfile,updateData } =
  authSlice.actions;
export default authSlice.reducer;
   
