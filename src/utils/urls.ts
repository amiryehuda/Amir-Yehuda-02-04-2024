const apiKey = "?apikey=Kvi2wO4vAXpyeKCYNVJxoyGBtGGAD8bl";

const baseGeoLocationUrl = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search`;

const getGeoLocationUrl = (locationLatLan: string) => {
  return `${baseGeoLocationUrl}${apiKey}&q=${locationLatLan}`;
};

/////////////////////////////////////////////////////////////////////////
const baseSearchLocations =
  "http://dataservice.accuweather.com/locations/v1/cities/autocomplete";
const getSearchUrl = (searchQuery: string) => {
  return `${baseSearchLocations}${apiKey}&q=${searchQuery}`;
};

const baseFiveDaysWeatherUrl = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/`;
const getFiveDaysWeatherUrl = (cityId: number) => {
  return `${baseFiveDaysWeatherUrl}${cityId}${apiKey}`;
};

const basePathCurrentWeather =
  "http://dataservice.accuweather.com/currentconditions/v1/";
const getCityWeatherUrl = (cityId: string) => {
  return `${basePathCurrentWeather}${cityId}${apiKey}`;
};

const baseGetLocationKey = `http://dataservice.accuweather.com/locations/v1/cities/search`;
const getLocationKeyUrl = (cityName: string) => {
  return `${baseGetLocationKey}${apiKey}&q=${cityName}`;
};

export const urls = {
  getSearchUrl,
  getCityWeatherUrl,
  getFiveDaysWeatherUrl,
  getGeoLocationUrl,
  getLocationKeyUrl,
};
