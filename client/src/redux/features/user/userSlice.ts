import { createSlice } from "@reduxjs/toolkit";
import userApi from "../../services/auth";
import authApi from "../../services/auth";
import routineApi from "../../services/routine";
import { PURGE } from "redux-persist";
import { RoutineTask } from "../../../types/RoutineTask";

// MOCK_USER
import MOCK_USER from "../../../MOCK/Dashboard/MOCK_USER";

interface UserState {
  user: {
    _id: string;
    username: string;
    name: string;
    email: string;
    tasks: RoutineTask[];
  };
  accessToken: string | null;
  refreshToken: string | null;
  isLogged: boolean;
}

const initialState: UserState = {
  user: {
    _id: '', // Assure-toi que ce sont des valeurs valides
    username: '',
    name: '',
    email: '',
    tasks: [],
  },
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
    },
    updateTasks: (state, action) => {
      state.user.tasks = action.payload;
  },
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
      .addMatcher(routineApi.endpoints.addTasks.matchFulfilled, (state: any, action: { payload: any }) => {
        const user = action?.payload;
        state.user = user?.updatedUser;
        state.user.tasks = action.payload.tasks;
      })
      .addMatcher(routineApi.endpoints.deleteTasks.matchFulfilled, (state: any, action: { payload: any }) => {
        const user = action?.payload;
        state.user = user?.updatedUser;
        state.user.tasks = action.payload.tasks;
      });
  },
});

export default userSlice.reducer;
export const { actions } = userSlice;
