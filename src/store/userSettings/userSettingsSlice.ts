import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Settings = {
  isDarkMode: boolean;
  isCelsius: boolean;
};

const initialState: Settings = {
  isDarkMode: false,
  isCelsius: true,
};

const userSettingsSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setIsDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
    setIsCelsius: (state, action: PayloadAction<boolean>) => {
      state.isCelsius = action.payload;
    },
  },
});

export const { setIsDarkMode, setIsCelsius } = userSettingsSlice.actions;
export default userSettingsSlice.reducer;
