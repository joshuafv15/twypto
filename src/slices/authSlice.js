import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "first",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveUser: (state, action) => {
      state.user = action.payload;
    },
    updateProfilePicture: (state, action) => {
      state.user.photoURL = action.payload;
    },
  },
});

export const { saveUser, updateProfilePicture } = authSlice.actions;
export default authSlice.reducer;
