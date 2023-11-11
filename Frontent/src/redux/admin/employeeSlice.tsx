import { PayloadAction,createSlice } from "@reduxjs/toolkit";
import {EmployeeData} from '../../models/models'


interface EmployeesData{
    employees:EmployeeData []|null
}

const INITTAL_STATE:EmployeesData={
    employees:null,
};

const employeeListSlice =createSlice({
    name:'employeeList',
    initialState:INITTAL_STATE,
    reducers:{
     
        addEmployees: (state, action:PayloadAction<EmployeeData[]>) => {
              state.employees=action.payload;
        },
    },
});

export const {addEmployees}=employeeListSlice.actions

export default employeeListSlice.reducer;