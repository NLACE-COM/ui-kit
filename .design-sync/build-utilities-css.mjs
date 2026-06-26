// Genera el CSS que Claude Design consume para renderizar los componentes NLACE.
// Claude Design NO corre Tailwind, así que materializamos aquí:
//   1. dist/_nlace-utilities.css — utilidades Tailwind usadas por src/components
//      (+ defaults --tw-* vía `@tailwind base` con preflight off, necesarios para
//      transforms/filters como el knob del Switch). Sin reset del host.
//   2. dist/_nlace-fonts.css — @font-face (Inter, Space Grotesk) → woff2 de src/fonts.
//      Es el cfg.extraFonts: el converter copia los woff2 a fonts/ y reescribe las urls.
//   3. dist/_nlace-full.css — cssEntry: marca (:root + base + .nl-*) SIN @font-face
//      local + utilidades. (El @import remoto de JetBrains Mono se conserva.)
//
// Se invoca dentro de cfg.buildCmd para que re-sync lo regenere.

import { createRequire } from 'module'
import { writeFileSync, mkdirSync, readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const require = createRequire(import.meta.url)
const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(__dirname, '..')
const R = (p) => resolve(repoRoot, p)

const tailwind = require(R('node_modules/tailwindcss'))
const postcss = require(R('node_modules/postcss'))
const preset = require(R('src/tailwind-preset.js'))

// ── 1. Utilidades + defaults --tw-* (preflight off = sin reset del host) ──
const config = {
  presets: [preset],
  content: [
    R('src/components/**/*.{jsx,js}'),
    R('.design-sync/previews/**/*.{tsx,jsx}'),
  ],
  // Clases de dimensionado que los previews pasan a Skeleton vía className
  // (su style interno impide pasar tamaño por inline style).
  safelist: [
    'h-3', 'h-4', 'h-5', 'h-6', 'h-10', 'h-12', 'h-16', 'h-24', 'h-32',
    'w-16', 'w-24', 'w-32', 'w-40', 'w-48', 'w-56', 'w-64', 'w-full',
    'rounded', 'rounded-md', 'rounded-lg', 'rounded-card', 'rounded-pill',
  ],
  corePlugins: { preflight: false },
}
const { css: utilities } = await postcss([tailwind(config)]).process(
  '@tailwind base;\n@tailwind utilities;',
  { from: undefined },
)

// Defaults de borde de Tailwind preflight (NO se emiten con preflight off, pero
// los necesitan TODAS las utilidades border-*: sin `border-style: solid` + ancho 0
// por defecto, `border`/`border-l-[3px]` no pintan nada → el Spinner (anillo) queda
// invisible y desaparecen bordes de Card/Alert/Modal/Table/Input en los diseños.
const borderDefaults =
  '*, ::before, ::after { border-width: 0; border-style: solid; border-color: currentColor; }\n'

mkdirSync(R('dist'), { recursive: true })
writeFileSync(R('dist/_nlace-utilities.css'), borderDefaults + utilities)

// ── 2. @font-face dedicado (woff2 de src/fonts) para cfg.extraFonts ──
const fontsCss = `/* @font-face NLACE — woff2 en src/fonts. Copiado a fonts/ por el converter. */
@font-face {
  font-family: "Inter";
  src: url("../src/fonts/Inter-VariableFont_opsz_wght.woff2") format("woff2-variations");
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "Inter";
  src: url("../src/fonts/Inter-Italic-VariableFont_opsz_wght.woff2") format("woff2-variations");
  font-weight: 100 900;
  font-style: italic;
  font-display: swap;
}
@font-face {
  font-family: "Space Grotesk";
  src: url("../src/fonts/SpaceGrotesk-VariableFont_wght.woff2") format("woff2-variations");
  font-weight: 300 700;
  font-style: normal;
  font-display: swap;
}
`
writeFileSync(R('dist/_nlace-fonts.css'), fontsCss)

// ── 3. cssEntry = marca SIN @font-face local + utilidades ──
const brandRaw = readFileSync(R('colors_and_type.css'), 'utf8')
// quitar los bloques @font-face locales (los maneja extraFonts); conservar el @import remoto
const brand = brandRaw.replace(/@font-face\s*\{[^}]*\}\s*/g, '')
const full = `${brand}\n\n/* ── Tailwind utilities + --tw-* defaults (preset NLACE) ── */\n${borderDefaults}${utilities}`
writeFileSync(R('dist/_nlace-full.css'), full)

console.log(
  `[nlace-css] utilities ${(utilities.length / 1024).toFixed(1)}KB · fonts ${(fontsCss.length / 1024).toFixed(1)}KB · full ${(full.length / 1024).toFixed(1)}KB`,
)
