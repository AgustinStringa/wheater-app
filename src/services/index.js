import { WeatherService } from './weatherService';

export * from './weatherErrors';
export * from './weatherAdapter';
export * from './weatherService';

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY || '';
const baseUrl = import.meta.env.VITE_OPENWEATHER_BASE_URL || 'https://api.openweathermap.org/data/2.5';

export const weatherService = new WeatherService({
  apiKey,
  baseUrl,
});

export default weatherService;
