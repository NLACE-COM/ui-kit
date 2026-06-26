# design-sync — notas del repo (@nlace/ui-kit)

Forma: **package** (sin Storybook). Proyecto Claude Design: `NLACE Design System`
(`c5a5c609-4609-4047-bd2b-0b87b32ddb4c`). globalName = `NlaceUiKit`.

## Gotchas de este repo
- **Componentes son JSX sin tipos** (no hay `.d.ts`). El descubrimiento depende de
  `cfg.componentSrcMap` (21 componentes mapeados; `NL_CHART_PALETTE` excluido) y los contratos
  de props vienen de `cfg.dtsPropsFor` (escritos a mano desde el JSX). **Si cambian las props de
  un componente en `src/components`, actualiza `dtsPropsFor`.**
- **Estilo = utilidades del preset Tailwind** (`src/tailwind-preset.js`). Claude Design NO corre
  Tailwind, así que `.design-sync/build-utilities-css.mjs` (parte de `cfg.buildCmd`) materializa el
  CSS: utilidades (scan de `src/components` + safelist para Skeleton) + defaults `--tw-*`
  (`@tailwind base` con preflight OFF) + defaults de borde (`*{border-width:0;border-style:solid}`,
  imprescindibles o el Spinner y los bordes de Card/Alert/Modal/Table no pintan). Salida:
  `dist/_nlace-full.css` (= `cssEntry`) y `dist/_nlace-fonts.css` (= `extraFonts`).
- **Fuentes**: woff2 de `src/fonts` vía `cfg.extraFonts` → `dist/_nlace-fonts.css`. JetBrains Mono
  carga remoto (`@import` Google Fonts → warn `[FONT_REMOTE]`, esperado).
- **Agrupación** del panel: frontmatter `category` en `.design-sync/docs/*.md` (uno por componente;
  también son el `.prompt.md`).
- **Render fiel conocido**: `bg-nl-primary` y `bg-nl-accent` salen como GRADIENTE (colisión de
  nombres en el preset: `colors.nl.primary` y `backgroundImage['nl-primary']` generan ambos
  `.bg-nl-primary`; gana el gradiente). Es intencional, afecta Button/Badge variantes primary/accent.

## Known render warns (esperados, no son nuevos)
- `[FONT_REMOTE]` JetBrains Mono / Fira Code — cargan en runtime, ok.
- `[TOKENS_MISSING]` "1 below threshold" — una var `--tw-*` residual, no afecta render.

## Limitaciones de captura estática (gradeadas good, no son defectos)
- **Tooltip**: el label aparece solo en hover (`group-hover`) → la card muestra solo el trigger.
- **Dropdown**: el menú abre con click (estado interno, sin prop `open`) → la card muestra solo el
  trigger. El `.prompt.md` documenta el uso completo.

## Re-sync risks (qué vigilar la próxima vez)
- `build-utilities-css.mjs` DEBE correr dentro de `cfg.buildCmd` antes del converter. Si se agregan
  componentes que usan utilidades nuevas no cubiertas por el scan/safelist, saldrán sin estilo —
  ampliar el `safelist` o el `content`.
- `cfg.dtsPropsFor` es manual: queda desactualizado si cambian las APIs en `src/components`.
- **Proyecto re-adoptado**: el proyecto Claude Design contenía una subida previa tipo "espejo del
  repo" (no de este converter): `preview/*.html`, `src/`, `tokens/*.json`, `fonts/*.ttf`, MÁS una
  biblioteca de marca curada (`assets/`, `uploads/`, `decks/`, `templates/`, `export/`, `ui_kits/`,
  `skill/`). Decisión del owner: **conservar la biblioteca de marca**; este sync solo gestiona el
  output del converter (componentes/tokens/fonts/styles). El upload borra los artefactos viejos
  superseded (ver lista en el plan) pero NO la biblioteca de marca. La primera subida con este
  converter dejó el anchor `_ds_sync.json`; desde ahora los `deletePaths` salen del diff del anchor,
  que solo cubre output del converter → la biblioteca de marca queda intacta por construcción.
- `MeshGradient` es WebGL/animado; la captura toma un frame.
