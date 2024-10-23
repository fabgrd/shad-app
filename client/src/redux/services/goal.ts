import { api } from "./api";

// Type
import type { RegisterBody } from "../../types/Auth/Body"

const endpoints = (builder: any) => ({
    getGoals: builder.query({
        query: () => ({
            url: "goals",
            method: "GET",
        }),
        providesTags: ["Goal"],
    }),
    createGoals: builder.mutation({
        query: (body: any) => ({
            url: "goals/add",
            method: "POST",
            body,
        }),
        providesTags: ["Goal"],
    }),
    deleteGoals: builder.mutation({
        query: (body: any) => ({
            url: "goals/delete",
            method: "DELETE",
            body,
        }),
        invalidatesTags: ["Goal"],
    }),
});

const goalApi = api.injectEndpoints({ endpoints });

export default goalApi;

export const {
    useGetGoalsQuery,
    useCreateGoalsMutation,
    useDeleteGoalsMutation,
} = goalApi;

export const selectUser = (state: any) => state.api.user;
