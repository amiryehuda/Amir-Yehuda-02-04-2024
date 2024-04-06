import styled, { keyframes } from "styled-components";

export const growAnimation = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.1);
  }
`;

export const Card = styled.div`
  width: 300px;
  padding: 20px;
  border: 2px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    animation: ${growAnimation} 0.3s ease forwards;
  }
`;

export const EnglishName = styled.h2`
  margin: 0 0 10px;
`;

export const Temperature = styled.p`
  margin: 0 0 5px;
`;

export const WeatherText = styled.p`
  margin: 0;
`;
