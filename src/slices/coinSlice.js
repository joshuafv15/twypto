import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentCoin: "Cryptocurrencies",
};

export const coinSlice = createSlice({
  name: "coin",
  initialState,
  reducers: {
    changeCurrentCoin: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.currentCoin = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeCurrentCoin } = coinSlice.actions;

export default coinSlice.reducer;
