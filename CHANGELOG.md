# Changelog

Todas las versiones notables de `@nlace/ui-kit`.

## Tooling — Sincronización con Claude Design

Infraestructura (no cambia el paquete publicado). El design system se sincroniza a
[claude.ai/design](https://claude.ai/design) (proyecto *NLACE Design System*) para que el
agente de diseño construya con los componentes reales del kit.

- Nueva carpeta versionada `.design-sync/` con la configuración reproducible del sync:
  `config.json`, `build-utilities-css.mjs`, `previews/*.tsx` (21), `docs/*.md` (21),
  `conventions.md` y `NOTES.md`.
- Los 21 componentes se importan con preview verificado, contrato `.d.ts` (props derivadas del
  JSX vía `dtsPropsFor`) y doc de uso, agrupados por categoría.
- `build-utilities-css.mjs` materializa las utilidades del preset Tailwind (Claude Design no
  corre Tailwind) + defaults `--tw-*` y de borde.
- Documentación de uso en el README (sección «Claude Design»).

## 2.4.1

Fix de contraste: el texto sobre superficies de marca oscuras ahora sale en blanco
garantizado. Los selectores base de `h1`–`h6` y `p` fijaban color tinta y pisaban el
color claro heredado de un contenedor oscuro (p. ej. `Card` con `accent`, que usa
`.bg-nl-primary`), dejando títulos negros ilegibles sobre azul.

- `colors_and_type.css` ahora fuerza texto blanco dentro de `.bg-nl-primary`, `.nl-on-dark`
  y `[data-nl-surface="dark"]` (headings, párrafos, enlaces). Usá `.nl-on-dark` o
  `data-nl-surface="dark"` en cualquier superficie de marca oscura para heredar el contraste.
- Generado desde `build/formats.mjs` (`npm run tokens:build`).

Fix `NlaceAvatar`: el avatar usaba un glifo `n.` tipografiado (`<text>`) que no coincidía
con el activo oficial. Ahora renderiza el isotipo real (path del logotipo) sobre el azul
de marca `#4452f9`, fiel a `avatar-nlace.svg`.

## 2.3.0

Fuente única de tokens con [Style Dictionary](https://styledictionary.com) — capa 1 del núcleo agnóstico de framework.

### Tokens: una sola fuente de verdad
Los tokens ahora viven en `tokens/*.json` (formato [W3C Design Tokens / DTCG](https://www.designtokens.org)) y **todos** los formatos de consumo se generan desde ahí. Esto elimina el desfase de marca que arrastraban los archivos mantenidos a mano.

- Nueva carpeta fuente `tokens/` (color, gradient, typography, radius, shadow, motion, opacity, alias, extensions).
- Nuevo pipeline `build/` (Style Dictionary + custom formats por plataforma).
- Script `npm run tokens:build`; `npm run build` ahora corre `tokens:build` antes del bundle de vite.
- Generación **determinista**: regenerar sin cambios produce bytes idénticos.

### Corrección de marca (desfase v2.2.0)
`tokens.css` y `tailwind-preset.js` publicaban la paleta vieja. Quedan alineados al canónico:

- `--nl-primary` `#3f58ea` → **`#5869f7`** · `--nl-accent` `#ff6143` → **`#fc624b`**
- `--nl-text`/`--nl-900` `#141414`/`#18181b` → **`#0f1011`**
- success, danger, neutros, bordes y los 7 gradientes (incluido el hero) realineados.
- Tokens que faltaban en algunos formatos: `--nl-black`, `--nl-pink`, `--nl-magenta`, `--nl-surface`, opacidades y aliases `--fg-*`/`--bg-*`/`--line-*`.
- Stack de fuentes normalizado en los tres formatos (`system-ui` + JetBrains Mono).

### Nuevos exports
- `@nlace/ui-kit/tokens-js` — tokens como objeto JS/TS tipado (`tokens`, `cssVars`); ESM + CJS + `.d.ts`.
- `@nlace/ui-kit/tokens.json` — mapa resuelto nombre-CSS → valor, para cualquier lenguaje.

### Documentación
- `README.md`: sección «Fuente única de tokens», uso agnóstico (Astro/Vue/Svelte/HTML) y objeto JS/TS.
- `tokens/README.md`: pipeline y roadmap de arquitectura por capas.
- Versión del paquete: `2.2.0` → `2.3.0`.

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
