# 01. Migración de Create React App a Vite & Configuración de Node con FNM

## 1. Configuración de Entorno con FNM (Fast Node Manager)

En PowerShell para Windows, la inicialización del entorno de `fnm` y la selección de versión específica de Node se realiza con:

```powershell
fnm env --use-on-cd --shell power-shell | Out-String | Invoke-Expression
fnm use 24.16.0
```

> **Nota:** Esto asegura que la terminal actual use la versión correcta de Node (`v24.16.0`) y `npm` (`11.13.0`), evitando conflictos de versiones y dependencias nativas.

---

## 2. Puntos Clave en la Migración de Create React App a Vite

### 2.1 `package.json`
- **Módulo ES nativo**: Agregar `"type": "module"`.
- **Eliminación de `react-scripts`**: Se eliminan `react-scripts` y las configuraciones de eslint vinculadas (`eslint-config-react-app`).
- **Nuevos scripts**:
  ```json
  "scripts": {
    "start": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest"
  }
  ```
- **Dependencias de desarrollo actualizadas**:
  - `vite`, `@vitejs/plugin-react`
  - `vitest`, `jsdom`, `@testing-library/react`, `@testing-library/jest-dom`
  - `tailwindcss`, `@tailwindcss/vite`

### 2.2 Reubicación y Modificación de `index.html`
En Create React App, `index.html` vive dentro de `public/`. En Vite:
1. Se mueve a la **raíz del proyecto** (`./index.html`) con `git mv public/index.html ./index.html`.
2. Se eliminan las referencias a `%PUBLIC_URL%` (ej: `%PUBLIC_URL%/favicon.ico` ➔ `/favicon.ico`).
3. Se reemplaza la meta etiqueta obsoleta de color por:
   ```html
   <meta name="color-scheme" content="light dark" />
   ```
4. Se agrega el punto de entrada como script de tipo módulo antes del cierre de `</body>`:
   ```html
   <script type="module" src="src/index.jsx"></script>
   ```

### 2.3 Extensión de Componentes React (`.jsx`)
Vite requiere estrictamente que los archivos que contienen sintaxis JSX tengan la extensión `.jsx` (y no `.js` como permitía CRA).
Se utilizó `git mv` para preservar el historial de Git:
```powershell
git mv src/App.js src/App.jsx
git mv src/index.js src/index.jsx
```

### 2.4 Configuración de Vite (`vite.config.js`)
Se define el archivo raíz de configuración integrando plugins y testing:

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
  },
});
```

### 2.5 Integración de Tailwind CSS 4
En Tailwind CSS v4 con `@tailwindcss/vite`, la configuración se simplifica eliminando `tailwind.config.js` y agregando únicamente la directiva CSS al inicio del archivo principal:

```css
/* src/index.css */
@import "tailwindcss";
```
