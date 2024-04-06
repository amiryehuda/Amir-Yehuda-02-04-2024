import React from "react";
import { Card, EnglishName, Temperature, WeatherText } from "./style";

interface WeatherCardProps {
  key: string;
  englishName: string;
  geolocation: {
    latitude: number;
    longitude: number;
  };
  fahrenheit: number;
  celsius: number;
  weatherText: string;
  onClick?: () => void;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  englishName,
  celsius,
  weatherText,
  onClick,
}) => {
  return (
    <Card onClick={onClick}>
      <EnglishName>{englishName}</EnglishName>
      <Temperature>{celsius}°C</Temperature>
      <WeatherText>{weatherText}</WeatherText>
    </Card>
  );
};

export default WeatherCard;
