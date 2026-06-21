# Tokens — fuente única (W3C Design Tokens + Style Dictionary)

Esta carpeta es la **única fuente de verdad** del design system. Todos los demás
formatos (CSS vars, Tailwind v3/v4, objeto JS/TS, JSON) se **generan** desde acá.
Editar los archivos generados a mano vuelve a desincronizar la marca — no lo hagas.

## Archivos fuente (DTCG, formato W3C)

| Archivo | Contiene |
|---|---|
| `color.json` | colores de marca + neutros |
| `opacity.json` | tintes con alpha (`primary-10`, `accent-10`…) |
| `gradient.json` | gradientes; los stops referencian `color.*` y se resuelven a hex |
| `typography.json` | familias tipográficas + tracking |
| `radius.json` · `shadow.json` · `motion.json` | radios, sombras, duraciones/easing |
| `alias.json` | aliases semánticos late-bound (`--fg-1`, `--bg-1`, `--line-soft`) |
| `extensions.json` | extras de nlace.com (solo se emiten en `tokens.css`) |

## Generar

```bash
npm run tokens:build      # regenera todos los artefactos
npm run build             # tokens:build + bundle de componentes (vite)
```

`prepare` y `prepublishOnly` corren `build`, así que un `npm publish` nunca sale
con tokens desincronizados.

## Qué se genera (no editar)

| Salida | Export | Consumo |
|---|---|---|
| `src/tokens/tokens.css` | `@nlace/ui-kit/tokens` | CSS vars `--nl-*` — React, Astro, Vue, Svelte, HTML |
| `colors_and_type.css` | (canónico del repo) | `:root` + selectores tipográficos |
| `src/tokens/tailwind-v4.css` | `@nlace/ui-kit/tailwind-v4` | `@theme` nativo Tailwind v4 |
| `src/tailwind-preset.js` | `@nlace/ui-kit/preset` | preset Tailwind v3 |
| `src/tokens/tokens.mjs` / `.cjs` / `.d.ts` | `@nlace/ui-kit/tokens-js` | objeto JS/TS tipado (`tokens`, `cssVars`) |
| `src/tokens/tokens.json` | `@nlace/ui-kit/tokens.json` | mapa resuelto, cualquier lenguaje |

El naming por plataforma (p. ej. `--nl-primary` vs `--color-nl-primary` vs
`--tracking-nl-tight`) lo resuelven los custom formats en `build/formats.mjs`.

## Arquitectura (roadmap)

Esta es la **capa 1** (tokens agnósticos) del plan de núcleo agnóstico + adaptadores finos:

1. ✅ **Tokens** — fuente única DTCG → todos los formatos (este directorio).
2. ⏳ **Recipes CSS** — `.nl-btn`, `.nl-card`, `.nl-badge`, `.nl-input` sobre los tokens, sin framework.
3. ⏳ **Web Components** — los 4 interactivos (Tabs, Switch, Modal, Dropdown) en light DOM, universales.
4. ⏳ **Wrappers idiomáticos** — solo por demanda real de un proyecto.
