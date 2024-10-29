import { apiSlice } from "./apiSlice";
const GPT_URL = "/gpt";

export const gptApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getInspectionSteps: builder.mutation({
            query: (product) => ({
                url: `${GPT_URL}/inspection/${product}`,
                method: "GET",
                credentials: "include"
            })
        }),
        getVariants: builder.mutation({
            query: ({ product, data }) => ({
                url: `${GPT_URL}/variants/${product}`,
                method: "POST",
                credentials: "include",
                body: data
            })
        }),
        getOperations: builder.mutation({
            query: (product) => ({
                url: `${GPT_URL}/operations/${product}`,
                method: "GET",
                credentials: "include"
            })
        }),
        getManufacturers: builder.mutation({
            query: (data) => ({
                url: `manufacturer`,
                method: "POST",
                credentials: "include",
                body: data
            })
        }),
        getSourcing: builder.mutation({
            query: (product) => ({
                url: `${GPT_URL}/sourcing/${product}`,
                method: "GET",
                credentials: "include"
            })
        })
    })
});

export const { useGetInspectionStepsMutation, useGetVariantsMutation, useGetOperationsMutation, useGetManufacturersMutation, useGetSourcingMutation } = gptApiSlice;