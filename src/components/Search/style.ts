import Paper from "@mui/material/Paper";
import { styled } from "@mui/system";

export const sx = {
  wdith: "80%",
  "& .MuiAutocomplete-endAdornment": {
    display: "none",
  },
  "& .MuiAutocomplete-input ": {
    color: "#8796A5",
    borderRadius: 1,
  },
  "& .MuiAutocomplete-input": {
    border: "none",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "1px solid #8796A5",
  },
};

export const sxAutocomplete = {
  minWidth: 220,
  "& .MuiAutocomplete-option": {
    backgroundColor: "#000",
  },
};

export const CustomPaper = styled(Paper)({
  backgroundColor: "#8796a5",
});
