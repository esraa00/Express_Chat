import { createSlice } from "@reduxjs/toolkit";

const initialState = { name: "", id: "" };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      return { name: action.payload.name, id: action.payload.id };
    },
    changeName: (state, action) => {
      return { ...state, name: action.payload.name };
    },
    removeUser: (state, action) => {
      return initialState;
    },
  },
});
export const { addUser, changeName, removeUser } = userSlice.actions;
export default userSlice.reducer;
