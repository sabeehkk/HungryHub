import { PayloadAction,createSlice } from "@reduxjs/toolkit";
import { userInittalModel, UserData } from "../../models/models";

interface RestaurentState {
    restaurent:RestaurentData | null;
    success : boolean;
  }

interface RestaurentData{
    email:string;
}

const INITTAL_STATE : RestaurentState = {
    restaurent:null,
     success : false,
}

const authSlice = createSlice({
    name:'restaurent',
    initialState:INITTAL_STATE,
    reducers:{
        restaurentLoggedIn : (state,action:PayloadAction<RestaurentData>)=>{
            state.restaurent = action.payload;
            state.success=true;
        },
        logout:(state)=>{
            state.restaurent=null;
            state.success=false
        },
        setProfile:(state,action:any)=>{
            const data ={...state.restaurent,...action.payload};
            state.restaurent=data
          },
          updateData:(state,action:PayloadAction<UserData>)=>{
            const data={...state.restaurent,...action.payload};
            state.restaurent=data;
          }
    },
})

export const {restaurentLoggedIn,logout,setProfile,updateData}=authSlice.actions

export default  authSlice.reducer















// import { PayloadAction,createSlice } from "@reduxjs/toolkit"

// interface RestaurentState {
//     restaurent:RestaurentData |null;
//     success : boolean
// }

// interface RestaurentData{
//     email:string;
// }

// const INITTAL_STATE : RestaurentState ={
//     restaurent:null,
//     success:false,
// }

// const authSlice= createSlice({
//     name:'restaurent',
//     initialState:INITTAL_STATE,
//     reducers:{
//         restaurentLoggedIn :(state,action:PayloadAction<RestaurentData>)=>{
//             state.restaurent=action.payload;
//             state.success=true
//         }
//     },
// })

// export const {restaurentLoggedIn}=authSlice.actions

// export default authSlice