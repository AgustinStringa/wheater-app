# Documentación & Marco de Trabajo SDD (Spec-Driven Development)

Bienvenido a la documentación de **Weather App**. Este proyecto utiliza una metodología de **Desarrollo Guiado por Especificaciones (Spec-Driven Development / SDD)** para garantizar que cada nueva funcionalidad o refactorización sea determinista, trazable, mantenible y esté respaldada por pruebas automatizadas.

---

## 🧭 Navegación Rápida

- **[Flujo de Trabajo y Reglas SDD](./process/SDD_WORKFLOW.md)**: Guía detallada del proceso paso a paso (Análisis ➔ Spec ➔ Implementación ➔ Verificación).
- **[Plantilla de Análisis (Fase 1)](./templates/ANALYSIS_TEMPLATE.md)**: Formato para documentar el problema, alternativas y decisiones de diseño antes de redactar especificaciones.
- **[Plantilla de Especificación (Fase 2)](./templates/SPEC_TEMPLATE.md)**: Formato para la especificación técnica determinista con contratos, componentes y testing.

---

## 📋 Registro de Funcionalidades & Estado

| ID | Funcionalidad | Estado | Documento de Análisis | Especificación Técnica |
| :--- | :--- | :--- | :--- | :--- |
| `000` | *Plantilla de Ejemplo / Demo* | `Aprobada` | [analysis.md](./templates/ANALYSIS_TEMPLATE.md) | [spec.md](./templates/SPEC_TEMPLATE.md) |
| `001` | Copiado a portapapeles y compartir vía WhatsApp | `Planificada` | *Pendiente* | *Pendiente* |
| `002` | Feedback visual y estados de carga en consultas | `Planificada` | *Pendiente* | *Pendiente* |
| `003` | Internacionalización (i18n) / Unificación de idioma | `Planificada` | *Pendiente* | *Pendiente* |
| `004` | Manejo global y granular de errores en UI | `Planificada` | *Pendiente* | *Pendiente* |
| `005` | Diseño responsivo moderno y estandarización visual | `Planificada` | *Pendiente* | *Pendiente* |
| `006` | Modo Oscuro (Dark Theme) | `Planificada` | *Pendiente* | *Pendiente* |

### Estados Posibles:
- `Planificada`: Identificada en el backlog / `todo.txt`.
- `En Análisis`: Se está elaborando el documento `analysis.md`.
- `Especificada`: `spec.md` completado y listo para revisión.
- `Aprobada`: Spec aprobada para desarrollo.
- `En Desarrollo`: Implementación activa según la spec.
- `Completada`: Verificada con tests y lista para producción.
