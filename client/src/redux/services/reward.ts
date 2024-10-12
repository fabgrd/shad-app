import { api } from "./api";

// Type
import type { RegisterBody } from "../../types/Auth/Body"

const endpoints = (builder: any) => ({
    getRewards: builder.query({
        query: () => ({
            url: "rewards",
            method: "GET",
        }),
        providesTags: ["Reward"],
    }),
    createRewards: builder.mutation({
        query: (body: any) => ({
            url: "rewards/add",
            method: "POST",
            body,
        }),
        providesTags: ["Reward"],
    }),
    deleteRewards: builder.mutation({
        query: (body: any) => ({
            url: "rewards/delete",
            method: "DELETE",
            body,
        }),
        invalidatesTags: ["Reward"],
    }),
});

const rewardApi = api.injectEndpoints({ endpoints });

export default rewardApi;

export const {
    useGetRewardsQuery,
    useCreateRewardsMutation,
    useDeleteRewardsMutation,
} = rewardApi;

export const selectUser = (state: any) => state.api.user;
