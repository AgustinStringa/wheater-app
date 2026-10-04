# React Weather App

Aplicación web desarrollada con **React** y **Vite** para consultar en tiempo real las condiciones meteorológicas y el pronóstico del clima de diversas ciudades del mundo.

## Descripción

El usuario puede ingresar el nombre de una ciudad y seleccionar un país para consultar el estado del tiempo actual. La aplicación procesa la solicitud mediante una capa de servicio dedicada, presentando métricas clave de temperatura y condiciones ambientales, o informando si la ciudad no fue encontrada.

## Características principales

- **Consumo de OpenWeatherMap:** Integración con la API de [OpenWeatherMap](https://openweathermap.org/api) para obtener temperatura actual, máxima, mínima, sensación térmica y porcentaje de humedad.
- **Arquitectura de Servicios:**
  - Capa de servicio desacoplada (`weatherService`) con adaptador de datos (`weatherAdapter`) para normalizar respuestas.
  - Manejo granular de errores tipados (`CityNotFoundError`, `UnauthorizedError`, `NetworkError`).
  - Soporte de cancelación de solicitudes pendientes mediante `AbortController`.
- **Validaciones e Interfaz:**
  - Formulario con validación de campos obligatorios.
  - Panel informativo con iconos y formato de temperatura en grados Celsius.
  - Componentes unificados (`Header`, `Footer`) del paquete compartido del workspace.

## Stack tecnológico

- **React 17** (Hooks: `useState`, `useEffect`, composición de componentes)
- **Vite** (Herramienta de bundling y entorno de desarrollo)
- **Tailwind CSS v4** y **Materialize CSS** para el diseño visual y la grilla responsive
- **Vitest** y **Testing Library** para la suite de pruebas unitarias y de integración

## Configuración y Variables de Entorno

Para realizar consultas a la API de OpenWeatherMap, crea un archivo `.env` en la raíz del proyecto tomando como referencia `.env.example`:

```env
VITE_OPENWEATHER_API_KEY=tu_api_key_aqui
VITE_OPENWEATHER_BASE_URL=https://api.openweathermap.org/data/2.5
```

## Scripts disponibles

En el directorio del proyecto puedes ejecutar:

```bash
# Iniciar servidor de desarrollo en http://localhost:5173
npm start

# Compilar para producción
npm run build

# Previsualizar el bundle de producción
npm run preview

# Ejecutar tests con Vitest
npm test -- --run
```
