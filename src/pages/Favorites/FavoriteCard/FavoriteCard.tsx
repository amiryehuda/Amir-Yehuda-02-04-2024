import React from "react";

import { useAppDispatch } from "../../../store/store";
import { setCurrentCity } from "../../../store/weather/weatherSlice";
import { useNavigate } from "react-router-dom";
import { CardContainer, CityName, WeatherText } from "./styles";

interface WeatherCardProps {
  keys: string;
  cityName: string;
  fahrenheit: number;
  celsius: number;
  weatherText: string;
  iconNumber: number;
  isCelsius: boolean;
}

const FavoriteCard: React.FC<WeatherCardProps> = ({
  cityName,
  celsius,
  fahrenheit,
  weatherText,
  iconNumber,
  keys,
  isCelsius,
}: WeatherCardProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleOnClick = async () => {
    dispatch(
      setCurrentCity({
        key: keys,
        englishName: cityName,
        weatherText: weatherText,
        iconNumber: iconNumber,
        fahrenheit: fahrenheit,
        celsius: celsius,
      })
    );
    navigate("/");
  };

  return (
    <CardContainer onClick={handleOnClick}>
      <CityName>{cityName}</CityName>
      <div data-theme="dark">
        {isCelsius ? `${celsius}°C` : `${fahrenheit}°F`}
      </div>
      <WeatherText>{weatherText}</WeatherText>
    </CardContainer>
  );
};

export default FavoriteCard;
