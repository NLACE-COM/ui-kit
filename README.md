# NLACE Design System

Sistema de diseño oficial de **NLACE** — tokens, componentes React y preset de Tailwind CSS para todos los productos de la empresa.

[![npm](https://img.shields.io/npm/v/@nlace/ui-kit)](https://www.npmjs.com/package/@nlace/ui-kit)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue)](LICENSE)

---

## ¿Qué es esto?

`@nlace/ui-kit` es el paquete que centraliza la identidad visual de NLACE: colores, tipografía, espaciado, motion, y componentes React. Es la fuente de verdad compartida entre todos los proyectos de la empresa — desde productos internos hasta sitios de marketing.

**Lo que incluye este repositorio:**

| Directorio / archivo | Qué hay |
|---|---|
| `tokens/` | **Fuente única** de los tokens en formato W3C Design Tokens (DTCG). Editás acá. |
| `build/` | Config de [Style Dictionary](https://styledictionary.com) que genera todos los formatos desde `tokens/` |
| `src/tokens/tailwind-v4.css` | _(generado)_ Tokens como `@theme` para Tailwind v4 |
| `src/tokens/tokens.css` | _(generado)_ Variables CSS puras (sin Tailwind) — agnóstico de framework |
| `src/tokens/tokens.mjs` · `.cjs` · `.d.ts` | _(generado)_ Tokens como objeto JS/TS tipado |
| `src/tokens/tokens.json` | _(generado)_ Tokens como mapa JSON resuelto (cualquier lenguaje) |
| `src/tailwind-preset.js` | _(generado)_ Preset para Tailwind v3 |
| `src/tokens/fonts.css` | `@font-face` de Inter + Space Grotesk (woff2 variables en `src/fonts/`) — `import '@nlace/ui-kit/fonts'` |
| `colors_and_type.css` | _(generado)_ CSS canónico: variables, @font-face y selectores base |
| `src/components/` | Componentes React: Button, Card, Badge, Input, Alert, Loaders, NlaceLogo, Tabs, Switch, Tooltip, Modal, Dropdown, Table, Charts, MeshGradient |
| `assets/nlace-black.svg` | Wordmark oscuro (fondos claros) |
| `assets/nlace-white.svg` | Wordmark claro (fondos oscuros) |
| `assets/photos/` | 14 fotografías oficiales del equipo |
| `assets/imagery/` | 130 imágenes AI para secciones de producto |
| `fonts/` | Inter y Space Grotesk como fuentes variables TTF |
| `DESIGN.md` | Referencia completa para agentes de IA y diseñadores |
| `preview/` | Páginas HTML del design system (colores, tipo, componentes) |
| `templates/` | Plantillas de documento del sistema: deck, email, one-pager, plantillas sociales, propuesta, reel |

> Los archivos marcados _(generado)_ salen de `tokens/`. **No los edites a mano** — corré `npm run tokens:build`. Ver [Fuente única de tokens](#fuente-única-de-tokens).

---

## Instalación

```bash
npm install @nlace/ui-kit
# o
pnpm add @nlace/ui-kit
```

---

## Uso

### Tailwind v4 (Next.js 15+ / Vite)

En tu CSS global (`app/globals.css` o equivalente):

```css
@import "tailwindcss";
@import "@nlace/ui-kit/tailwind-v4";

/* Necesario para que Tailwind v4 escanee clases de los componentes del kit */
@source "../node_modules/@nlace/ui-kit/dist";
```

> El `@import "tailwindcss"` **debe ir primero**.

**Clases disponibles:**

```html
<!-- Colores -->
<div class="bg-nl-primary text-white">...</div>
<div class="bg-nl-bg text-nl-text">...</div>
<span class="text-nl-accent">...</span>
<div class="border border-nl-border-soft">...</div>

<!-- Radios -->
<button class="rounded-pill">CTA</button>
<div class="rounded-card">Card</div>
<input class="rounded-input">

<!-- Sombras -->
<div class="shadow-card hover:shadow-hover">...</div>

<!-- Gradientes -->
<section class="bg-nl-hero">Hero</section>
<span class="bg-nl-brand bg-clip-text text-transparent">Gradient text</span>

<!-- Animaciones -->
<div class="animate-fade-up">...</div>
<div class="animate-shimmer">Skeleton</div>

<!-- Tipografía -->
<h1 class="font-display">Titular</h1>
<p class="font-body">Texto</p>

<!-- Motion -->
<div class="transition-all duration-ui ease-nl hover:-translate-y-1">...</div>
```

---

### Tailwind v3

```js
// tailwind.config.js
module.exports = {
  presets: [require('@nlace/ui-kit/preset')],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
}
```

---

### CSS Variables puras (cualquier framework)

Las variables `--nl-*` son CSS nativo, así que funcionan igual en **Astro, Vue, Svelte, Angular, HTML plano** o React — sin runtime ni build especial:

```css
/* Variables y selectores base (NO incluye @font-face) */
@import '@nlace/ui-kit/tokens';
/* Fuentes de marca self-hosted (woff2 variables) — sin esto el navegador
   cae a la sans del sistema */
@import '@nlace/ui-kit/fonts';
```

```html
<!-- Mismo markup en .astro, .vue, .svelte o .html -->
<button style="background: var(--nl-primary); border-radius: var(--nl-radius-pill)">
  Empezar
</button>
<section style="background: var(--nl-grad-hero)">Hero</section>
```

O copia el bloque de variables directamente desde [`colors_and_type.css`](colors_and_type.css).

---

### Tokens como objeto JS/TS

Para leer los valores desde código (theming dinámico, charts, RN, Tailwind config custom):

```ts
import tokens, { cssVars } from '@nlace/ui-kit/tokens-js'

tokens.color.primary      // '#5869f7'
tokens.gradient.hero      // 'linear-gradient(135deg, #5869f7 0%, …)'
tokens.font.display       // ['Space Grotesk', 'system-ui', 'sans-serif']
cssVars['--nl-primary']   // '#5869f7'  (mapa nombre-CSS → valor)
```

Disponible como ESM (`import`), CommonJS (`require`) y tipos TypeScript. Para
consumidores no-JS hay también un mapa plano en `@nlace/ui-kit/tokens.json`.

---

### Componentes React

```jsx
import {
  Button, Card, Badge, Input, Alert, Spinner, Skeleton, NlaceLogo,
  Tabs, Switch, Tooltip, Modal, Dropdown, Table,
  BarChart, LineChart, AreaChart, PieChart, DonutChart,
  MeshGradient,
} from '@nlace/ui-kit'

function App() {
  return (
    <Card>
      <NlaceLogo variant="black" width={120} />

      <Badge variant="primary">Nuevo</Badge>
      <Badge variant="success">Activo</Badge>

      <Input
        label="Correo electrónico"
        placeholder="tu@ejemplo.com"
      />
      <Input
        label="RUT"
        error="Formato inválido"
      />

      <Alert variant="success" title="Listo">
        Cambios guardados correctamente.
      </Alert>

      <div style={{ display: 'flex', gap: 8 }}>
        <Button variant="primary">Empezar</Button>
        <Button variant="secondary">Cancelar</Button>
        <Button variant="danger">Eliminar</Button>
      </div>

      <Spinner size="md" />
      <Skeleton style={{ width: 200, height: 20 }} />
    </Card>
  )
}
```

#### API de componentes

**Button**
```jsx
<Button
  variant="primary"   // 'primary' | 'accent' | 'secondary' | 'success' | 'outlineLight' | 'danger'
  size="md"           // 'sm' | 'md' | 'lg'
  disabled={false}
>
  Guardar
</Button>
```

**Card**
```jsx
<Card
  accent={false}   // true → fondo primario sólido
  hover={true}     // false → sin lift en hover
  padding="p-6"    // clase de padding Tailwind
>
  Contenido
</Card>
```

**Badge**
```jsx
<Badge variant="primary">
  {/* 'primary' | 'accent' | 'success' | 'danger' | 'neutral'
      'solidPrimary' | 'solidAccent' | 'solidDark' */}
  v1.5.0
</Badge>
```

**Input**
```jsx
<Input
  label="Campo"
  placeholder="..."
  error="Mensaje de error"    // activa estado error
  success                     // activa estado success
  hint="Texto de ayuda"
/>
```

**Alert**
```jsx
<Alert
  variant="info"    // 'info' | 'success' | 'warning' | 'error'
  title="Aviso"
>
  El proceso tardará unos minutos.
</Alert>
```

**Spinner / Skeleton**
```jsx
<Spinner size="md" />  // 'sm' | 'md' | 'lg'
<Skeleton style={{ width: 200, height: 20 }} />
```

**NlaceLogo**
```jsx
<NlaceLogo variant="black" width={160} />  // fondos claros
<NlaceLogo variant="white" width={160} />  // fondos oscuros
<NlaceAvatar size={40} />                   // avatar: isotipo "n." sobre azul de marca
```

**Tabs**
```jsx
<Tabs
  items={[{ id: 'a', label: 'Resumen' }, { id: 'b', label: 'Detalle', badge: 3 }]}
  variant="underline"   // 'underline' | 'pill'
  defaultValue="a"      // o controlado con value + onChange
>
  {(active) => <div>{active}</div>}
</Tabs>
```

**Switch**
```jsx
<Switch
  label="Notificaciones"
  description="Recibe alertas por correo"
  size="md"             // 'sm' | 'md'
  defaultChecked        // o controlado con checked + onChange
/>
```

**Tooltip**
```jsx
<Tooltip label="Copiar enlace" placement="top">  {/* 'top' | 'bottom' | 'left' | 'right' */}
  <Button>Compartir</Button>
</Tooltip>
```

**Modal**
```jsx
<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Confirmar"
  size="md"             // 'sm' | 'md' | 'lg'
  footer={<><Button variant="secondary">Cancelar</Button><Button>Guardar</Button></>}
>
  ¿Seguro que quieres continuar?
</Modal>
```

**Dropdown**
```jsx
<Dropdown
  trigger={<Button variant="secondary">Acciones ▾</Button>}
  align="left"          // 'left' | 'right'
  items={[
    { id: 'edit', label: 'Editar', shortcut: '⌘E' },
    { divider: true },
    { id: 'del', label: 'Eliminar', danger: true },
  ]}
  onSelect={(id) => {}}
/>
```

**Table**
```jsx
<Table
  columns={[
    { key: 'name', header: 'Empresa' },
    { key: 'mrr', header: 'MRR', align: 'right' },
    { key: 'state', header: 'Estado', render: (r) => <Badge>{r.state}</Badge> },
  ]}
  rows={rows}
  rowKey="id"
  dense={false}
/>
```

**Charts** — gráficos SVG sin dependencias, con la paleta de marca
```jsx
<BarChart  labels={['Ene','Feb','Mar']} series={[{ name: 'MRR', values: [18, 26, 31] }]} />
<LineChart labels={['S1','S2','S3']}    series={[{ name: 'Activos', values: [120, 180, 240] }]} />
<AreaChart labels={['Ene','Feb']}       series={[{ name: 'Procesos', values: [3, 12] }]} />
<PieChart  data={[{ label: 'Auto', value: 46 }, { label: 'Soporte', value: 28 }]} />
<DonutChart centerValue="74%" centerLabel="adopción" data={[{ label: 'Activo', value: 74 }]} />
// NL_CHART_PALETTE exporta el orden de colores de series.
```

**MeshGradient** — fondo animado WebGL con la paleta de marca (sin dependencias)
```jsx
// Colócalo como capa de fondo detrás del contenido.
<div style={{ position: 'relative' }}>
  <MeshGradient style={{ position: 'absolute', inset: 0, zIndex: 0 }} />
  <div style={{ position: 'relative', zIndex: 1 }}>…contenido…</div>
</div>
// Props: speed=10, intensity=2, grain=0.75,
//        colors=[primary, accent, pink, magenta, deep], highlight=accent-warm.
// Fallback a color sólido si no hay WebGL; seguro bajo React StrictMode.
```

---

## Plantillas de documento

El directorio [`templates/`](templates/) contiene plantillas HTML del sistema, listas para usar en presentaciones, correos y piezas de marketing — todas con tokens, tipografía y fotografía de NLACE:

| Plantilla | Formato | Descripción |
|---|---|---|
| `deck-nlace/` | 16:9 | Presentación con portada, separadores, grid, timeline, datos y cierre |
| `propuesta/` | A4 multipágina | Propuesta comercial: contexto, alcance, entregables, inversión |
| `one-pager/` | A4 | Hoja única de producto/empresa con hero, métricas y CTA |
| `email/` | 600px responsive | Email HTML en tablas, seguro para clientes de correo |
| `plantillas-sociales/` | feed/retrato/story/wide | 6 variantes × 4 formatos para redes |
| `reel/` | 9:16 | Reel animado en loop, temas claro/azul/gradiente |

Cada plantilla carga el sistema vía `ds-base.js` (tokens + `_ds_bundle.js`) y se edita dentro de Claude Design.

---

## Claude Design (claude.ai/design)

Este design system está sincronizado con **[Claude Design](https://claude.ai/design)**
(proyecto *NLACE Design System*), para que el agente de diseño construya UI usando los
**componentes reales** del kit — cada diseño que genera queda on-brand y mapea 1:1 al código
que los ingenieros pueden enviar.

Se sincronizan los **21 componentes** exportados, agrupados en *actions, forms, data-display,
feedback, overlays, navigation, charts* y *brand*, cada uno con su preview, su contrato de
tipos (`.d.ts`) y su doc de uso.

### Cómo se construye y re-sincroniza

Toda la configuración del sync vive en [`.design-sync/`](.design-sync/) (versionada, reproducible):

| Archivo | Rol |
|---|---|
| `config.json` | shape `package`, mapa de componentes, props (`dtsPropsFor`, ya que el paquete es JSX sin `.d.ts`), `cssEntry`, fuentes, grupos y overrides |
| `build-utilities-css.mjs` | compila las utilidades del preset Tailwind + defaults `--tw-*` y de borde a un CSS plano (Claude Design **no** corre Tailwind) → `dist/_nlace-full.css` |
| `previews/*.tsx` | composiciones reales (una por componente) que se renderizan como tarjetas |
| `docs/*.md` | agrupación del panel (`category`) + texto del prompt por componente |
| `conventions.md` | guía para el agente: estilar el layout con variables `--nl-*`, no con clases Tailwind |
| `NOTES.md` | gotchas del repo y riesgos a vigilar en el próximo sync |

> **Nota:** como Claude Design no procesa Tailwind, los componentes ya vienen estilados, pero el
> layout propio debe estilarse con las **variables CSS** (`var(--nl-primary)`, `var(--nl-radius-card)`,
> `var(--nl-shadow-card)`, …) — todas definidas en `:root`. Ver `conventions.md`.

La re-sincronización la maneja el skill `/design-sync` de Claude Code (lee `config.json` +
`NOTES.md`, reconstruye con `buildCmd`, verifica los renders y sube solo lo que cambió).

---

## Fuente única de tokens

Desde la **v2.3.0** los tokens tienen una sola fuente de verdad: los JSON de
[`tokens/`](tokens/) en formato [W3C Design Tokens (DTCG)](https://www.designtokens.org).
Desde ahí, [Style Dictionary](https://styledictionary.com) genera **todos** los
formatos de consumo. Esto elimina el desfase de marca que aparecía al mantener los
mismos colores a mano en varios archivos.

```
tokens/*.json  ──►  build/build-tokens.mjs (Style Dictionary)  ──►  artefactos
(W3C DTCG)                                                          ├─ src/tokens/tokens.css        → @nlace/ui-kit/tokens
                                                                    ├─ src/tokens/tailwind-v4.css   → @nlace/ui-kit/tailwind-v4
                                                                    ├─ src/tailwind-preset.js       → @nlace/ui-kit/preset
                                                                    ├─ src/tokens/tokens.mjs/.cjs    → @nlace/ui-kit/tokens-js
                                                                    ├─ src/tokens/tokens.json        → @nlace/ui-kit/tokens.json
                                                                    └─ colors_and_type.css           (canónico del repo)
```

### Cómo cambiar un token

```bash
# 1. Editá el valor en tokens/*.json  (p. ej. color.primary en tokens/color.json)
# 2. Regenerá todos los formatos:
npm run tokens:build
# 3. Commiteá tokens/ + los archivos generados juntos.
```

`npm run build` corre `tokens:build` antes de empaquetar, y `prepublishOnly`
corre `build`, así que un `npm publish` nunca sale con tokens desincronizados.
La generación es **determinista**: regenerar sin cambios produce bytes idénticos.

Detalles del pipeline y la arquitectura por capas: [`tokens/README.md`](tokens/README.md).

> ⚠️ **No edites los archivos generados a mano.** Llevan un banner de aviso y tu
> cambio se pierde en el próximo `tokens:build`. La fuente es siempre `tokens/`.

---

## Tokens de diseño

### Paleta canónica

| Token | Hex | Uso |
|---|---|---|
| `--nl-primary` | `#5869f7` | Acción principal, links, foco |
| `--nl-accent` | `#fc624b` | CTA secundario, highlights |
| `--nl-pink` | `#f76dee` | Gradientes hero, acento |
| `--nl-magenta` | `#b717af` | Gradient stop, badge PRO |
| `--nl-success` | `#42cf8a` | Estados positivos |
| `--nl-danger` | `#fc624b` | Error, destructivo |
| `--nl-bg` | `#efefef` | Canvas (nunca blanco puro) |
| `--nl-text` | `#0f1011` | Texto principal |

### Tipografía

- **Display:** Space Grotesk (titulares, 500–700)
- **Body/UI:** Inter (todo lo demás, 400–700)
- **Mono:** JetBrains Mono / SF Mono / Fira Code

```html
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### Gradientes

```css
--nl-grad-hero:    linear-gradient(135deg, #5869f7 0%, #b717af 60%, #f76dee 100%);
--nl-grad-brand:   linear-gradient(90deg,  #5869f7 0%, #fc624b 100%);
--nl-grad-primary: linear-gradient(135deg, #5869f7 0%, #2d3bc4 100%);
--nl-grad-accent:  linear-gradient(135deg, #fc624b 0%, #f76dee 100%);
```

---

## Assets

### Logos

Los SVGs están embebidos inline en [`DESIGN.md`](DESIGN.md) y disponibles vía URL directa:

```
https://raw.githubusercontent.com/NLACE-COM/ui-kit/main/assets/nlace-black.svg
https://raw.githubusercontent.com/NLACE-COM/ui-kit/main/assets/nlace-white.svg
```

### Fotografías del equipo

14 fotos disponibles en `assets/photos/`. Base URL:

```
https://raw.githubusercontent.com/NLACE-COM/ui-kit/main/assets/photos/{filename}
```

Archivos: `portrait-smile.jpg` · `portrait-duo.jpg` · `portrait-speaking.jpg` · `team-group-laptop.jpg` · `team-meeting-01/02/03.jpg` · `team-portrait-01/02.jpg` · `collab-laptop.jpg` · `hands-laptop-dark.jpg` · `hands-laptop-light.jpg` · `hands-notes.jpg` · `hands-writing.jpg`

### Imágenes AI

130 imágenes en `assets/imagery/ai-01.png` → `ai-130.png` (dos dígitos hasta `ai-99.png`, tres desde `ai-100.png`). Base URL:

```
https://raw.githubusercontent.com/NLACE-COM/ui-kit/main/assets/imagery/ai-{NN}.png
```

Catálogo con descripción individual e índice temático: [`assets/imagery/CATALOG.md`](assets/imagery/CATALOG.md).
Guía de estilo y plantilla de prompt para generar imágenes nuevas del set: [`DESIGN.md` § Imágenes AI](DESIGN.md).

---

## Para agentes de IA

Si eres un agente de IA trabajando con este design system, lee [`DESIGN.md`](DESIGN.md). Contiene todos los tokens, reglas, ejemplos de código HTML/JSX y markup SVG de los logos — todo inline, sin necesidad de leer otros archivos.

---

## Figma

Diseño canónico: [NLACE Design System](https://www.figma.com/design/hboE6NgrEkFXgC9B0M5B18/NLACE-Design-System?node-id=2-1677)  
`fileKey: hboE6NgrEkFXgC9B0M5B18` · `nodeId: 2:1677`

Precedencia: **Figma > DESIGN.md > código**

---

## Showcase (GitHub Pages)

Página viva del design system, construida con los **componentes reales** del paquete (importados desde `dist/`, sin recrearlos):

**https://nlace-com.github.io/ui-kit/**

Incluye: uso con agentes, fundamentos (color, tipografía, gradientes, tokens), los 21 componentes con demo + código, imagery, deck 16:9, piezas de redes sociales y un dashboard aplicado.

- Fuente: `showcase/app.jsx` → se compila con `npm run showcase` (esbuild) a `docs/`.
- Deploy automático: `.github/workflows/pages.yml` reconstruye el DS + el showcase y publica en cada push a `main`.

```bash
npm run build      # design system (tokens + dist)
npm run showcase   # compila el showcase a docs/
```

---

## Productos que usan este kit

- **NLACE AI Studio** — producto AI principal
- **nlace.com** — sitio de marketing
- **NLACE Docs** — documentación
- Herramientas verticales: Agrointegral, Evo, Forge, Cotizador, Firmas, Board as a Service, etc.

---

## Licencia

[Apache-2.0](LICENSE) © NLACE
