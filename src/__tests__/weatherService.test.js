import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { WeatherService } from '../services/weatherService';
import {
  WeatherServiceError,
  CityNotFoundError,
  UnauthorizedError,
  RateLimitError,
  NetworkError,
} from '../services/weatherErrors';

describe('WeatherService', () => {
  const mockApiKey = 'test-api-key-123';
  const mockBaseUrl = 'https://api.openweathermap.org/data/2.5';
  let service;

  beforeEach(() => {
    service = new WeatherService({ apiKey: mockApiKey, baseUrl: mockBaseUrl });
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('debe lanzar WeatherServiceError si la ciudad no está especificada o está vacía', async () => {
    await expect(service.getWeatherByCity('')).rejects.toThrow(WeatherServiceError);
    await expect(service.getWeatherByCity('   ')).rejects.toThrow('El nombre de la ciudad es requerido.');
  });

  it('debe retornar datos normalizados cuando la respuesta es 200 OK', async () => {
    const rawMockResponse = {
      coord: { lon: -58.3772, lat: -34.6132 },
      weather: [{ id: 800, main: 'Clear', description: 'cielo claro', icon: '01d' }],
      main: {
        temp: 295.15,
        feels_like: 295.10,
        temp_min: 293.15,
        temp_max: 297.15,
        pressure: 1013,
        humidity: 60,
      },
      wind: { speed: 3.6, deg: 180, gust: 5.1 },
      name: 'Buenos Aires',
      cod: 200,
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => rawMockResponse,
    });

    const result = await service.getWeatherByCity('Buenos Aires', 'Argentina');

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      'https://api.openweathermap.org/data/2.5/weather?q=Buenos+Aires%2CArgentina&appid=test-api-key-123',
      expect.objectContaining({
        method: 'GET',
        headers: { Accept: 'application/json' },
      })
    );

    expect(result).toEqual({
      name: 'Buenos Aires',
      temp: 295.15,
      temp_max: 297.15,
      temp_min: 293.15,
      feels_like: 295.10,
      humidity: 60,
      pressure: 1013,
      main: 'Clear',
      description: 'cielo claro',
      icon: '01d',
      speed: 3.6,
      deg: 180,
      gust: 5.1,
      tempMax: 297.15,
      tempMin: 293.15,
      feelsLike: 295.10,
    });
  });

  it('debe lanzar CityNotFoundError cuando la API responde con status 404', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({ cod: '404', message: 'city not found' }),
    });

    await expect(service.getWeatherByCity('NonExistentCity', 'XX')).rejects.toBeInstanceOf(CityNotFoundError);
  });

  it('debe lanzar CityNotFoundError cuando la API responde con status 200 pero cod "404"', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ cod: '404', message: 'city not found' }),
    });

    await expect(service.getWeatherByCity('NonExistentCity', 'XX')).rejects.toBeInstanceOf(CityNotFoundError);
  });

  it('debe lanzar UnauthorizedError cuando la API responde con 401', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: async () => ({ cod: 401, message: 'Invalid API key' }),
    });

    await expect(service.getWeatherByCity('London', 'GB')).rejects.toBeInstanceOf(UnauthorizedError);
  });

  it('debe lanzar RateLimitError cuando la API responde con 429', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 429,
      json: async () => ({ cod: 429, message: 'Too many requests' }),
    });

    await expect(service.getWeatherByCity('London', 'GB')).rejects.toBeInstanceOf(RateLimitError);
  });

  it('debe lanzar NetworkError cuando fetch falla por error de red', async () => {
    fetch.mockRejectedValueOnce(new TypeError('Failed to fetch'));

    await expect(service.getWeatherByCity('London', 'GB')).rejects.toBeInstanceOf(NetworkError);
  });
});
