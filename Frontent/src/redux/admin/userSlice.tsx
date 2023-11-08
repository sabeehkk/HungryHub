import { PayloadAction,createSlice } from "@reduxjs/toolkit";

interface UserData{
    users:UserData[]|null;
}

const INITTAL_STATE:UserData={
    users:null,
};

const userListSlice =createSlice({
    name:'userList',
    initialState:INITTAL_STATE,
    reducers:{
        addUsers :(state,action:PayloadAction<UserData[]>)=>{
                state.users = action.payload;
        },
    },
});

export const {addUsers}=userListSlice.actions

export default userListSlice.reducer;