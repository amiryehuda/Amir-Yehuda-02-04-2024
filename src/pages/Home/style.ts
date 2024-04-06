import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const TextInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
`;

export const Square = styled.div<{ isDarkMode: boolean }>`
  width: 96%;
  max-width: 500px;
  margin-top: 20px;
  padding: 16px;
  border: 2px solid #ccc;
  border-radius: 10px;
`;

export const UpperPart = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const WeatherText = styled.p`
  font-size: 24px;
  text-align: center;
`;

export const Tabs = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  margin-top: 20px;
`;

export const Tab = styled.div`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
`;
