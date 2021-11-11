import { configureStore } from "@reduxjs/toolkit";
import coinReducer from "../slices/coinSlice";
import { cryptoApi } from "../services/cryptoApi";
import { cryptoNewsApi } from "../services/cryptoNewsApi";
import authReducer from "../slices/authSlice";
import mobileLayoutReducer from "../slices/mobileLayoutSlice";

export const store = configureStore({
  reducer: {
    coin: coinReducer,
    auth: authReducer,
    mobileLayout: mobileLayoutReducer,
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(cryptoApi.middleware, cryptoNewsApi.middleware),
});
