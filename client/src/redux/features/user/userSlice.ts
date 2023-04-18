import { createSlice } from "@reduxjs/toolkit";
import userApi from "../../services/auth";
import authApi from "../../services/auth";
import routineApi from "../../services/routine";
import { PURGE } from "redux-persist";

// MOCK_USER
import MOCK_USER from "../../../MOCK/Dashboard/MOCK_USER";

const initialState = {
  user: MOCK_USER,
  accessToken: null,
  refreshToken: null,
  isLogged: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    tokenReceived: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    loggedOut: (state) => {
      return initialState;
    },
    setIsLogged: (state, action) => {
      state.isLogged = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(PURGE, (state) => {
        return initialState;
      })
      .addMatcher(userApi.endpoints.signIn.matchPending, () => { })
      .addMatcher(
        userApi.endpoints.signIn.matchFulfilled,
        (state: any, action: { payload: any }) => {
          const user = action?.payload;
          state.user = user?.updatedUser;
          state.accessToken = user?.token;
          state.refreshToken = user?.refreshToken;
          state.isLogged = true;
        })
      .addMatcher(userApi.endpoints.signIn.matchRejected, () => { })
      .addMatcher(authApi.endpoints.signUp.matchPending, () => { })
      .addMatcher(
        userApi.endpoints.signUp.matchFulfilled,
        (state: any, action: { payload: any }) => {
          const user = action?.payload;
          state.user = user?.updatedUser;
          state.accessToken = user?.token;
          state.refreshToken = user?.refreshToken;
        })
      .addMatcher(
        userApi.endpoints.getUser.matchFulfilled,
        (state: any, action: { payload: any }) => {
          const user = action?.payload;
          state.user = user?.updatedUser;
          state.accessToken = user?.token;
          state.refreshToken = user?.refreshToken;
        })
      .addMatcher(routineApi.endpoints.checkTask.matchFulfilled, (state: any, action: { payload: any }) => {
        const user = action?.payload;
        state.user = user?.updatedUser;
      })
      .addMatcher(routineApi.endpoints.cheatDay.matchFulfilled, (state: any, action: { payload: any }) => {
        const user = action?.payload;
        state.user = user?.updatedUser;
      })
  },
});

export default userSlice.reducer;
export const { actions } = userSlice;
