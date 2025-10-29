import { baseApi } from "../../api/BaseAPi";

const AuthAPi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data) => ({
        url: "auth/register",
        method: "POST",
        body: data,
      }),
    }),

    login: builder.query({
      query: () => ({
        url: "auth/login",
        method: "POST",
      }),
    }),
  }),
});

export const { useSignUpMutation, useLoginQuery } = AuthAPi;
