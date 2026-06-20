# Changelog

Todas las versiones notables de `@nlace/ui-kit`.

## 2.2.0

Sincronización completa desde el proyecto Claude Design «NLACE Design System».

### Componentes React nuevos (7)
`src/index.js` ahora exporta 14 componentes. Se agregan:

- **Tabs** — `underline` / `pill`, controlado o no controlado, con badge opcional.
- **Switch** — toggle accesible (`role="switch"`), tamaños `sm`/`md`, etiqueta y descripción.
- **Tooltip** — etiqueta oscura en hover/focus, 4 posiciones (`top`/`bottom`/`left`/`right`), sin estado JS.
- **Modal** — diálogo centrado con scrim, tamaños `sm`/`md`/`lg`, cierre con Esc y scrim, título + footer.
- **Dropdown** — menú click con divisor, atajos, ícono y acción `danger`; cierra al hacer click fuera o Esc.
- **Table** — tabla de datos con header en mayúsculas, hover de fila, columnas con `align` y `render`, modo `dense`.
- **Charts** — `BarChart`, `LineChart`, `AreaChart`, `PieChart`, `DonutChart` + `NL_CHART_PALETTE`. SVG sin dependencias, paleta de marca, listos para PDF.

### Plantillas de documento (`templates/`)
Nuevo directorio con plantillas HTML del sistema, editables en Claude Design:

- `deck-nlace/` — presentación 16:9 (portada, separadores, grid, timeline, datos, cierre).
- `propuesta/` — propuesta comercial A4 multipágina.
- `one-pager/` — hoja única A4 de producto/empresa.
- `email/` — email HTML responsive de 600px en tablas.
- `plantillas-sociales/` — 6 variantes × 4 formatos para redes.
- `reel/` — reel animado 9:16 en loop.

### Previews y runtime
- 7 previews nuevos en `preview/` (charts, dropdown, modal, switch, table, tabs, tooltip) + `preview/_charts.jsx`.
- `styles.css` (punto de entrada canónico que importa `colors_and_type.css`).
- `_ds_bundle.js`, `_ds_manifest.json` — runtime y manifiesto del design system.
- `_build/vite.config.js`, `_adherence.oxlintrc.json`, `CLAUDE.md` — config de build, linter de adherencia y reglas de marca del proyecto.

### Documentación
- `README.md`, `SKILL.md` y `DESIGN.md` actualizados con los 14 componentes y las plantillas.
- Versión del paquete: `2.1.0` → `2.2.0`.

> Nota: los thumbnails (`templates/*/.thumbnail`) y screenshots (`screenshots/*.png`, `preview/_s02.png`) son capturas binarias que genera la app de Claude Design y no se incluyen en este sync.

## 2.1.0
- Entrada `@nlace/ui-kit/fonts` y tokens promovidos desde nlace.com.
