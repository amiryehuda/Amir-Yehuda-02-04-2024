import React, { useEffect } from "react";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setIsCelsius } from "../../store/userSettings/userSettingsSlice";
import { sx } from "./styles";

const CelsiusOrFahrenheit = () => {
  const dispatch = useAppDispatch();
  const settingsState = useAppSelector((state) => state.settings);

  useEffect(() => {
    const isCelsiusFromLocalStorage = localStorage.getItem("isCelsius");

    if (isCelsiusFromLocalStorage !== null) {
      dispatch(setIsCelsius(isCelsiusFromLocalStorage === "true"));
    } else {
      localStorage.setItem("isCelsius", "true");
      dispatch(setIsCelsius(true));
    }
  }, [dispatch]);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: boolean
  ) => {
    if (newAlignment !== null) {
      dispatch(setIsCelsius(newAlignment));
      localStorage.setItem("isCelsius", newAlignment.toString());
    }
  };

  const children = [
    <ToggleButton value={true} key="celsius">
      °C
    </ToggleButton>,
    <ToggleButton value={false} key="fahrenheit">
      °F
    </ToggleButton>,
  ];

  return (
    <Stack spacing={2} alignItems="center">
      <ToggleButtonGroup
        size="small"
        value={settingsState.isCelsius}
        exclusive
        onChange={handleChange}
        aria-label="Temperature Unit"
        sx={sx}
      >
        {children}
      </ToggleButtonGroup>
    </Stack>
  );
};

export default CelsiusOrFahrenheit;
