import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import { baseApi } from "./services/baseApi";

const rootReducers = combineReducers({
  auth: authReducer,            // ← this MUST match whitelist
  [baseApi.reducerPath]: baseApi.reducer,
});

export default rootReducers;
