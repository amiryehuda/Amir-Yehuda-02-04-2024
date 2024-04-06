import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { sxTabs, sxBox } from "./styles";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState<string>(location.pathname);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    navigate(newValue);
  };

  useEffect(() => {
    setValue(location.pathname);
  }, [location.pathname]);

  return (
    <Box sx={sxBox}>
      <Tabs value={value} onChange={handleChange} sx={sxTabs}>
        <Tab value="/" label="Home" />
        <Tab value="/favorites" label="Favorites" />
      </Tabs>
    </Box>
  );
};

export default NavBar;
