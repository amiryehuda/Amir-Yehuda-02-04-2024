// ThemeProvider.tsx
import React, { ReactNode } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "./themes";

const localStorageKey = "isDarkMode";

interface ThemeProviderProps {
  children: ReactNode;
}
const ThemeProviderWrapper: React.FC<ThemeProviderProps> = ({ children }) => {
  const isDarkMode = localStorage.getItem(localStorageKey);

  return (
    <MuiThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeProviderWrapper;
