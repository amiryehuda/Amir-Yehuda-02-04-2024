import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { getCityWeather } from "../../../utils/utils";
import { useAppDispatch } from "../../../store/store";
import { setCurrentCity } from "../../../store/weather/weatherSlice";
import { useNavigate } from "react-router-dom";

interface WeatherCardProps {
  key: string;
  cityName: string;
  fahrenheit: number;
  celsius: number;
  weatherText: string;
  iconNumber: number;
}

const growAnimation = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.05);
  }
`;

const CardContainer = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-in-out;
  border: 1px solid #ccc;
  cursor: pointer;

  &:hover {
    animation: ${growAnimation} 0.2s ease-in-out forwards;
  }
`;

const CityName = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const WeatherText = styled.div`
  margin-top: 10px;
  font-size: 16px;
`;

const FavoriteCard: React.FC<WeatherCardProps> = ({
  cityName,
  celsius,
  fahrenheit,
  weatherText,
  iconNumber,
  key,
}: WeatherCardProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isCelsius = localStorage.getItem("isCelsius") === "true";

  const handleOnClick = async () => {
    // const restCityParams = await getCityWeather(key);
    // if (restCityParams) {
    //   const { weatherText, iconNumber, celsius, fahrenheit } = restCityParams;
    dispatch(
      setCurrentCity({
        key: key,
        englishName: cityName,
        weatherText: weatherText,
        iconNumber: iconNumber,
        fahrenheit: celsius,
        celsius: fahrenheit,
      })
    );
    // }
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
