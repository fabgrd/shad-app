import { api } from "./api";

const endpoints = (builder: any) => ({
    registerUser: builder.mutation({
        query: (body: any) => ({
            url: "user/register",
            method: "POST",
            body,
        }),
        providesTags: ["User"],
    })
});

const onboardingApi = api.injectEndpoints({ endpoints });

export default onboardingApi;

export const {
    useRegisterUserMutation,
} = onboardingApi;