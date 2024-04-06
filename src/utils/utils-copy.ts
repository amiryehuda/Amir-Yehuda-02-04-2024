import axios from "axios";
import { urls } from "./urls";
import getLocationKeyResponse from "../mock/locationKey.json";

export const APIKEY = "Kvi2wO4vAXpyeKCYNVJxoyGBtGGAD8bl";
const BASEURL = "http://dataservice.accuweather.com";

interface Position {
  latitude: number;
  longitude: number;
}

interface LocationData {
  ParentCity?: {
    EnglishName: string;
  };
  LocalizedName: string;
}

export const getUserCity = async (
  position: Position
): Promise<string | null> => {
  const { latitude, longitude } = position;
  const url = urls.getGeoLocationUrl(
    `${position.latitude},${position.longitude}`
  );
  // const url = `${BASEURL}/locations/v1/cities/geoposition/search?apikey=${APIKEY}&q=${latitude},${longitude}`;

  try {
    const response = await axios.get<LocationData>(url);
    const city = response.data.ParentCity
      ? response.data.ParentCity.EnglishName
      : response.data.LocalizedName;
    console.log(city);

    return city;
  } catch (error) {
    console.error("Error fetching user city:", error);
    return null;
  }
};

interface CurrentConditions {
  // Define the structure of the current conditions data
}

export const getCurrentConditions = async (
  locationKey: string
): Promise<CurrentConditions | null> => {
  const url = `${BASEURL}/currentconditions/v1/${locationKey}?apikey=${APIKEY}`;

  try {
    const response = await axios.get<any>(url);
    console.log(response.data[0]);

    return response.data[0];
  } catch (error) {
    console.error("Error fetching current conditions:", error);
    return null;
  }
};

interface DailyForecast {
  // Define the structure of the daily forecast data
}

export const getFiveDayForecast = async (
  locationKey: string
): Promise<DailyForecast[] | null> => {
  const url = `${BASEURL}/forecasts/v1/daily/5day/${locationKey}?apikey=${APIKEY}`;

  try {
    const response = await axios.get<{ DailyForecasts: DailyForecast[] }>(url);
    return response.data.DailyForecasts;
  } catch (error) {
    console.error("Error fetching five-day forecast:", error);
    return null;
  }
};

////////////////////////////////////////////////////////////////////////////

interface LocationSearchResult {
  Key: string;
  LocalizedName: string;
  EnglishName: string;
  AdministrativeArea?: {
    EnglishName: string;
  };
  Country: {
    EnglishName: string;
  };
}

// export const getLocationKey = async (city: string): Promise<string | null> => {
//   const url = `${BASEURL}/locations/v1/cities/search?apikey=${APIKEY}&q=${encodeURIComponent(
//     city
//   )}`;

//   try {
//     const response = await axios.get<LocationSearchResult[]>(url);
//     const location = response.data.find(
//       (loc) => loc.EnglishName.toLowerCase() === city.toLowerCase()
//       //&&
//       //     (countryName
//       //       ? loc.Country.EnglishName.toLowerCase() === countryName.toLowerCase()
//       //       : true)
//     );
//     console.log(location);

//     return location ? location.Key : null;
//     // return "215854";
//   } catch (error) {
//     console.error("Error getLocationKey:", error);
//     return null;
//   }
// };
