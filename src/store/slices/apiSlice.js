import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: "http://localhost:8000/api/v1" });

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery, 
    tagTypes: ["User"],
    endpoints: (builder) => ({})
});