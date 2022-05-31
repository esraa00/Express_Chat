import { combineReducers } from "redux";
import userSlice from "./userSlice";
import authSlice from "./authSlice";

export default combineReducers({ userSlice, authSlice });
