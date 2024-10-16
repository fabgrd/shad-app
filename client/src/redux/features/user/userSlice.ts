import { createSlice } from "@reduxjs/toolkit";
import userApi from "../../services/auth";
import authApi from "../../services/auth";
import routineApi from "../../services/routine";
import rewardApi from "../../services/reward";
import { PURGE } from "redux-persist";
import { RoutineTask } from "../../../types/RoutineTask";

interface UserState {
  user: {
    _id: string;
    username: string;
    name: string;
    email: string;
    tasks: RoutineTask[];
    goals: any[]; // Ajoutez les autres propriétés nécessaires
    rewards: any[];
  };
  accessToken: string | null;
  refreshToken: string | null;
  isLogged: boolean;
}

const initialState: UserState = {
  user: {
    _id: '',
    username: '',
    name: '',
    email: '',
    tasks: [],
    goals: [],
    rewards: [],
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
    updateRewards: (state, action) => {
      state.user.rewards = action.payload;
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
      .addMatcher(routineApi.endpoints.removeTasks.matchFulfilled, (state: any, action: { payload: any }) => {
        const user = action?.payload;
        state.user = user?.updatedUser;
        state.user.tasks = action.payload.tasks;
      })
      .addMatcher(routineApi.endpoints.updateRoutine.matchFulfilled, (state: any, action: { payload: any }) => {
        const user = action?.payload;
        state.user = user?.updatedUser;
      })
      // .addMatcher(rewardApi.endpoints.getRewards.matchFulfilled, (state: any, action: { payload: any }) => {
      //   const user = action?.payload;
      //   state.user.rewards = action.payload;
      // })
      // .addMatcher(rewardApi.endpoints.createRewards.matchFulfilled, (state: any, action: { payload: any }) => {
      //   const user = action?.payload;
      //   state.user = user?.updatedUser;
      //   state.user.rewards = action.payload.rewards;
      // });
  },
});

export default userSlice.reducer;
export const { actions } = userSlice;