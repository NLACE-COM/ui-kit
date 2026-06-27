// Build del showcase de GitHub Pages.
// Compila showcase/app.jsx (que importa los componentes REALES desde dist/) con
// esbuild, ensambla el CSS del sistema y copia las fuentes a docs/.
//
//   node scripts/build-showcase.mjs   (o: npm run showcase)
//
// Requiere que el paquete esté construido antes (npm run build) para que existan
// dist/index.mjs y dist/_nlace-full.css.

import { build } from 'esbuild'
import { readFileSync, writeFileSync, copyFileSync, mkdirSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const out = join(root, 'docs', 'assets')
mkdirSync(join(out, 'fonts'), { recursive: true })

// 1) JS — bundle IIFE autónomo (React incluido, una sola copia).
await build({
  entryPoints: [join(root, 'showcase', 'app.jsx')],
  bundle: true,
  format: 'iife',
  jsx: 'automatic',
  loader: { '.jsx': 'jsx' },
  minify: true,
  sourcemap: false,
  target: ['es2020'],
  define: { 'process.env.NODE_ENV': '"production"' },
  outfile: join(out, 'app.js'),
  logLevel: 'info',
})

// 2) CSS — @font-face local (woff2) + el CSS completo del sistema (vars,
//    base, helpers y utilidades materializadas que usan los componentes).
const fullCss = readFileSync(join(root, 'dist', '_nlace-full.css'), 'utf8')
const fontFace = `/* NLACE webfonts — servidas localmente desde ./fonts */
@font-face{font-family:"Inter";font-style:normal;font-weight:100 900;font-display:swap;src:url("./fonts/Inter-VariableFont_opsz_wght.woff2") format("woff2")}
@font-face{font-family:"Inter";font-style:italic;font-weight:100 900;font-display:swap;src:url("./fonts/Inter-Italic-VariableFont_opsz_wght.woff2") format("woff2")}
@font-face{font-family:"Space Grotesk";font-style:normal;font-weight:300 700;font-display:swap;src:url("./fonts/SpaceGrotesk-VariableFont_wght.woff2") format("woff2")}
@import url("https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap");
`
writeFileSync(join(out, 'nlace.css'), fontFace + '\n' + fullCss)

// 3) Fuentes — copiar woff2 reales del paquete.
for (const f of [
  'Inter-VariableFont_opsz_wght.woff2',
  'Inter-Italic-VariableFont_opsz_wght.woff2',
  'SpaceGrotesk-VariableFont_wght.woff2',
]) {
  const src = join(root, 'src', 'fonts', f)
  if (existsSync(src)) copyFileSync(src, join(out, 'fonts', f))
  else console.warn('! fuente no encontrada:', f)
}

console.log('✓ showcase construido en docs/assets/ (app.js, nlace.css, fonts/)')
