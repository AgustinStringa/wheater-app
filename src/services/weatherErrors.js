/**
 * Base class for all weather service errors
 */
export class WeatherServiceError extends Error {
  constructor(message, { statusCode = null, originalError = null } = {}) {
    super(message);
    this.name = 'WeatherServiceError';
    this.statusCode = statusCode;
    this.originalError = originalError;
  }
}

/**
 * Thrown when the requested city or country is not found (HTTP 404)
 */
export class CityNotFoundError extends WeatherServiceError {
  constructor(city, country) {
    const location = [city, country].filter(Boolean).join(', ');
    super(`No se encontró información meteorológica para "${location}".`, { statusCode: 404 });
    this.name = 'CityNotFoundError';
    this.city = city;
    this.country = country;
  }
}

/**
 * Thrown when the API key is missing, invalid or unauthorized (HTTP 401)
 */
export class UnauthorizedError extends WeatherServiceError {
  constructor(message = 'API Key no válida o no autorizada.') {
    super(message, { statusCode: 401 });
    this.name = 'UnauthorizedError';
  }
}

/**
 * Thrown when API quota or rate limit is exceeded (HTTP 429)
 */
export class RateLimitError extends WeatherServiceError {
  constructor(message = 'Se ha superado el límite de solicitudes a la API. Intente más tarde.') {
    super(message, { statusCode: 429 });
    this.name = 'RateLimitError';
  }
}

/**
 * Thrown when a network failure occurs (offline, DNS failure, connection refused)
 */
export class NetworkError extends WeatherServiceError {
  constructor(originalError) {
    super('Error de conexión. Verifique su acceso a internet.', { originalError });
    this.name = 'NetworkError';
  }
}
