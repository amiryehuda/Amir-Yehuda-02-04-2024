import React from "react";
import { OneDayCard } from "./style";
import { useAppSelector } from "../../../../store/store";

interface OneDayWeatherProps {
  day: string;
  fahrenheit: number;
  celsius: number;
  isCelsius: boolean;
}

const OneDayWeather: React.FC<OneDayWeatherProps> = ({
  day,
  celsius,
  fahrenheit,
  isCelsius,
}) => {
  const settingsState = useAppSelector((state) => state.settings);

  const displayDegrees = () => {
    if (settingsState.isCelsius) {
      return `${celsius}°C`;
    } else {
      return `${fahrenheit}°F`;
    }
  };

  return (
    <OneDayCard>
      <div>{day}</div>
      <div>{displayDegrees()}</div>
    </OneDayCard>
  );
};
export default OneDayWeather;
