import { PayloadAction,createSlice } from "@reduxjs/toolkit";
import {UserData} from '../../models/models'
interface UsersData{
    users:UserData[]|null;
}

const INITTAL_STATE:UsersData={
        users:null,
};

const userListSlice =createSlice({
    name:'userList',
    initialState:INITTAL_STATE,
    reducers:{
     
        addUsers: (state, action:PayloadAction<UserData[]>) => {
            state.users=action.payload;
            // const updates = state.user.map((user) => {
            //     if (user._id === action.payload.id) {
            //         user.status = action.payload.status
            //     }
            //     return user;
            // })
            // state.users = state.FilterData = updates;
        },
        
    },
});

export const {addUsers}=userListSlice.actions

export default userListSlice.reducer;