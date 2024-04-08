import React, { useEffect, useState } from "react";

import { Container, Square, Tabs, UpperPart, WeatherText } from "./style";
import OneDayWeather from "./components/OneDayWeather/OneDayWeather";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  getCityWeather,
  getLocationKey,
  getNextFiveDays,
  getUserLatLan,
} from "../../utils/utils";
import {
  ICity,
  OneDayWeatherType,
  setCurrentCity,
  setNextFiveDays,
} from "../../store/weather/weatherSlice";
import Search from "../../components/Search/Search";
import FavoriteButton from "./components/FavoriteButton/FavoriteButton";
import CelsiusOrFahrenheit from "../../components/CelsiusOrFahrenheit/CelsiusOrFahrenheit";
import { loadDynamicImage } from "../../utils/helpers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface HomeI {
  firstVisitInApp: boolean;
  setFirstVisitInApp: (state: boolean) => void;
}
const Home: React.FC<HomeI> = ({ firstVisitInApp, setFirstVisitInApp }) => {
  const dispatch = useAppDispatch();
  const settingsState = useAppSelector((state) => state.settings);
  const cityDetails = useAppSelector((state) => state.weather.currentCity);
  const nextFiveDays = useAppSelector((state) => state.weather.nextFiveDays);
  const [weatherIcon, setWeatherIcon] = useState(null);

  const displayCelsiusOrFahrenheit = () => {
    if (settingsState.isCelsius) {
      return cityDetails.celsius && `${cityDetails.celsius}°C`;
    } else {
      return cityDetails.fahrenheit && `${cityDetails.fahrenheit}°F`;
    }
  };

  const GetLocationByLatitudeAndLongitude = async (LatLan: string) => {
    const response = await getLocationKey(LatLan);
    if (response) {
      const { Key, englishName } = response;
      const restCityParams = await getCityWeather(Key);
      if (restCityParams) {
        const { weatherText, iconNumber, celsius, fahrenheit } = restCityParams;
        dispatch(
          setCurrentCity({
            key: Key,
            englishName: englishName,
            weatherText: weatherText,
            iconNumber: iconNumber,
            fahrenheit: fahrenheit,
            celsius: celsius,
          })
        );
        !firstVisitInApp && setFirstVisitInApp(true);
      }
    }
  };

  const updateCurrentCityWeather = async (confirmLocation: boolean) => {
    if (confirmLocation) {
      const currentLatLan = await getUserLatLan();
      GetLocationByLatitudeAndLongitude(currentLatLan);
    } else {
      const TelAvivLatLan = "32.0853,34.7818";
      GetLocationByLatitudeAndLongitude(TelAvivLatLan);
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
        updateCurrentCityWeather(confirmation);
      } else {
        toast.error(
          "You did not confirm your location. Defaulting to Tel Aviv.",
          {
            position: "bottom-left",
          }
        );

        updateCurrentCityWeather(confirmation);
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  const updateNextFiveDay = async () => {
    const response =
      cityDetails.key && (await getNextFiveDays(cityDetails.key));
    if (response) {
      dispatch(setNextFiveDays(response));
    }
  };

  useEffect(() => {
    // if (!firstVisitInApp) {
    //   fetchDataFirstTime();
    // }
  }, []);

  useEffect(() => {
    // checkIsFavorite();
    // updateNextFiveDay();
    // handleOnDynamicIcon();
  }, [cityDetails.key]);

  const handleOnDynamicIcon = async () => {
    setWeatherIcon(await loadDynamicImage(cityDetails.iconNumber));
  };

  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const checkIsFavorite = () => {
    const favoritesString = localStorage.getItem("favorites");
    if (favoritesString) {
      const favorites: ICity[] = JSON.parse(favoritesString);
      const found = favorites.some((item) => item.key === cityDetails?.key);
      setIsFavorite(found);
    }
  };

  return (
    <Container>
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <Search />
        <CelsiusOrFahrenheit />
      </div>
      <Square>
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

          <FavoriteButton
            keyProp={cityDetails.key}
            isFavorite={isFavorite}
            setIsFavorite={setIsFavorite}
          />
        </UpperPart>
        <WeatherText>{cityDetails.weatherText}</WeatherText>
        <Tabs>
          {nextFiveDays.map((oneDay: OneDayWeatherType) => (
            <OneDayWeather
              celsius={parseInt(oneDay.celsius)}
              fahrenheit={parseInt(oneDay.fahrenheit)}
              day={oneDay.day}
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
