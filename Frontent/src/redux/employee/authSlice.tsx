import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { userInittalModel, UserData } from "../../models/models";

interface EmployeeState {
    employee :EmployeeData | null ;
    success : boolean;
}
interface EmployeeData {
    email:string;
}

const INITTAL_STATE :  EmployeeState = {
      employee :null ,
      success :false,
}

const authSlice =createSlice({
    name:'employee',
    initialState:INITTAL_STATE,
    reducers: {
        employeeLoggedIn :(state,action:PayloadAction<EmployeeData>)=>{
                state.employee =action.payload;
                state.success =true ;
        },
        logout:(state)=>{
            state.employee=null
            state.success=false
        console.log(state.success,'logout status')
            
        }
        
    },
})

export const {employeeLoggedIn,logout}=authSlice.actions

export default authSlice.reducer