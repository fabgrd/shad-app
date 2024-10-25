import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import userApi from "../../services/auth";
import authApi from "../../services/auth";
import routineApi from "../../services/routine";
import rewardApi from "../../services/reward";
import goalApi from "../../services/goal";
import { PURGE } from "redux-persist";
import { RoutineTask } from "../../../types/RoutineTask";
import { Reward } from "../../../types/Reward";
import { Routine } from "../../../types/Routine";

interface UserState {
  user: {
    _id: string;
    username: string;
    name: string;
    email: string;
    tasks: RoutineTask[];
    goals: any[];
    rewards: Reward[];
    routine: Routine[]
  };
  accessToken: string | null;
  refreshToken: string | null;
  isLogged: boolean;
  completedReward: Reward | null;
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
    routine: [],
  },
  accessToken: null,
  refreshToken: null,
  isLogged: false,
  completedReward: null,
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
    updateGoals: (state, action) => {
      state.user.goals = action.payload;
    },
    updateRoutine: (state, action) => {
      state.user.routine = action.payload.routine;
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
      .addMatcher(rewardApi.endpoints.getRewards.matchFulfilled, (state: any, action: { payload: any }) => {
        const user = action?.payload;
        state.user = user?.updatedUser;
        state.user.rewards = action.payload.rewards;
      })
      .addMatcher(rewardApi.endpoints.createRewards.matchFulfilled, (state: any, action: { payload: any }) => {
        const { updatedUser } = action.payload;
        if (updatedUser) {
          state.user = {
            ...state.user,
            rewards: updatedUser.rewards
          };
        }
      })
      .addMatcher(rewardApi.endpoints.deleteRewards.matchFulfilled, (state: any, action: { payload: any }) => {
        const { updatedUser } = action.payload;
        if (updatedUser) {
          state.user = {
            ...state.user,
            rewards: updatedUser.rewards
          };
        }
      })
      .addMatcher(goalApi.endpoints.getGoals.matchFulfilled, (state: any, action: { payload: any }) => {
        const user = action?.payload;
        state.user = user?.updatedUser;
        state.user.goals = action.payload.goals;
      })
      .addMatcher(goalApi.endpoints.createGoals.matchFulfilled, (state: any, action: { payload: any }) => {
        const { updatedUser } = action.payload;
        if (updatedUser) {
          state.user = {
            ...state.user,
            goals: updatedUser.goals
          };
        }
      })
      .addMatcher(goalApi.endpoints.deleteGoals.matchFulfilled, (state: any, action: { payload: any }) => {
        const { updatedUser } = action.payload;
        if (updatedUser) {
          state.user = {
            ...state.user,
            goals: updatedUser.goals
          };
        }
      })
      .addMatcher(routineApi.endpoints.updateRoutine.matchFulfilled, (state: any, action: { payload: any }) => {
        state.user.routine = [action.payload.routine];
      });
      
  },
});

export default userSlice.reducer;
export const { tokenReceived, loggedOut, setIsLogged, updateTasks, updateRewards, updateGoals } = userSlice.actions;
