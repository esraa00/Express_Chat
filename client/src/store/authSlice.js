import { createSlice } from "@reduxjs/toolkit";

const initialState = { isAuthorized: false };
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state, action) => {
      return { isAuthorized: true };
    },
    logOut: (state, action) => {
      return { initialState };
    },
  },
});

export default authSlice.reducer;
export const { logIn, logOut } = authSlice.actions;
