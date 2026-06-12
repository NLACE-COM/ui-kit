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
| `src/tokens/tailwind-v4.css` | Tokens como `@theme` para Tailwind v4 |
| `src/tokens/tokens.css` | Variables CSS puras (sin Tailwind) |
| `src/tokens/fonts.css` | `@font-face` de Inter + Space Grotesk (woff2 variables en `src/fonts/`) — `import '@nlace/ui-kit/fonts'` |
| `src/tailwind-preset.js` | Preset para Tailwind v3 |
| `src/components/` | Componentes React: Button, Card, Badge, Input, Alert, Loaders, NlaceLogo |
| `assets/nlace-black.svg` | Wordmark oscuro (fondos claros) |
| `assets/nlace-white.svg` | Wordmark claro (fondos oscuros) |
| `assets/photos/` | 14 fotografías oficiales del equipo |
| `assets/imagery/` | 130 imágenes AI para secciones de producto |
| `fonts/` | Inter y Space Grotesk como fuentes variables TTF |
| `colors_and_type.css` | CSS canónico con variables, @font-face y selectores base |
| `DESIGN.md` | Referencia completa para agentes de IA y diseñadores |
| `preview/` | Páginas HTML del design system (colores, tipo, componentes) |

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

### CSS Variables puras (sin framework)

```css
/* Variables y selectores base (NO incluye @font-face) */
@import url('./node_modules/@nlace/ui-kit/tokens');
/* Fuentes de marca self-hosted (woff2 variables) — sin esto el navegador
   cae a la sans del sistema */
@import url('./node_modules/@nlace/ui-kit/fonts');
```

O copia el bloque de variables directamente desde [`colors_and_type.css`](colors_and_type.css).

---

### Componentes React

```jsx
import { Button, Card, Badge, Input, Alert, Spinner, Skeleton, NlaceLogo } from '@nlace/ui-kit'

function App() {
  return (
    <Card>
      <NlaceLogo variant="dark" height={32} />

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
<NlaceLogo variant="dark"  height={32} />  // fondos claros
<NlaceLogo variant="light" height={32} />  // fondos oscuros
<NlaceAvatar size={40} />
```

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

---

## Para agentes de IA

Si eres un agente de IA trabajando con este design system, lee [`DESIGN.md`](DESIGN.md). Contiene todos los tokens, reglas, ejemplos de código HTML/JSX y markup SVG de los logos — todo inline, sin necesidad de leer otros archivos.

---

## Figma

Diseño canónico: [NLACE Design System](https://www.figma.com/design/hboE6NgrEkFXgC9B0M5B18/NLACE-Design-System?node-id=2-1677)  
`fileKey: hboE6NgrEkFXgC9B0M5B18` · `nodeId: 2:1677`

Precedencia: **Figma > DESIGN.md > código**

---

## Productos que usan este kit

- **NLACE AI Studio** — producto AI principal
- **nlace.com** — sitio de marketing
- **NLACE Docs** — documentación
- Herramientas verticales: Agrointegral, Evo, Forge, Cotizador, Firmas, Board as a Service, etc.

---

## Licencia

[Apache-2.0](LICENSE) © NLACE
