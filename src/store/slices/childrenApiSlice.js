import { apiSlice } from "./apiSlice";
// const URL = "https://api.escuelajs.co/api/v1/categories";
const URL = "/categories";

export const childrenApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.mutation({
            query: () => ({
                url: URL,
                method: "GET",
            })
        }),
        getChildren: builder.mutation({
            query: (slug) => ({
                url: `${URL}/${slug}`,
                method: "GET"
            })
        })
    })
});

export const { useGetCategoriesMutation, useGetChildrenMutation } = childrenApiSlice;