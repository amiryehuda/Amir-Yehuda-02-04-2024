import axios from "axios";
import { urls } from "./urls";
//mock data
import cityResponse from "../mock/tlvLocation.json";
import nextFiveDaysResponse from "../mock/fiveDays.json";
import { convertToCelsius, getShortDayName } from "./helpers";
import { OneDayWeatherType } from "../store/weather/weatherSlice";
import searchResponse from "../mock/searchReaponse.json";

export const getLocationKey = async (
  cityName: string
): Promise<{ key: string; englishName: string } | null> => {
  // const url = urls.getLocationKeyUrl(cityName);

  try {
    // const response = await axios.get(url);
    // return {key: response.data[0].key, englishName:response.data[0].EnglishName};
    return { key: "215854", englishName: "TeL Aviv" };
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
    // const response = await axios.get(url);
    // return {
    //   weatherText: response.data[0].WeatherText,
    //   iconNumber: response.data[0].WeatherIcon,
    //   fahrenheit: Math.floor( response.data[0].Temperature.Imperial.Value),
    //   celsius: Math.floor(response.data[0].Temperature.Metric.Value) ,
    // };
    /////////////////////////////////
    const response = cityResponse;
    return {
      weatherText: response[0].WeatherText,
      iconNumber: response[0].WeatherIcon,
      fahrenheit: Math.floor(response[0].Temperature.Imperial.Value),
      celsius: Math.floor(response[0].Temperature.Metric.Value),
    };
  } catch (error) {
    console.log("Error getLocationKey: ", error);
    return null;
  }
};

export const getNextFiveDays = async (
  locationKey: string
): Promise<OneDayWeatherType[] | [] | any> => {
  const url = urls.getFiveDaysWeatherUrl(parseInt(locationKey));

  try {
    // const response: any = await axios.get(url);
    // console.log(response);
    const response = nextFiveDaysResponse.DailyForecasts;
    const parsedForecasts: {
      day: string;
      celsius: number;
      fahrenheit: number;
    }[] = [];

    if (response) {
      // response.data.DailyForecasts.map((forecast: any) => {
      response.map((forecast: any) => {
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
      // console.log(parsedForecasts);
      return parsedForecasts;
    } else {
      return [];
    }
  } catch (error) {
    console.log("Error getLocationKey: ", error);
    return [];
  }
};

interface CityInfo {
  name: string;
  key: string;
}

const extractCities = (response: any[]): CityInfo[] => {
  return response.map((city) => ({
    name: city.LocalizedName,
    key: city.Key,
  }));
};

export const getSearchLocations = async (
  searchQuery: string
): Promise<OneDayWeatherType[] | [] | any> => {
  const url = urls.getSearchUrl(searchQuery);

  try {
    // const response = await axios.get(url);
    // console.log(response);
    const response2 = searchResponse;
    const cities = extractCities(response2);

    return cities;
  } catch (error) {
    console.log("Error getSearchLocations: ", error);
    return [];
  }
};
