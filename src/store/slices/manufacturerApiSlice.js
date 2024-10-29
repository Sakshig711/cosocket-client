import { apiSlice } from "./apiSlice";
const GPT_URL = "/gpt";

export const manufacturerApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getManufacturers: builder.mutation({
            query: (data) => ({
                url: `manufacturer`,
                method: "POST",
                credentials: "include",
                body: data
            })
        }),
        getManufacturerByID: builder.mutation({
            query: (id) => ({
                url: `manufacturer/${id}`,
                method: "GET",
                credentials: "include",
            })
        }),
        getTopManufacturers: builder.mutation({
            query: (id) => ({
                url: `manufacturer/top-manufacturers`,
                method: "GET",
                credentials: "include",
            })
        })
    })
});

export const { useGetManufacturersMutation, useGetManufacturerByIDMutation, useGetTopManufacturersMutation } = manufacturerApiSlice;