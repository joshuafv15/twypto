import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
  "x-rapidapi-host": "coingecko.p.rapidapi.com",
  "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
};
const baseUrl = "https://coingecko.p.rapidapi.com/coins/";
const params = {
  localization: "false",
  tickers: "false",
  market_data: "true",
  community_data: "false",
  developer_data: "false",
  sparkline: "false",
};
const createRequest = (url) => ({
  url,
  headers: cryptoApiHeaders,
  params,
});

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCoin: builder.query({
      query: (coin) => createRequest(coin),
    }),
  }),
});

export const { useGetCoinQuery } = cryptoApi;
