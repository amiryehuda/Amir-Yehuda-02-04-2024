import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import weatherSlice from "./weather/weatherSlice";
import userSettingsSlice from "./userSettings/userSettingsSlice";

export const store = configureStore({
  reducer: {
    weather: weatherSlice,
    settings: userSettingsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
