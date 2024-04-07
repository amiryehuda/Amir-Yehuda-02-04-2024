import React, { useState } from "react";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { useAppDispatch } from "../../store/store";
import { setCurrentCity } from "../../store/weather/weatherSlice";
import { getCityWeather, getSearchLocations } from "../../utils/utils";
import { sxAutocomplete, sx, CustomPaper } from "./style";
import "react-toastify/dist/ReactToastify.css";
import { debounce } from "../../utils/helpers";

interface SearchItem {
  name: string;
  Key: string;
}

const Search = () => {
  const [value, setValue] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<readonly SearchItem[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const onValueChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (!/^[a-zA-Z\s]*$/.test(value)) {
      toast.error("Only English letters are allowed.", {
        position: "bottom-left",
      });
      return;
    }
    setLoading(true);
    if (value.length !== 0) {
      const response = await getSearchLocations(value);
      setValue(value);
      if (response) {
        setOptions([...response]);
      }
    } else {
      setOptions([]);
    }
    setLoading(false);
  };

  const onOptionChange = async (
    event: React.ChangeEvent<{}>,
    option: SearchItem | null
  ) => {
    if (option) {
      setValue(option.name);
      const restCityParams = await getCityWeather(option.Key);
      if (restCityParams) {
        const { weatherText, iconNumber, celsius, fahrenheit } = restCityParams;
        dispatch(
          setCurrentCity({
            key: option.Key,
            englishName: option.name,
            weatherText: weatherText,
            iconNumber: iconNumber,
            fahrenheit: fahrenheit,
            celsius: celsius,
          })
        );
      }
      setOptions([]);
    }
  };

  const change = debounce(onValueChange, 300);

  return (
    <Autocomplete
      id="asynchronous-demo"
      sx={sxAutocomplete}
      open={options.length !== 0 && open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
        setOptions([]);
      }}
      isOptionEqualToValue={(option, value) => option.Key === value.Key}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      onChange={onOptionChange}
      PaperComponent={CustomPaper}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search for a location..."
          id={"text-field"}
          value={value}
          onChange={change}
          sx={sx}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};

export default Search;
