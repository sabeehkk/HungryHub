import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { userInittalModel, userModel } from "../../models/models";


const INITTAL_STATE: userInittalModel = {
    user: null,
    success: false,
  };
  
  const authSlice = createSlice({
    name: "user",
    initialState: INITTAL_STATE,
    reducers: {
      userLoggedIn: (state, action: PayloadAction<userModel>) => {
        state.user = action.payload;
        state.success = true;
      },
      logout:(state)=>{
        state.user=null;
        state.success=false
      }
    },
  });
  export const { userLoggedIn,logout } =
  authSlice.actions;
export default authSlice.reducer;
