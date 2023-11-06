import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./user/authSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import adminAuthSlice from "./admin/authSlice";
import restaurentAuthSlice from './restaurent/authSlice'
import employeeAuthSlice from './employee/authSlice'

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  userAuth: authSlice,
  adminAuth:adminAuthSlice,
  restaurentAuth:restaurentAuthSlice,
  employeeAuth : employeeAuthSlice
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
});
export default store;
