import { apiSlice } from "./apiSlice";
const URL = "/products";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProduct: builder.mutation({
            query: (product) => ({
                url: `${URL}/${product}`,
                method: "GET",
            })
        }),
        getRandomProducts: builder.mutation({
            query: (qty) => ({
                url: `${URL}/random/${qty}`,
                method: "GET"
            })
        }),
        searchProduct: builder.mutation({
            query: (product) => ({
                url: `${URL}/search?q=${product}`,
                method: "GET"
            })
        })
    })
});

export const { useGetProductMutation, useGetRandomProductsMutation, useSearchProductMutation } = productApiSlice;