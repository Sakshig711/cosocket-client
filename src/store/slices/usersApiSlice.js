import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
const USERS_URL = "/users";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
        credentials: "include",
      }),
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/update-profile`,
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
    }),
    orderPayment: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/order-payment`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    verifyPayment: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/verify-payment`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useUpdateProfileMutation,
  useOrderPaymentMutation,
  useVerifyPaymentMutation
} = userApiSlice;
