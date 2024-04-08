const apiKey: string = `?apikey=H5CLIcQpQY99gtsKW4InLVgXHmBQxJfE`;

const baseSearchLocations =
  "https://dataservice.accuweather.com/locations/v1/cities/autocomplete";
const baseFiveDaysWeatherUrl = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/`;
const basePathCurrentWeather =
  "https://dataservice.accuweather.com/currentconditions/v1/";
const baseGetLocationKey = `https://dataservice.accuweather.com/locations/v1/cities/search`;

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
