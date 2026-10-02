# 05. Testing Unitario y Estrategias de Mocking con Vitest

## 1. Filosofía de los Tests Unitarios

Los tests unitarios deben evaluar el comportamiento de un módulo de forma **aislada**, **instantánea** y **determinista**:
- **No deben depender de internet**: No deben hacer llamadas de red reales a OpenWeatherMap.
- **No deben consumir cuotas de API**.
- **Deben poder simular situaciones extremas**: Caídas de red, timeouts, errores 500, respuestas inválidas, límites de consulta alcanzados (429).

---

## 2. Estrategias de Mocking en Vitest

Vitest ofrece tres mecanismos principales para simular dependencias según su naturaleza:

| Mecanismo | Cuándo Usarlo | Ejemplo |
| :--- | :--- | :--- |
| **`vi.stubGlobal()`** | Reemplazar variables o APIs globales del navegador o runtime (`globalThis`). | `fetch`, `localStorage`, `navigator.clipboard`, `sessionStorage`, `location`. |
| **`vi.mock()`** | Simular módulos o archivos importados mediante `import`. | `vi.mock('../helpers/helper-result-panel')`, librerías como `axios`. |
| **`vi.spyOn()`** | Espiar o interceptar un método específico en un objeto ya existente. | `vi.spyOn(console, 'error')`, `vi.spyOn(service, 'getWeatherByCity')`. |

---

## 3. Ejemplo Práctico: Mockeando `fetch` con `vi.stubGlobal`

En [src/\_\_tests\_\_/weatherService.test.js](../src/\_\_tests\_\_/weatherService.test.js):

```javascript
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { WeatherService } from '../services/weatherService';
import { CityNotFoundError, NetworkError } from '../services/weatherErrors';

describe('WeatherService', () => {
  let service;

  beforeEach(() => {
    service = new WeatherService({ apiKey: 'mock-key', baseUrl: 'https://api.test' });
    // 1. Sobrescribir el fetch global con una función espía de Vitest
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    // 2. Restaurar todos los mocks para no contaminar otras suites de pruebas
    vi.restoreAllMocks();
  });

  it('debe retornar datos normalizados cuando la respuesta es 200 OK', async () => {
    // 3. Simular una respuesta exitosa
    fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({
        name: 'Buenos Aires',
        main: { temp: 295.15, temp_max: 297.15, temp_min: 293.15, feels_like: 295.10, humidity: 60, pressure: 1013 },
        weather: [{ main: 'Clear', description: 'cielo claro', icon: '01d' }],
        wind: { speed: 3.6, deg: 180, gust: 5.1 },
      }),
    });

    const result = await service.getWeatherByCity('Buenos Aires', 'Argentina');

    // 4. Aserciones sobre la llamada y el resultado
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(result.name).toBe('Buenos Aires');
    expect(result.temp).toBe(295.15);
  });

  it('debe lanzar CityNotFoundError cuando el status es 404', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({ cod: '404', message: 'city not found' }),
    });

    await expect(service.getWeatherByCity('CiudadInexistente')).rejects.toBeInstanceOf(CityNotFoundError);
  });

  it('debe lanzar NetworkError cuando hay un fallo de red', async () => {
    // 5. Simular fallo de promesa rechazada (como error DNS o sin conexión)
    fetch.mockRejectedValueOnce(new TypeError('Failed to fetch'));

    await expect(service.getWeatherByCity('Londres')).rejects.toBeInstanceOf(NetworkError);
  });
});
```

---

## 4. `mockResolvedValueOnce` vs `mockRejectedValueOnce`

- **`mockResolvedValueOnce(value)`**: Hace que la función mock retorne una `Promise` que se **resuelve** exitosamente con el valor indicado (simula que la petición HTTP llegó y devolvió respuesta).
- **`mockRejectedValueOnce(error)`**: Hace que la función mock retorne una `Promise` que se **rechaza** con un error (simula que el cable de red se desconectó, fallo DNS o error crítico de red que impide que `fetch` reciba una respuesta HTTP).
