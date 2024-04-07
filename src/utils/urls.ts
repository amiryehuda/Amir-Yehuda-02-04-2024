// const apiKey: string = `?apikey=${process.env.REACT_APP_API_KEY}`;
const apiKey: string = `?apikey=${process.env.REACT_APP_API_KEY2}`;

const baseSearchLocations =
  "http://dataservice.accuweather.com/locations/v1/cities/autocomplete";
const baseFiveDaysWeatherUrl = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/`;
const basePathCurrentWeather =
  "http://dataservice.accuweather.com/currentconditions/v1/";
const baseGetLocationKey = `http://dataservice.accuweather.com/locations/v1/cities/search`;

const getSearchUrl = (searchQuery: string) => {
  return `${baseSearchLocations}${apiKey}&q=${searchQuery}`;
};

const getFiveDaysWeatherUrl = (cityId: number) => {
  return `${baseFiveDaysWeatherUrl}${cityId}${apiKey}`;
};

const getCityWeatherUrl = (cityId: string) => {
  return `${basePathCurrentWeather}${cityId}${apiKey}`;
};

const getLocationKeyUrl = (cityName: string) => {
  return `${baseGetLocationKey}${apiKey}&q=${cityName}`;
};

export const urls = {
  getSearchUrl,
  getCityWeatherUrl,
  getFiveDaysWeatherUrl,
  getLocationKeyUrl,
};
