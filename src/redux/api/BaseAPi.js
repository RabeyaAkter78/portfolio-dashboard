
import { BASE_URL } from "../utils/baseUrl";
import { message } from "antd";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  // internal server error
  if (result?.error?.status === 500) {
    message.error(result.error.data.message);
  }
  // page not found
  if (result?.error?.status === 404) {
    message.error(result.error.data.message);
  }
  // forbidden
  if (result?.error?.status === 403) {
    message.error(result.error.data.message);
  }
  // bad request
  if (result?.error?.status === 400) {
    message.error(result.error.data.message);
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
    tagTypes: ["login","skills"],
  endpoints: () => ({}),
});
