import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import userSlice from "./features/user/userSlice";

import { setupListeners } from "@reduxjs/toolkit/query";

import AsyncStorage from "@react-native-async-storage/async-storage";

// Redux Persist
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";

import { api } from "./services/api";

const persistConfig = {
    timeout: 2000,
    key: 'root',
    version: 1,
    storage: AsyncStorage,
    blacklist: [
        api.reducerPath,
    ]
}

const rootReducers = combineReducers({
    user: userSlice,
    [api.reducerPath]: api.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
            // {
            //     ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            // },
        }).concat(api.middleware),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof rootReducers>;
export default store;
persistor.purge();