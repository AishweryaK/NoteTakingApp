import { configureStore } from "@reduxjs/toolkit";
import rootReducer, { RootStateType }  from "../Slices/rootReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistReducer,
    persistStore
  } from 'redux-persist';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

  const persistConfig = {
    key:"root",
    storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
}})
});

export type AppDispatch = typeof store.dispatch;
export const useReduxDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useReduxSelector: TypedUseSelectorHook<RootStateType> = useSelector;

export const persistor = persistStore(store);