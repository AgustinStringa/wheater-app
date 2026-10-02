# 03. Cancelación de Peticiones: AbortController & AbortSignal

## 1. ¿Qué es `AbortController`?

`AbortController` **no es un componente de React** ni una librería externa. Es una **interfaz nativa estándar de JavaScript** (Web API presente en todos los navegadores modernos y en Node.js).

Su propósito principal es permitir la **cancelación de operaciones asíncronas**, principalmente peticiones HTTP realizadas con `fetch()`.

---

## 2. Componentes de la API: Controller y Signal

`AbortController` consta de dos partes:
1. **El Controlador (`AbortController`)**: El objeto que tiene el método `.abort()` para emitir la orden de cancelación.
2. **La Señal (`controller.signal`)**: Un objeto `AbortSignal` que se pasa como parámetro a la tarea asíncrona (como `fetch`) para que esta "escuche" cuándo detenerse.

```javascript
// 1. Crear el controlador
const controller = new AbortController();

// 2. Extraer la señal
const { signal } = controller;

// 3. Pasar la señal a fetch
fetch('https://api.openweathermap.org/...', { signal })
  .then(res => res.json())
  .catch(err => {
    if (err.name === 'AbortError') {
      console.log('Petición cancelada exitosamente.');
    }
  });

// 4. Cancelar cuando sea necesario
controller.abort();
```

---

## 3. El Problema en React: Condiciones de Carrera (*Race Conditions*)

En aplicaciones React con consultas asíncronas, surge frecuentemente el siguiente problema:

1. El usuario busca la ciudad **"Roma"**. La petición `fetch("Roma")` sale por internet.
2. Antes de que responda, el usuario cambia rápidamente de opinión y escribe **"París"**. La petición `fetch("París")` se inicia.
3. Si la red responde a *"París"* en 200ms y a *"Roma"* en 800ms:
   - Primero se renderiza París.
   - 600ms después llega la respuesta tardía de Roma y **sobrescribe la pantalla con datos desactualizados**.

Además, si el componente se desmonta mientras la petición está en vuelo, intentar actualizar el estado (`setApiData`) genera advertencias de memoria o comportamiento inesperado.

---

## 4. Solución con `AbortController` en `useEffect`

Se utiliza la función de limpieza (**cleanup function**) que retorna `useEffect`:

```jsx
// src/App.jsx
useEffect(() => {
  if (!consultar) return;

  // 1. Instanciar controlador para esta ejecución
  const controller = new AbortController();

  const fetchWeather = async () => {
    try {
      // 2. Enviar controller.signal al servicio
      const data = await weatherService.getWeatherByCity(city, country, {
        signal: controller.signal,
      });
      setApiData(data);
    } catch (error) {
      // 3. Si fue abortado deliberadamente, ignorar el error silenciosamente
      if (error.name === 'AbortError') return;

      // Manejo de otros errores reales
      handleError(error);
    }
  };

  fetchWeather();

  // 4. Cleanup: se ejecuta cuando cambian las dependencias o el componente se destruye
  return () => {
    controller.abort(); // Cancela la petición anterior en vuelo
  };
}, [consultar, city, country]);
```

---

## 5. Soporte en el Servicio (`WeatherService`)

Para que el servicio no bloquee la señal, simplemente debe recibirla y propagarla al `fetch`:

```javascript
// src/services/weatherService.js
async getWeatherByCity(city, country = '', { signal } = {}) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      signal, // <-- Se delega la señal directamente a fetch
    });
    // ...
  } catch (err) {
    if (err.name === 'AbortError') {
      throw err; // Re-lanzar para que el componente identifique la cancelación
    }
    throw new NetworkError(err);
  }
}
```
