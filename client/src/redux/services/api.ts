import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
  BaseQueryFn,
  FetchArgs,
} from "@reduxjs/toolkit/query/react";

import { RootState } from "../store";

import {API_URL} from "../../../constant"

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).user.accessToken;
    // If we have a token set in state, let's assume that we should be passing it.
    if (token) {
      headers.set("x-auth-token", `${token}`);
      console.log("Auth token", token);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // try to get a new token
    // post to the refresh endpoint
    const refreshResult: any = await baseQuery(
      {
        url: "user/refresh",
        method: "POST",
        body: {
          refreshToken: (api.getState() as RootState).user.refreshToken,
        },
      },
      api,
      extraOptions
    );
    if (refreshResult.data) {
      // store the new token
      api.dispatch({
        type: "user/tokenReceived",
        payload: 
        {
          accessToken: refreshResult.data.token,
          refreshToken: refreshResult.data.refreshToken,
         } ,
      });
      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch({
        type: "user/loggedOut",
      });
    }
  }
  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Reward", "Goal", "Routine"],
  endpoints: (builder) => ({}),
});
