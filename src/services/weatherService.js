import {
  WeatherServiceError,
  CityNotFoundError,
  UnauthorizedError,
  RateLimitError,
  NetworkError,
} from './weatherErrors';
import { normalizeWeatherResponse } from './weatherAdapter';

export class WeatherService {
  /**
   * @param {Object} config
   * @param {string} config.apiKey - OpenWeatherMap API Key
   * @param {string} [config.baseUrl='https://api.openweathermap.org/data/2.5'] - Base API URL
   */
  constructor({
    apiKey,
    baseUrl = 'https://api.openweathermap.org/data/2.5',
  } = {}) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl.replace(/\/+$/, '');
  }

  /**
   * Builds full query URL
   * @private
   */
  _buildUrl(city, country) {
    const query = [city, country].filter(Boolean).map((s) => String(s).trim()).join(',');
    const params = new URLSearchParams({
      q: query,
      appid: this.apiKey || '',
    });

    return `${this.baseUrl}/weather?${params.toString()}`;
  }

  /**
   * Fetches weather data for a given city and country
   * @param {string} city - City name
   * @param {string} [country=''] - Country code or name
   * @param {Object} [options]
   * @param {AbortSignal} [options.signal]
   * @returns {Promise<Object>} Normalized weather data
   */
  async getWeatherByCity(city, country = '', { signal } = {}) {
    if (!city || typeof city !== 'string' || !city.trim()) {
      throw new WeatherServiceError('El nombre de la ciudad es requerido.');
    }

    const url = this._buildUrl(city, country);

    let response;
    try {
      response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
        },
        signal,
      });
    } catch (err) {
      if (err.name === 'AbortError') {
        throw err;
      }
      throw new NetworkError(err);
    }

    let payload;
    try {
      payload = await response.json();
    } catch (err) {
      throw new WeatherServiceError('Respuesta no válida del servidor meteorológico.', {
        statusCode: response.status,
        originalError: err,
      });
    }

    if (!response.ok) {
      this._handleHttpError(response.status, payload, city, country);
    }

    // Some versions of OpenWeather return { cod: "404", message: "city not found" } with status 200/404
    if (String(payload?.cod) === '404') {
      throw new CityNotFoundError(city, country);
    }

    return normalizeWeatherResponse(payload);
  }

  /**
   * Maps HTTP error status codes to typed exceptions
   * @private
   */
  _handleHttpError(status, payload, city, country) {
    const message = payload?.message || `Error en la solicitud HTTP (${status})`;

    if (status === 404 || String(payload?.cod) === '404') {
      throw new CityNotFoundError(city, country);
    }

    if (status === 401) {
      throw new UnauthorizedError(message);
    }

    if (status === 429) {
      throw new RateLimitError(message);
    }

    throw new WeatherServiceError(message, { statusCode: status });
  }
}
