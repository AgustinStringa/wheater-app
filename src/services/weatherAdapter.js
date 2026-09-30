/**
 * Adapts raw OpenWeatherMap API JSON response into a normalized WeatherData object
 * @param {Object} rawData - OpenWeatherMap API response
 * @returns {Object} Normalized weather data
 */
export function normalizeWeatherResponse(rawData) {
  if (!rawData || typeof rawData !== 'object') {
    throw new Error('Invalid weather payload received from API.');
  }

  const {
    name = '',
    main = {},
    weather = [],
    wind = {},
  } = rawData;

  const weatherDetails = Array.isArray(weather) && weather.length > 0 ? weather[0] : {};

  return {
    name,
    temp: main.temp ?? 0,
    temp_max: main.temp_max ?? main.temp ?? 0,
    temp_min: main.temp_min ?? main.temp ?? 0,
    feels_like: main.feels_like ?? main.temp ?? 0,
    humidity: main.humidity ?? 0,
    pressure: main.pressure ?? 0,
    main: weatherDetails.main ?? '',
    description: weatherDetails.description ?? '',
    icon: weatherDetails.icon ?? '',
    speed: wind.speed ?? 0,
    deg: wind.deg ?? 0,
    gust: wind.gust ?? 0,
    // CamelCase aliases for future modern components
    tempMax: main.temp_max ?? main.temp ?? 0,
    tempMin: main.temp_min ?? main.temp ?? 0,
    feelsLike: main.feels_like ?? main.temp ?? 0,
  };
}
