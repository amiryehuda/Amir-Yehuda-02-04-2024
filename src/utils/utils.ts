import axios from "axios";
import { urls } from "./urls";
import { convertToCelsius, getShortDayName } from "./helpers";
import { OneDayWeatherType } from "../store/weather/weatherSlice";
import { toast } from "react-toastify";

export const getUserLatLan = async (): Promise<string> => {
  try {
    if (navigator.geolocation) {
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        }
      );

      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      return `${latitude},${longitude}`;
    } else {
      console.error("Geolocation is not supported by your browser");
      toast.error("Geolocation is not supported by your browser");
      throw new Error("Geolocation is not supported by your browser");
    }
  } catch (error) {
    console.error("Error getting location:", error);
    toast.error("Error getting location - Please check your location settings");
    throw error;
  }
};

export const getLocationKey = async (
  cityName: string
): Promise<{ Key: string; englishName: string } | null> => {
  const url = urls.getLocationKeyUrl(cityName);

  try {
    const response = await axios.get(url);
    return {
      Key: response.data[0].Key,
      englishName: response.data[0].EnglishName,
    };
  } catch (error) {
    console.log("Error getLocationKey: ", error);
    return null;
  }
};

interface CityResponse {
  weatherText: string;
  iconNumber: number;
  fahrenheit: number;
  celsius: number;
}

export const getCityWeather = async (
  locationKey: string
): Promise<CityResponse | null> => {
  const url = urls.getCityWeatherUrl(locationKey);

  try {
    const response = await axios.get(url);
    return {
      weatherText: response.data[0].WeatherText,
      iconNumber: response.data[0].WeatherIcon,
      fahrenheit: Math.floor(response.data[0].Temperature.Imperial.Value),
      celsius: Math.floor(response.data[0].Temperature.Metric.Value),
    };
  } catch (error) {
    console.log("Error getCityWeather: ", error);
    return null;
  }
};

export const getNextFiveDays = async (
  locationKey: string
): Promise<OneDayWeatherType[] | [] | any> => {
  const url = urls.getFiveDaysWeatherUrl(parseInt(locationKey));

  try {
    const response: any = await axios.get(url);
    const parsedForecasts: {
      day: string;
      celsius: number;
      fahrenheit: number;
    }[] = [];

    if (response) {
      response.data.DailyForecasts.map((forecast: any) => {
        const day = getShortDayName(forecast.Date);
        const fahrenheitMin = forecast.Temperature.Minimum.Value;
        const fahrenheitMax = forecast.Temperature.Maximum.Value;
        const celsiusMin = convertToCelsius(fahrenheitMin);
        const celsiusMax = convertToCelsius(fahrenheitMax);
        const celsiusAverage = (celsiusMin + celsiusMax) / 2;
        const fahrenheitAverage = (fahrenheitMin + fahrenheitMax) / 2;

        parsedForecasts.push({
          day,
          celsius: celsiusAverage,
          fahrenheit: fahrenheitAverage,
        });
      });

      return parsedForecasts;
    } else {
      return [];
    }
  } catch (error) {
    console.log("Error getNextFiveDays: ", error);
    return [];
  }
};

interface CityInfo {
  name: string;
  Key: string;
}

const extractCities = (response: any[]): CityInfo[] => {
  return response.map((city) => ({
    name: city.LocalizedName,
    Key: city.Key,
  }));
};

export const getSearchLocations = async (
  searchQuery: string
): Promise<OneDayWeatherType[] | [] | any> => {
  const url = urls.getSearchUrl(searchQuery);

  try {
    const response = await axios.get(url);
    const cities = extractCities(response.data);

    return cities;
  } catch (error) {
    console.log("Error getSearchLocations: ", error);
    return [];
  }
};
