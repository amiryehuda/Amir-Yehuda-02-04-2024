import styled, { keyframes } from "styled-components";

export const growAnimation = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.05);
  }
`;

export const CardContainer = styled.div`
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

export const CityName = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

export const WeatherText = styled.div`
  margin-top: 10px;
  font-size: 16px;
`;
