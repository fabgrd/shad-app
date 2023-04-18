import { api } from "./api";

// Type
import type { RegisterBody } from "../../types/Auth/Body"

const endpoints = (builder: any) => ({
    getReward: builder.query({
        query: () => ({
            url: "rewards",
            method: "GET",
        }),
        providesTags: ["Reward"],
    }),
    createRewards: builder.mutation({
        query: (body: any) => ({
            url: "rewards",
            method: "POST",
            body,
        }),
        providesTags: ["Reward"],
    }),
});

const rewardApi = api.injectEndpoints({ endpoints });

export default rewardApi;

export const {
    useGetRewardQuery,
    useCreateRewardsMutation,
} = rewardApi;

export const selectUser = (state: any) => state.api.user;
