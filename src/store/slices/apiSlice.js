import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER });

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery, 
    tagTypes: ["User"],
    endpoints: (builder) => ({})
});