import React, { useEffect, useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { MaterialUISwitch } from "./style";

const DarkModeSwitcheButton = () => {
  const [isDarkMode, setIsDarkMode] = useState<string>(
    () => localStorage.getItem("isDarkMode") || "light"
  );

  const toggleTheme = () => {
    const newMode = isDarkMode === "light" ? "dark" : "light";
    setIsDarkMode(newMode);
    localStorage.setItem("isDarkMode", newMode);
  };

  useEffect(() => {
    document.body.style.backgroundColor =
      isDarkMode === "dark" ? "#222" : "#fff";
    document.body.style.color = isDarkMode === "dark" ? "#fff" : "#000";
  }, [isDarkMode]);

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <MaterialUISwitch
            sx={{ m: 1 }}
            checked={isDarkMode === "dark"}
            onChange={toggleTheme}
          />
        }
        label=""
      />
    </FormGroup>
  );
};

export default DarkModeSwitcheButton;
