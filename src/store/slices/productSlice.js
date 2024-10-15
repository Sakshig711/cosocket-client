import { apiSlice } from "./apiSlice";
const URL = "/products";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProduct: builder.mutation({
            query: (product) => ({
                url: `${URL}/${product}`,
                method: "GET",
            })
        })
    })
});

export const { useGetProductMutation } = productApiSlice;