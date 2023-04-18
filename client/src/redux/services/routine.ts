import { api } from "./api";

const endpoints = (builder: any) => ({
    getRoutine: builder.query({
        query: () => ({
            url: "routine",
            method: "GET",
        }),
        providesTags: ["Routine"],
    }),
    createRoutine: builder.mutation({
        query: (body: any) => ({
            url: "routine/add",
            method: "POST",
            body,
        }),
        providesTags: ["Routine"],
    }),
    checkTask: builder.mutation({
        query: (body: any) => ({
            url: "routine/check",
            method: "POST",
            body,
        }),
        providesTags: ["Routine"],
    }),
    cheatDay: builder.mutation({
        query: (body: any) => ({
            url: "routine/cheat",
            method: "POST",
            body,
        }),
        providesTags: ["Routine"],
    }),
});

const routineApi = api.injectEndpoints({ endpoints });

export default routineApi;

export const {
    useGetRoutineQuery,
    useCreateRoutineMutation,
    useCheckTaskMutation,
    useCheatDayMutation,
} = routineApi;

export const selectUser = (state: any) => state.api.user;
