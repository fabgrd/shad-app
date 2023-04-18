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
    createGoal: builder.mutation({
        query: (body: RegisterBody) => ({
            url: "goals",
            method: "POST",
            body,
        }),
        providesTags: ["Goal"],
    }),
});

const goalApi = api.injectEndpoints({ endpoints });

export default goalApi;

export const {
    useGetGoalsQuery,
    useCreateGoalMutation,
} = goalApi;

export const selectUser = (state: any) => state.api.user;
