import Paper from "@mui/material/Paper";
import { styled } from "@mui/system";

export const sx = {
  "& .MuiAutocomplete-root:hover .MuiOutlinedInput-root, .MuiAutocomplete-hasPopupIcon .MuiOutlinedInput-root, .MuiAutocomplete-hasClearIcon .MuiOutlinedInput-root":
    {
      border: "1px solid #8796A5",
      borderRadius: 4,
    },
  "& .MuiAutocomplete-root:hover .MuiInputBase-input": {
    border: "1px solid #8796A5",
  },
  "& .css-1jgdtkb-MuiInputBase-root-MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
    {
      border: "1px solid #8796A5",
    },
  "& .MuiAutocomplete-endAdornment": {
    display: "none",
  },
  "& .MuiAutocomplete-input": {
    color: "#8796A5",
    borderRadius: 1,
    border: "none",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "1px solid #8796A5",
  },
  "& .MuiOutlinedInput-notchedOutline:hover": {
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
