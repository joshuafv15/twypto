import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
};

export const mobileLayoutSlice = createSlice({
  name: "mobileLayout",
  initialState,
  reducers: {
    openMobileLayout: (state) => {
      state.open = true;
    },
    closeMobileLayout: (state) => {
      state.open = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { openMobileLayout, closeMobileLayout } =
  mobileLayoutSlice.actions;

export default mobileLayoutSlice.reducer;
