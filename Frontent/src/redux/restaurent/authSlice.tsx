import { PayloadAction,createSlice } from "@reduxjs/toolkit";

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
        }
    },
})

export const {restaurentLoggedIn,logout}=authSlice.actions

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