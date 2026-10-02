# 02. Patrones de Exportación de Módulos (Dual Exports)

## 1. Named Exports vs Default Exports en JavaScript (ES Modules)

En JavaScript moderno existen dos formas fundamentales de exportar código desde un módulo:

### 1.1 Named Exports (Exportaciones Nombradas)
Exportan valores asociados a su identificador explícito:

```javascript
// Definición
export const weatherService = new WeatherService();
export class CityNotFoundError extends Error {}

// Consumo (requiere llaves {} y nombres exactos)
import { weatherService, CityNotFoundError } from './services';
```

**Ventajas:**
- Facilita el autocompletado del IDE (IntelliSense).
- Permite exportar múltiples utilidades, clases y constantes desde el mismo archivo.
- Evita renombrados accidentales o confusos en el archivo consumidor.

---

### 1.2 Default Export (Exportación por Defecto)
Define el valor principal que representa al módulo:

```javascript
// Definición
export default weatherService;

// Consumo (sin llaves {}, el consumidor puede elegir el nombre)
import weatherService from './services';
import miServicioClima from './services'; // Válido
```

**Ventajas:**
- Sintaxis más limpia cuando un archivo tiene una única responsabilidad evidente.
- Muy utilizado en componentes de React (`export default App`).

---

## 2. ¿Por qué usamos Exportación Dual en `src/services/index.js`?

En la arquitectura del proyecto, el archivo `index.js` actúa como una fachada (**Barrel / Facade Pattern**) que centraliza todo lo relativo a la capa de servicios:

```javascript
// src/services/index.js
import { WeatherService } from './weatherService';

export * from './weatherErrors';
export * from './weatherAdapter';
export * from './weatherService';

export const weatherService = new WeatherService({ apiKey, baseUrl });
export default weatherService;
```

### Beneficios para el desarrollador:

1. **Flexibilidad total al importar:**
   - Si solo se necesita el servicio principal:
     ```javascript
     import weatherService from './services';
     ```
   - Si se necesita el servicio junto a clases de error tipadas para control de excepciones:
     ```javascript
     import { weatherService, CityNotFoundError, NetworkError } from './services';
     ```
2. **Cero fricción mental:** Quien consume el módulo no necesita recordar si se diseñó como `default` o `named`; ambas opciones funcionan correctamente.
