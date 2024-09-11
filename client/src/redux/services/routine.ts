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
            url: "routine/create",
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
    addTasks: builder.mutation({
        query: (body: any) => ({
            url: "routine/add",
            method: "POST",
            body,
        }),
        invalidatesTags: ["Routine"],
    }),
    removeTasks: builder.mutation({
        query: (body: any) => ({
            url: "routine/delete",
            method: "DELETE",
            body,
        }),
        invalidatesTags: ["Routine"],
    }),
});

const routineApi = api.injectEndpoints({ endpoints });

export default routineApi;

export const {
    useGetRoutineQuery,
    useCreateRoutineMutation,
    useCheckTaskMutation,
    useCheatDayMutation,
    useAddTasksMutation,
    useRemoveTasksMutation,
} = routineApi;

export const selectUser = (state: any) => state.api.user;
