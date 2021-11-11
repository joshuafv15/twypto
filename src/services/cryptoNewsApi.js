import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsApiHeaders = {
  "x-bingapis-sdk": "true",
  "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
  "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
};
const baseUrl = "https://bing-news-search1.p.rapidapi.com/news/search";
const params = {
  q: "Cryptocurrencies",
  count: "8",
  freshness: "Day",
  textFormat: "Raw",
  safeSearch: "Off",
};
const createRequestByQuery = (query) => ({
  url: baseUrl,
  headers: cryptoNewsApiHeaders,
  params: { ...params, q: query },
});

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getNews: builder.query({
      query: (q) => createRequestByQuery(q),
    }),
  }),
});

export const { useGetNewsQuery } = cryptoNewsApi;
