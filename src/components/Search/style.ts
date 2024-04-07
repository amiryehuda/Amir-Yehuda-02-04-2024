import Paper from "@mui/material/Paper";
import { styled } from "@mui/system";

export const sx = {
  "& .MuiAutocomplete-endAdornment": {
    display: "none",
  },
  ".css-1jgdtkb-MuiInputBase-root-MuiOutlinedInput-root": {
    color: "#8796A5",
    border: "1px solid #8796A5",
  },
};

export const sxAutocomplete = {
  minWidth: 220,
  ".MuiAutocomplete-option": {
    backgroundColor: "#000",
  },
};

export const CustomPaper = styled(Paper)({
  backgroundColor: "#8796a5",
});
