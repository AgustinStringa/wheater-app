# Base de Conocimiento (Knowledge Base)

Repositorio de conceptos, patrones y aprendizajes técnicos consolidados durante la evolución y modernización de la aplicación **Weather App**.

---

## Índice de Temas

1. [01. Migración de Create React App a Vite](./01-migracion-cra-a-vite.md)
   - Configuración de `fnm` y Node.js.
   - Pasos clave de migración a Vite 8, Vitest y Tailwind CSS 4.
   - Diferencias en estructura de archivos (`index.html`, extensiones `.jsx`).

2. [02. Patrones de Exportación de Módulos (Dual Exports)](./02-patrones-exportacion-modulos.md)
   - Named Exports vs Default Exports.
   - Por qué y cuándo utilizar exportación dual en capas de servicios.

3. [03. Cancelación de Peticiones: AbortController & AbortSignal](./03-abortcontroller-y-abortsignal.md)
   - Qué es `AbortController` (Web API nativa vs componente de React).
   - Cómo funciona `AbortSignal` con `fetch`.
   - Prevención de condiciones de carrera (*Race Conditions*) en hooks `useEffect`.

4. [04. Arquitectura de Servicios y Manejo de Errores Tipados](./04-arquitectura-servicios-y-errores-tipados.md)
   - Separación de responsabilidades (SRP) en React.
   - Patrón Adaptador / DTO para normalización de datos.
   - Jerarquía de excepciones personalizadas para captura semántica.
   - Gestión de variables de entorno con `import.meta.env`.

5. [05. Testing Unitario y Estrategias de Mocking con Vitest](./05-testing-y-mocking-con-vitest.md)
   - Diferencias entre `vi.stubGlobal`, `vi.mock` y `vi.spyOn`.
   - Uso de `mockResolvedValueOnce` y `mockRejectedValueOnce`.
   - Filosofía de tests unitarios aislados y deterministas.
