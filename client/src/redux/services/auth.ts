import { api } from "./api";

// Type
import type { LoginBody, RegisterBody } from "../../types/Auth/Body"

const endpoints = (builder: any) => ({
  signUp: builder.mutation({
    query: (body: RegisterBody) => ({
      url: "user/register",
      method: "POST",
      body,
    }),
    providesTags: ["User"],
  }),
  getUser: builder.mutation({
    query: (body: any) => ({
      url: "user/",
      method: "POST",
      body,
    }),
    providesTags: ["User"],
  }),
  signIn: builder.mutation({
    query: (body: LoginBody) => ({
      url: "user/login",
      method: "POST",
      body,
    }),
    providesTags: ["User"],
  }),
  signOut: builder.mutation({
    query: () => ({
      url: "auth/signout",
      method: "POST",
    }),
    providesTags: ["User"],
  }),
  refresh: builder.mutation({
    query: () => ({
      url: "user/refresh",
      method: "POST",
    }),
    providesTags: ["User"],
  }),
});

const userApi = api.injectEndpoints({ endpoints });

export default userApi;

export const {
  useSignUpMutation,
  useSignInMutation,
  useSignOutMutation,
  useRefreshMutation,
  useGetUserMutation
} = userApi;

export const selectUser = (state: any) => state.api.user;
