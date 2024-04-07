import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type OneDayWeatherType = {
  day: string;
  fahrenheit: string;
  celsius: string;
};

export interface ICity {
  key: string;
  englishName: string;
  weatherText: string;
  iconNumber: number;
  fahrenheit: number;
  celsius: number;
}

type InitialState = {
  currentCity: ICity;
  nextFiveDays: OneDayWeatherType[];
};
const initialState: InitialState = {
  currentCity: {
    key: "",
    englishName: "",
    weatherText: "",
    iconNumber: 1,
    fahrenheit: 0,
    celsius: 0,
  },
  nextFiveDays: [],
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setCurrentCity: (state, action: PayloadAction<ICity>) => {
      return {
        ...state,
        currentCity: action.payload,
      };
    },
    setNextFiveDays: (state, action: PayloadAction<OneDayWeatherType[]>) => {
      state.nextFiveDays = action.payload;
    },
  },
});

export default weatherSlice.reducer;
export const { setCurrentCity, setNextFiveDays } = weatherSlice.actions;
