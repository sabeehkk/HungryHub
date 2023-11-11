import { PayloadAction,createSlice } from "@reduxjs/toolkit";
import {RestaurentData} from '../../models/models'

interface RestaurentsData{
    restaurents:RestaurentData[]|null;
}

const INITTAL_STATE:RestaurentsData={
    restaurents:null,
};

const restaurentListSlice =createSlice({
    name:'restaurentList',
    initialState:INITTAL_STATE,
    reducers:{ 
     
        addRestaurents: (state, action:PayloadAction<RestaurentData[]>) => {
              state.restaurents=action.payload;
           
        },
    },
});

export const {addRestaurents}=restaurentListSlice.actions

export default restaurentListSlice.reducer;