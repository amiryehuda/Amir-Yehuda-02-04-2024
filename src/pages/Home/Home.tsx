import React, { useEffect, useState } from "react";

import { Container, Square, Tabs, UpperPart, WeatherText } from "./style";
import OneDayWeather from "./components/OneDayWeather/OneDayWeather";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  getCityWeather,
  getLocationKey,
  getNextFiveDays,
  getSearchLocations,
} from "../../utils/utils";
import {
  OneDayWeatherType,
  setCurrentCity,
  setNextFiveDays,
} from "../../store/weather/weatherSlice";
import Search from "../../components/Search/Search";
import FavoriteButton from "./components/FavoriteButton/FavoriteButton";
import CelsiusOrFahrenheit from "../../components/CelsiusOrFahrenheit/CelsiusOrFahrenheit";
import { loadDynamicImage } from "../../utils/helpers";
// import DarkMode from "../../components/DarkModeToggle/DarkMode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { to } from "react-spring";

interface HomeI {
  firstVisitInApp: boolean;
  setFirstVisitInApp: (state: boolean) => void;
}
const Home: React.FC<HomeI> = ({ firstVisitInApp, setFirstVisitInApp }) => {
  const dispatch = useAppDispatch();
  const settingsState = useAppSelector((state) => state.settings);
  const cityDetails = useAppSelector((state) => state.weather.currentCity);
  const nextFiveDays = useAppSelector((state) => state.weather.nextFiveDays);
  // const [locationCalled, setLocationCalled] = useState<boolean>(false);

  const displayCelsiusOrFahrenheit = () => {
    if (settingsState.isCelsius) {
      return cityDetails.celsius && `${cityDetails.celsius}°C`;
    } else {
      return cityDetails.fahrenheit && `${cityDetails.fahrenheit}°F`;
    }
  };

  const updateOneCityWeather = async (cityName: string) => {
    const response = await getLocationKey(cityName);
    if (response) {
      const { key, englishName } = response;
      const restCityParams = await getCityWeather(key);
      if (restCityParams) {
        const { weatherText, iconNumber, celsius, fahrenheit } = restCityParams;
        dispatch(
          setCurrentCity({
            key: key,
            englishName: englishName,
            weatherText: weatherText,
            iconNumber: iconNumber,
            fahrenheit: celsius,
            celsius: fahrenheit,
          })
        );
        setFirstVisitInApp(true);
      }
    }
  };

  const fetchDataFirstTime = async () => {
    try {
      const locationResponse = await fetch("https://ipapi.co/json/");
      const locationData = await locationResponse.json();
      const userCity = locationData.city;
      const confirmation = window.confirm(
        `We detected your location as ${userCity}. Is this correct?`
      );

      if (confirmation) {
        updateOneCityWeather(userCity);
      } else {
        toast.error(
          "You did not confirm your location. Defaulting to Tel Aviv.",
          {
            position: "bottom-left",
          }
        );
        updateOneCityWeather("Tel Aviv");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  useEffect(() => {
    if (!firstVisitInApp) {
      fetchDataFirstTime();
    }
  }, [dispatch]);

  const updateNextFiveDay = async () => {
    const response =
      cityDetails.key && (await getNextFiveDays(cityDetails.key));
    if (response) {
      dispatch(setNextFiveDays(response));
    }
  };

  useEffect(() => {
    updateNextFiveDay();
  }, [cityDetails.key]);

  const [weatherIcon, setWeatherIcon] = useState(null);

  useEffect(() => {
    handleOnDynamicIcon();
  }, [cityDetails.key]);

  const handleOnDynamicIcon = async () => {
    setWeatherIcon(await loadDynamicImage(cityDetails.iconNumber));
  };

  return (
    <Container>
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <Search />
        <CelsiusOrFahrenheit />
      </div>
      <Square isDarkMode>
        <UpperPart>
          <div>
            <h2>{cityDetails?.englishName}</h2>
            <div style={{ display: "flex", alignItems: "center" }}>
              <p>{displayCelsiusOrFahrenheit()}</p>
              {weatherIcon && (
                <img
                  src={weatherIcon}
                  style={{ height: "64px", width: "64px" }}
                  alt="icon"
                />
              )}
            </div>
          </div>
          <FavoriteButton keyProp={cityDetails.key} />
        </UpperPart>
        <WeatherText>{cityDetails.weatherText}</WeatherText>
        <Tabs>
          {nextFiveDays.map((oneDay: OneDayWeatherType) => (
            <OneDayWeather
              celsius={parseInt(oneDay.celsius)}
              fahrenheit={parseInt(oneDay.fahrenheit)}
              day={oneDay.day}
              isCelsius={true}
              key={oneDay.day}
            />
          ))}
        </Tabs>
      </Square>
      <ToastContainer />
    </Container>
  );
};

export default Home;
