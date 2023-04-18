import { createSlice } from "@reduxjs/toolkit";
import onboardingApi from "../../services/onboarding";
import { PURGE } from "redux-persist";

const initialState = {
    step1Data: {
        username: "",
        name: "",
        email: "",
        sex: "",
        birthDate: "",
    },
    step2Data: {
        routineActivities: [],
        routineDeadline: "",
        allowNotifications: false,
    },
    step3Data: {
        rewards: [],
    },
    step4Data: {
        goals: [],
    },
};

export const userSlice = createSlice({
    name: "onboarding",
    initialState,
    reducers: {
        updateStepOneData: (state, action) => {
            state.step1Data = action.payload;
        },
        updateStepTwoData: (state, action) => {
            state.step2Data = action.payload;
        },
        updateStepThreeData: (state, action) => {
            state.step3Data = action.payload;
        },
        updateStepFourData: (state, action) => {
            state.step4Data = action.payload;
        },
        resetOnboardingData: (state) => {
            return initialState;
        },
        getOnboardingData: (state) => {
            return state;
        }
    }
});

export default userSlice.reducer;
export const { actions } = userSlice;
