# NLACE Design System — DESIGN.md

**Versión:** 2.2.0  
**Fuente canónica:** [Figma](https://www.figma.com/design/hboE6NgrEkFXgC9B0M5B18/NLACE-Design-System?node-id=2-1677) · `fileKey: hboE6NgrEkFXgC9B0M5B18`  
**npm:** `@nlace/ui-kit`  
**Precedencia:** Figma > DESIGN.md > defaults del modelo

Este archivo es la referencia de diseño completa y autocontenida de NLACE. No requiere leer otros archivos. Contiene todos los tokens, reglas, componentes y ejemplos de código necesarios para construir cualquier interfaz con identidad NLACE.

---

## Identidad de marca en una oración

NLACE es una empresa tecnológica latinoamericana (base Chile). Sus interfaces son **directas, funcionales, con carácter industrial**. Azul eléctrico primario, acento rojo-naranja, tipografía geométrica, sin decoración superflua.

---

## Paleta canónica

> Estos valores prevalecen sobre cualquier otro archivo en el repositorio.

### Colores de marca

| Token | Hex | Uso |
|---|---|---|
| `--nl-primary` | `#5869f7` | Acción principal, CTA, foco, links |
| `--nl-primary-dark` | `#2d3bc4` | Gradient stop, variante oscura del primario |
| `--nl-accent` | `#fc624b` | CTA secundario, highlights, peligro/error |
| `--nl-accent-warm` | `#ff8c42` | Gradient stop cálido del accent |
| `--nl-pink` | `#f76dee` | Acento secundario, gradientes hero |
| `--nl-magenta` | `#b717af` | Gradient stop, badge PRO |
| `--nl-success` | `#42cf8a` | Estados positivos (pill/fondo tonal) |
| `--nl-success-dark` | `#2ba36a` | Borde y texto de éxito |
| `--nl-cyan` | `#a5f3fc` | Acento auxiliar (uso muy limitado) |
| `--nl-danger` | `#fc624b` | Error, estado destructivo |

### Neutros y superficies

| Token | Hex | Uso |
|---|---|---|
| `--nl-bg` | `#efefef` | Canvas de app — NUNCA blanco puro |
| `--nl-white` | `#ffffff` | Cards, superficies elevadas |
| `--nl-text` / `--nl-black` | `#0f1011` | Texto principal, fondos oscuros |
| `--nl-900` | `#0f1011` | Escala neutral oscura |
| `--nl-700` | `#3f3f46` | Texto secundario |
| `--nl-500` | `#71717a` | Texto terciario, captions |
| `--nl-400` | `#a1a1aa` | Placeholder, disabled |
| `--nl-surface` | `#dbdcd7` | Superficies neutras, border-soft |
| `--nl-border-soft` | `#dbdcd7` | Borde de cards y contenedores |
| `--nl-border-ui` | `#c6c7c2` | Borde de inputs y controles |

### Opacidades semánticas

| Token | Valor | Uso |
|---|---|---|
| `--nl-primary-10` | `rgba(88, 105, 247, 0.1)` | Badge tonal primario, focus ring |
| `--nl-primary-20` | `rgba(88, 105, 247, 0.2)` | Focus ring inputs |
| `--nl-accent-10` | `rgba(252, 98, 75, 0.1)` | Badge tonal accent |
| `--nl-danger-8` | `rgba(252, 98, 75, 0.08)` | Alert error background |

---

## CSS Variables — bloque completo

```css
:root {
  /* ── Colores de marca ────────────────────────────────── */
  --nl-bg:            #efefef;
  --nl-text:          #0f1011;
  --nl-black:         #0f1011;
  --nl-white:         #ffffff;
  --nl-primary:       #5869f7;
  --nl-primary-dark:  #2d3bc4;
  --nl-accent:        #fc624b;
  --nl-accent-warm:   #ff8c42;
  --nl-pink:          #f76dee;
  --nl-magenta:       #b717af;
  --nl-success:       #42cf8a;
  --nl-success-dark:  #2ba36a;
  --nl-success-text:  #053a23;
  --nl-success-bg:    #eaf9f1;
  --nl-danger:        #fc624b;
  --nl-cyan:          #a5f3fc;

  /* ── Neutros ─────────────────────────────────────────── */
  --nl-900:           #0f1011;
  --nl-700:           #3f3f46;
  --nl-500:           #71717a;
  --nl-400:           #a1a1aa;
  --nl-surface:       #dbdcd7;
  --nl-border-soft:   #dbdcd7;
  --nl-border-ui:     #c6c7c2;

  /* ── Opacidades ──────────────────────────────────────── */
  --nl-primary-10:  rgba(88, 105, 247, 0.10);
  --nl-primary-20:  rgba(88, 105, 247, 0.20);
  --nl-accent-10:   rgba(252, 98, 75, 0.10);
  --nl-danger-8:    rgba(252, 98, 75, 0.08);

  /* ── Tipografía ──────────────────────────────────────── */
  --nl-font-display: "Space Grotesk", system-ui, sans-serif;
  --nl-font-body:    "Inter", system-ui, sans-serif;
  --nl-font-mono:    "JetBrains Mono", "SF Mono", "Fira Code", monospace;

  --nl-tracking-tight:  -0.03em;
  --nl-tracking-normal: -0.018em;
  --nl-tracking-ui:      0.08em;

  /* ── Radios ──────────────────────────────────────────── */
  --nl-radius-input: 10px;
  --nl-radius-card:  20px;
  --nl-radius-pill:  9999px;

  /* ── Sombras (solo 2 niveles) ────────────────────────── */
  --nl-shadow-card:  0 2px 12px rgba(20, 20, 20, 0.08);
  --nl-shadow-hover: 0 10px 28px rgba(20, 20, 20, 0.14);

  /* ── Motion ──────────────────────────────────────────── */
  --nl-dur-ui:     220ms;
  --nl-dur-reveal: 480ms;
  --nl-ease:       cubic-bezier(0.22, 1, 0.36, 1);

  /* ── Gradientes ──────────────────────────────────────── */
  --nl-grad-hero:    linear-gradient(135deg, #5869f7 0%, #b717af 60%, #f76dee 100%);
  --nl-grad-primary: linear-gradient(135deg, #5869f7 0%, #2d3bc4 100%);
  --nl-grad-accent:  linear-gradient(135deg, #fc624b 0%, #f76dee 100%);
  --nl-grad-mint:    linear-gradient(135deg, #42cf8a 0%, #2ba36a 100%);
  --nl-grad-dark:    linear-gradient(180deg, #0f1011 0%, #2d3bc4 100%);
  --nl-grad-surface: linear-gradient(135deg, #ffffff 0%, #dbdcd7 100%);
  --nl-grad-brand:   linear-gradient(90deg,  #5869f7 0%, #fc624b 100%);
}
```

---

## Tipografía

### Fuentes

| Rol | Fuente | Uso |
|---|---|---|
| Display | **Space Grotesk** | Titulares, hero numbers, wordmark |
| Body / UI | **Inter** | Todo lo demás: párrafos, labels, botones |
| Mono | **JetBrains Mono** (web) / SF Mono → Fira Code (prod) | Código, kbd, etiquetas técnicas |

**Cómo cargarlas (preferido, self-hosted desde el kit — v2.1+):**
```js
// entry point del proyecto, junto a los tokens
import '@nlace/ui-kit/tokens'
import '@nlace/ui-kit/fonts'   // @font-face de Inter + Space Grotesk (woff2 variables)
```

> ⚠️ Los tokens (`--nl-font-display`, `--nl-font-body`) solo declaran los **nombres** de las
> familias. Si el proyecto no importa `@nlace/ui-kit/fonts` ni define `@font-face` propio, el
> navegador cae a la sans del sistema en cualquier máquina sin las fuentes instaladas (así se
> detectó en nlace.com, jun-2026). Siempre cargar las fuentes explícitamente.

**Alternativa vía Google Fonts** (si no se puede importar CSS del kit):
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### Escala tipográfica

| Elemento | Fuente | Tamaño | Peso | Line height | Tracking |
|---|---|---|---|---|---|
| `h1` | Space Grotesk | clamp(40px, 5vw, 64px) | 700 | 1.05 | -0.03em |
| `h2` | Space Grotesk | clamp(30px, 3.4vw, 44px) | 600 | 1.12 | -0.018em |
| `h3` | Space Grotesk | 28px | 600 | 1.2 | -0.018em |
| `h4` | Space Grotesk | 22px | 600 | 1.25 | -0.018em |
| `h5` | Space Grotesk | 18px | 600 | 1.3 | -0.018em |
| `h6` / eyebrow | Inter | 14px | 600 | 1.3 | +0.08em (uppercase) |
| Body (`p`) | Inter | 16px | 400 | 1.55 | — |
| Lead | Inter | 20px | 400 | 1.45 | — |
| Small | Inter | 13px | 400 | — | — |
| Label | Inter | 13px | 600 | — | — |
| Eyebrow | Inter | 12px | 600 | — | +0.08em (uppercase) |

### Reglas tipográficas no negociables

- Display en **Space Grotesk**, body/UI en **Inter**. Nunca mezclar al revés.
- Tracking negativo en todos los titulares (-0.02 a -0.04em).
- **Sentence case** para strings de UI y titulares. Solo mayúscula inicial.
- `ALL-CAPS` únicamente en eyebrows, labels técnicos y h6.
- Tamaño mínimo de body: 16px / line-height 1.55.
- `text-gradient` de marca (--nl-grad-brand) solo en titulares de marketing, nunca en UI funcional.

### Clases utilitarias

```css
.nl-eyebrow {
  font-family: var(--nl-font-body);
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--nl-primary);
}

.nl-text-gradient {
  background: var(--nl-grad-brand);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nl-lead {
  font-size: 20px;
  line-height: 1.45;
  color: var(--nl-700);
}
```

---

## Espaciado y layout

- Escala de 4px (estándar Tailwind). Sin tokens de espaciado personalizados.
- Max-width de contenido: **1200–1280px**, gutters generosos.
- Inputs: `min-height: 44px` (target táctil AA), `padding: 0 14px`.
- Botones: sm `16px/6px` · md `22px/11px` · lg `30px/15px`.
- Cards: `padding: 24px` (p-6) por defecto.

---

## Radios, sombras y bordes

### Radios

| Token | Valor | Uso |
|---|---|---|
| `--nl-radius-input` | `10px` | Inputs, selects, áreas de texto |
| `--nl-radius-card` | `20px` | Cards, modales, contenedores |
| `--nl-radius-pill` | `9999px` | Botones (todos), badges, chips |

### Sombras (solo 2 niveles)

| Token | Valor | Uso |
|---|---|---|
| `--nl-shadow-card` | `0 2px 12px rgba(20,20,20,0.08)` | Reposo |
| `--nl-shadow-hover` | `0 10px 28px rgba(20,20,20,0.14)` | Hover/elevado |

- Sin sombras de color. Sin glows. Sin glassmorphism. Sin layered shadows.

### Bordes

- Siempre hairline: `1px` o `1.5px`.
- `--nl-border-soft` (`#dbdcd7`) para cards y contenedores.
- `--nl-border-ui` (`#c6c7c2`) para inputs y controles interactivos.
- Los bordes separan, no decoran.

---

## Motion y animación

| Token | Valor | Uso |
|---|---|---|
| `--nl-dur-ui` | `220ms` | Micro-interactions (hover, focus, toggles) |
| `--nl-dur-reveal` | `480ms` | Entradas de contenido, animaciones de página |
| `--nl-ease` | `cubic-bezier(0.22, 1, 0.36, 1)` | Quart-out, deceleración suave, nunca rebota |

### Animaciones nombradas

```css
@keyframes fade-up {
  0%   { opacity: 0; transform: translateY(12px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes pulse-ring {
  0%   { transform: scale(1); opacity: 0.35; }
  100% { transform: scale(2.2); opacity: 0; }
}

@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position:  200% 0; }
}

@keyframes spin-nl {
  to { transform: rotate(360deg); }
}
```

### Reglas de motion

- Hover en botones: `translateY(-2px)` + `shadow-hover`. **No** cambio de color.
- Hover en cards: `translateY(-3px)` + `shadow-hover`. 220ms ease-nl.
- Animaciones de entrada: `fade-up` (12px + opacity), 480ms, ease-nl.
- Links: underline via `border-bottom` transition.
- **Siempre** respetar `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Gradientes

| Nombre | Definición | Uso |
|---|---|---|
| `nl-grad-hero` | `135deg, #5869f7 0%, #b717af 60%, #f76dee 100%` | Hero sections, portadas, slides de énfasis |
| `nl-grad-primary` | `135deg, #5869f7 0%, #2d3bc4 100%` | CTAs primarios, fondos de énfasis |
| `nl-grad-accent` | `135deg, #fc624b 0%, #f76dee 100%` | Elementos de acento, notificaciones |
| `nl-grad-mint` | `135deg, #42cf8a 0%, #2ba36a 100%` | Estados de éxito |
| `nl-grad-dark` | `180deg, #0f1011 0%, #2d3bc4 100%` | Fondos oscuros con profundidad |
| `nl-grad-surface` | `135deg, #ffffff 0%, #dbdcd7 100%` | Superficies sutiles |
| `nl-grad-brand` | `90deg, #5869f7 0%, #fc624b 100%` | Text-gradient de titulares, separadores de marca |

**Reglas:**
- `nl-grad-brand` solo en titulares de marketing como text-gradient. Nunca en UI funcional ni botones.
- Overlays sobre fotografía: `rgba(15,16,17,0.45–0.65)` dark. **Sin** overlays diagonales.
- Sin overlay de color sobre fotos de personas.

---

## Componentes

### Button

**Variantes:** `accent` · `primary` · `secondary` · `success` · `outlineLight` · `danger`  
**Tamaños:** `sm` · `md` · `lg`  
**Radio:** siempre pill (`border-radius: 9999px`)

```html
<!-- Ejemplo HTML puro -->
<button class="nl-btn nl-btn-primary nl-btn-md">Empezar</button>
<button class="nl-btn nl-btn-accent nl-btn-md">Guardar</button>
<button class="nl-btn nl-btn-secondary nl-btn-md">Cancelar</button>
<button class="nl-btn nl-btn-danger nl-btn-md" disabled>Eliminar</button>

<style>
.nl-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: var(--nl-radius-pill);
  font-family: var(--nl-font-body);
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: transform var(--nl-dur-ui) var(--nl-ease),
              box-shadow var(--nl-dur-ui) var(--nl-ease);
}
.nl-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--nl-shadow-hover);
}
.nl-btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 4px var(--nl-primary-20);
}
.nl-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
/* Tamaños */
.nl-btn-sm { padding: 6px 16px;  font-size: 0.82rem; }
.nl-btn-md { padding: 11px 22px; font-size: 0.9rem; }
.nl-btn-lg { padding: 15px 30px; font-size: 1rem; }
/* Variantes */
.nl-btn-primary   { background: var(--nl-primary); color: #fff; }
.nl-btn-accent    { background: var(--nl-accent);  color: #fff; }
.nl-btn-secondary { background: #fff; color: var(--nl-text); border: 1px solid var(--nl-border-ui); }
.nl-btn-success   { background: var(--nl-success); color: var(--nl-success-text); }
.nl-btn-danger    { background: var(--nl-danger);  color: #fff; }
.nl-btn-outline   { background: transparent; color: #fff; border: 1px solid rgba(255,255,255,0.5); }
</style>
```

```jsx
// JSX (@nlace/ui-kit)
import { Button } from '@nlace/ui-kit'
<Button variant="primary" size="md">Empezar</Button>
<Button variant="accent">Guardar</Button>
<Button variant="secondary">Cancelar</Button>
<Button variant="danger" disabled>Eliminar</Button>
```

---

### Card

**Variantes:** default (rest) · hover · accent (bg-primary)

```html
<!-- Card por defecto -->
<div class="nl-card">
  <h3>Título de la card</h3>
  <p>Contenido de la card con descripción breve.</p>
</div>

<!-- Card accent -->
<div class="nl-card nl-card-accent">
  <h3 style="color:#fff">Título destacado</h3>
  <p style="color:rgba(255,255,255,0.8)">Descripción.</p>
</div>

<style>
.nl-card {
  background: #ffffff;
  border: 1px solid var(--nl-border-soft);
  border-radius: var(--nl-radius-card);
  box-shadow: var(--nl-shadow-card);
  padding: 24px;
  transition: transform var(--nl-dur-ui) var(--nl-ease),
              box-shadow var(--nl-dur-ui) var(--nl-ease);
}
.nl-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--nl-shadow-hover);
}
.nl-card-accent {
  background: var(--nl-primary);
  border-color: transparent;
  box-shadow: none;
}
</style>
```

```jsx
// JSX (@nlace/ui-kit)
import { Card } from '@nlace/ui-kit'
<Card>Contenido</Card>
<Card accent>Contenido destacado</Card>
<Card hover={false}>Sin hover</Card>
```

---

### Badge

**Variantes tonal:** `primary` · `accent` · `success` · `danger` · `neutral`  
**Variantes sólidas:** `solidPrimary` · `solidAccent` · `solidDark`  
**Radio:** siempre pill

```html
<span class="nl-badge nl-badge-primary">Nuevo</span>
<span class="nl-badge nl-badge-accent">Beta</span>
<span class="nl-badge nl-badge-success">Activo</span>
<span class="nl-badge nl-badge-danger">Error</span>
<span class="nl-badge nl-badge-solid-primary">v1.5.0</span>

<style>
.nl-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: var(--nl-radius-pill);
  font-family: var(--nl-font-body);
  font-size: 0.78rem;
  font-weight: 600;
}
.nl-badge-primary       { background: var(--nl-primary-10);    color: var(--nl-primary); }
.nl-badge-accent        { background: var(--nl-accent-10);     color: #d64f2a; }
.nl-badge-success       { background: rgba(66,207,138,0.2);    color: var(--nl-success-text); }
.nl-badge-danger        { background: var(--nl-danger-8);      color: var(--nl-danger); }
.nl-badge-neutral       { background: rgba(161,161,170,0.15);  color: var(--nl-700); }
.nl-badge-solid-primary { background: var(--nl-primary); color: #fff; }
.nl-badge-solid-accent  { background: var(--nl-accent);  color: #fff; }
.nl-badge-solid-dark    { background: var(--nl-900);     color: #fff; }
</style>
```

```jsx
// JSX (@nlace/ui-kit)
import { Badge } from '@nlace/ui-kit'
<Badge variant="primary">Nuevo</Badge>
<Badge variant="success">Activo</Badge>
<Badge variant="solidPrimary">v1.5.0</Badge>
```

---

### Input

**Estados:** rest · focus · error · success · disabled

```html
<div class="nl-field">
  <label class="nl-label">Correo electrónico</label>
  <input class="nl-input" type="email" placeholder="tu@ejemplo.com">
</div>

<div class="nl-field">
  <label class="nl-label">RUT</label>
  <input class="nl-input nl-input-error" type="text" value="12.345.678-9">
  <p class="nl-hint nl-hint-error">Formato inválido</p>
</div>

<div class="nl-field">
  <label class="nl-label">Usuario</label>
  <input class="nl-input nl-input-success" type="text" value="cristian">
  <p class="nl-hint">Como aparece en tu perfil</p>
</div>

<style>
.nl-field   { display: flex; flex-direction: column; gap: 6px; width: 100%; }
.nl-label   { font-family: var(--nl-font-body); font-size: 0.82rem; font-weight: 600; color: var(--nl-text); }
.nl-input {
  width: 100%;
  min-height: 44px;
  padding: 0 14px;
  background: #ffffff;
  border: 1.5px solid var(--nl-border-ui);
  border-radius: var(--nl-radius-input);
  font-family: var(--nl-font-body);
  font-size: 0.9rem;
  color: var(--nl-text);
  outline: none;
  transition: border-color var(--nl-dur-ui) var(--nl-ease),
              box-shadow   var(--nl-dur-ui) var(--nl-ease);
}
.nl-input::placeholder { color: var(--nl-400); }
.nl-input:focus {
  border-color: var(--nl-primary);
  box-shadow: 0 0 0 4px var(--nl-primary-20);
}
.nl-input:disabled { opacity: 0.5; cursor: not-allowed; }
.nl-input-error   { border-color: var(--nl-danger); }
.nl-input-error:focus { box-shadow: 0 0 0 4px var(--nl-danger-8); }
.nl-input-success { border-color: var(--nl-success-dark); }
.nl-input-success:focus { box-shadow: 0 0 0 4px rgba(43,163,106,0.2); }
.nl-hint       { font-family: var(--nl-font-body); font-size: 0.78rem; color: var(--nl-500); }
.nl-hint-error { color: var(--nl-danger); }
</style>
```

```jsx
// JSX (@nlace/ui-kit)
import { Input } from '@nlace/ui-kit'
<Input label="Correo electrónico" placeholder="tu@ejemplo.com" />
<Input label="RUT" error="Formato inválido" />
<Input label="Usuario" success hint="Como aparece en tu perfil" />
```

---

### Alert

**Variantes:** `info` · `success` · `warning` · `error`  
**Íconos:** `ℹ` · `✓` · `⚠` · `✕` (Unicode, no emoji)

```html
<div class="nl-alert nl-alert-info" role="alert">
  <span class="nl-alert-icon">ℹ</span>
  <div>
    <p class="nl-alert-title">Aviso</p>
    <p class="nl-alert-body">El proceso tardará unos minutos.</p>
  </div>
</div>

<div class="nl-alert nl-alert-success" role="alert">
  <span class="nl-alert-icon">✓</span>
  <div>
    <p class="nl-alert-title">Listo</p>
    <p class="nl-alert-body">Cambios guardados correctamente.</p>
  </div>
</div>

<div class="nl-alert nl-alert-warning" role="alert">
  <span class="nl-alert-icon">⚠</span>
  <div>
    <p class="nl-alert-body">Revisa los datos antes de continuar.</p>
  </div>
</div>

<div class="nl-alert nl-alert-error" role="alert">
  <span class="nl-alert-icon">✕</span>
  <div>
    <p class="nl-alert-title">Error</p>
    <p class="nl-alert-body">No se pudo conectar al servidor.</p>
  </div>
</div>

<style>
.nl-alert {
  display: flex;
  gap: 14px;
  border-radius: 14px;
  padding: 16px;
  border-left: 3px solid transparent;
}
.nl-alert-info    { background: var(--nl-primary-10);  border-color: var(--nl-primary); }
.nl-alert-success { background: var(--nl-success-bg);  border-color: var(--nl-success-dark); }
.nl-alert-warning { background: #fefce8;               border-color: #facc15; }
.nl-alert-error   { background: var(--nl-danger-8);    border-color: var(--nl-danger); }

.nl-alert-icon { font-size: 1rem; margin-top: 2px; }
.nl-alert-info    .nl-alert-icon { color: var(--nl-primary); }
.nl-alert-success .nl-alert-icon { color: var(--nl-success-dark); }
.nl-alert-warning .nl-alert-icon { color: #a16207; }
.nl-alert-error   .nl-alert-icon { color: var(--nl-danger); }

.nl-alert-title {
  font-family: var(--nl-font-body);
  font-size: 0.88rem;
  font-weight: 600;
  margin-bottom: 2px;
}
.nl-alert-info    .nl-alert-title { color: var(--nl-primary); }
.nl-alert-success .nl-alert-title { color: var(--nl-success-text); }
.nl-alert-warning .nl-alert-title { color: #92400e; }
.nl-alert-error   .nl-alert-title { color: var(--nl-danger); }

.nl-alert-body {
  font-family: var(--nl-font-body);
  font-size: 0.85rem;
  color: var(--nl-700);
  margin: 0;
  line-height: 1.5;
}
</style>
```

```jsx
// JSX (@nlace/ui-kit)
import { Alert } from '@nlace/ui-kit'
<Alert variant="info"    title="Aviso">El proceso tardará unos minutos.</Alert>
<Alert variant="success" title="Listo">Cambios guardados correctamente.</Alert>
<Alert variant="warning">Revisa los datos antes de continuar.</Alert>
<Alert variant="error"   title="Error">No se pudo conectar al servidor.</Alert>
```

---

### Spinner y Skeleton

```html
<!-- Spinner -->
<div class="nl-spinner" role="status" aria-label="Cargando"></div>
<div class="nl-spinner nl-spinner-sm"></div>
<div class="nl-spinner nl-spinner-lg"></div>

<!-- Skeleton -->
<div class="nl-skeleton" style="width:200px;height:20px;"></div>
<div class="nl-skeleton" style="width:100%;height:120px;border-radius:var(--nl-radius-card)"></div>

<style>
.nl-spinner {
  width: 24px; height: 24px;
  border: 2.5px solid var(--nl-border-ui);
  border-top-color: var(--nl-primary);
  border-radius: 50%;
  animation: spin-nl 0.7s linear infinite;
}
.nl-spinner-sm { width: 16px; height: 16px; border-width: 2px; }
.nl-spinner-lg { width: 40px; height: 40px; border-width: 3px; }

.nl-skeleton {
  border-radius: 8px;
  background: linear-gradient(90deg, #dbdcd7 25%, #efefef 50%, #dbdcd7 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s ease-in-out infinite;
}
</style>
```

---

## Iconografía

**Regla absoluta:** íconos siempre **stroke (línea plana)**, **monocromo**, `color: currentColor`. Nunca filled, nunca en color de marca, nunca multi-tono.

**Sistema canónico:** [Lucide](https://lucide.dev) — stroke 1.5, rounded caps, geométrico.

```html
<!-- Cargar Lucide vía CDN -->
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
<script>lucide.createIcons();</script>

<!-- Uso correcto: hereda color del contexto -->
<i data-lucide="arrow-right" style="width:18px;height:18px;"></i>

<!-- En botón: color blanco heredado -->
<button style="background:var(--nl-primary);color:#fff;display:flex;align-items:center;gap:8px;">
  Enviar <i data-lucide="send" style="width:16px;height:16px;"></i>
</button>
```

| Tamaño | Uso |
|---|---|
| 16px | Inline en texto, dentro de badges |
| 18px | Botones md, nav items |
| 20–24px | Íconos standalone, section headers |
| 32px+ | Ilustraciones funcionales, estados vacíos |

**Prohibido:** íconos con `fill`, íconos en color de marca (`color: var(--nl-primary)`), emoji expresivos en cualquier contexto de producto.

---

## Fotografía e imágenes

El repositorio incluye assets de fotografía oficiales:

**`assets/photos/`** — 14 fotografías del equipo NLACE:

| Archivo | URL directa | Descripción |
|---|---|---|
| `portrait-smile.jpg` | [↗](https://raw.githubusercontent.com/NLACE-COM/ui-kit/main/assets/photos/portrait-smile.jpg) | Retrato individual, sonrisa natural |
| `portrait-duo.jpg` | [↗](https://raw.githubusercontent.com/NLACE-COM/ui-kit/main/assets/photos/portrait-duo.jpg) | Dos personas, contexto colaborativo |
| `portrait-speaking.jpg` | [↗](https://raw.githubusercontent.com/NLACE-COM/ui-kit/main/assets/photos/portrait-speaking.jpg) | Persona hablando/presentando |
| `team-group-laptop.jpg` | [↗](https://raw.githubusercontent.com/NLACE-COM/ui-kit/main/assets/photos/team-group-laptop.jpg) | Grupo de trabajo con laptop |
| `team-meeting-01.jpg` | [↗](https://raw.githubusercontent.com/NLACE-COM/ui-kit/main/assets/photos/team-meeting-01.jpg) | Reunión de equipo |
| `team-meeting-02.jpg` | [↗](https://raw.githubusercontent.com/NLACE-COM/ui-kit/main/assets/photos/team-meeting-02.jpg) | Reunión de equipo |
| `team-meeting-03.jpg` | [↗](https://raw.githubusercontent.com/NLACE-COM/ui-kit/main/assets/photos/team-meeting-03.jpg) | Reunión de equipo |
| `team-portrait-01.jpg` | [↗](https://raw.githubusercontent.com/NLACE-COM/ui-kit/main/assets/photos/team-portrait-01.jpg) | Retrato de equipo |
| `team-portrait-02.jpg` | [↗](https://raw.githubusercontent.com/NLACE-COM/ui-kit/main/assets/photos/team-portrait-02.jpg) | Retrato de equipo |
| `collab-laptop.jpg` | [↗](https://raw.githubusercontent.com/NLACE-COM/ui-kit/main/assets/photos/collab-laptop.jpg) | Colaboración con laptop |
| `hands-laptop-dark.jpg` | [↗](https://raw.githubusercontent.com/NLACE-COM/ui-kit/main/assets/photos/hands-laptop-dark.jpg) | Manos en laptop, fondo oscuro |
| `hands-laptop-light.jpg` | [↗](https://raw.githubusercontent.com/NLACE-COM/ui-kit/main/assets/photos/hands-laptop-light.jpg) | Manos en laptop, fondo claro |
| `hands-notes.jpg` | [↗](https://raw.githubusercontent.com/NLACE-COM/ui-kit/main/assets/photos/hands-notes.jpg) | Manos tomando notas |
| `hands-writing.jpg` | [↗](https://raw.githubusercontent.com/NLACE-COM/ui-kit/main/assets/photos/hands-writing.jpg) | Manos escribiendo |

**Base URL para fotos:** `https://raw.githubusercontent.com/NLACE-COM/ui-kit/main/assets/photos/`

**`assets/imagery/`** — 34 imágenes AI generadas para secciones tecnológicas.  
**Base URL:** `https://raw.githubusercontent.com/NLACE-COM/ui-kit/main/assets/imagery/`  
Archivos: `ai-01.png` → `ai-34.png`

```html
<!-- Ejemplo de uso con URL directa -->
<img
  src="https://raw.githubusercontent.com/NLACE-COM/ui-kit/main/assets/photos/team-meeting-01.jpg"
  alt="Equipo NLACE en reunión"
  style="width:100%;border-radius:var(--nl-radius-card);object-fit:cover;"
>
```

### Reglas de uso de fotografía

- Siempre usar fotos del directorio oficial. Sin stock genérico.
- Sobre fotos oscuras: overlay `rgba(15,16,17,0.45–0.65)`.
- Sobre fotos con overlay de color: `rgba(primario, 0.5–0.65)`.
- **Sin** overlays diagonales. **Sin** filtros de color sobre fotos de personas.
- Estilo: luz natural cálida, contexto latinoamericano. Grano de película sutil es aceptable.

```css
/* Overlay oscuro estándar sobre foto */
.nl-photo-overlay {
  position: relative;
}
.nl-photo-overlay::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(15,16,17,0) 0%, rgba(15,16,17,0.55) 100%);
  border-radius: inherit;
}
```

---

## Logo NLACE

Dos variantes: oscura (sobre fondos claros) y clara (sobre fondos oscuros).

### URLs de acceso directo (GitHub)

```
# Wordmark oscuro — sobre fondos claros (#efefef, blanco)
https://raw.githubusercontent.com/NLACE-COM/ui-kit/main/assets/nlace-black.svg

# Wordmark claro — sobre fondos oscuros (hero, nav dark)
https://raw.githubusercontent.com/NLACE-COM/ui-kit/main/assets/nlace-white.svg
```

### Uso con URL

```html
<!-- Sobre fondo claro -->
<img src="https://raw.githubusercontent.com/NLACE-COM/ui-kit/main/assets/nlace-black.svg" alt="NLACE" height="32">

<!-- Sobre fondo oscuro o hero -->
<img src="https://raw.githubusercontent.com/NLACE-COM/ui-kit/main/assets/nlace-white.svg" alt="NLACE" height="32">
```

### Markup SVG inline — wordmark oscuro (para fondos claros)

```svg
<svg width="464" height="125" viewBox="0 0 464 125" xmlns="http://www.w3.org/2000/svg">
  <path d="M0 123.169V34.454H28.965L30.297 52.43l-6.326 2a24.309 24.309 0 0 1 6.492-11.152 34.6 34.6 0 0 1 11.487-7.825 35.391 35.391 0 0 1 13.983-2.83c6.659 0 12.263 1.387 16.813 4.161a24.663 24.663 0 0 1 10.488 12.15c3.553 7.99 4.434 14.537 4.434 26.188v54.594H55.933v-52.1a16.819 16.819 0 0 0-1.332-7.157 9.327 9.327 0 0 0-4-4.494 11.593 11.593 0 0 0-6.326-1.332 16.741 16.741 0 0 0-5.327.832 11.132 11.132 0 0 0-4.162 2.663 11.85 11.85 0 0 0-2.83 3.828 13.35 13.35 0 0 0-.832 4.827v52.929H0Z" fill="#141414"></path>
  <path d="M103.929 123.169V0h30.964v123.169h-30.964Z" fill="#141414"></path>
  <path d="M183.894 124.667a35.164 35.164 0 0 1-19.81-5.825 42.478 42.478 0 0 1-13.817-16.312 54.7 54.7 0 0 1-4.994-23.8c0-9.099 1.665-17.088 4.994-23.968a39.437 39.437 0 0 1 13.817-16.145 35.285 35.285 0 0 1 20.309-5.992 36.708 36.708 0 0 1 11.32 1.664 26.914 26.914 0 0 1 8.989 4.827 36.936 36.936 0 0 1 6.659 7.157 40.531 40.531 0 0 1 4.661 8.655l-6.325-.333V34.454H240.16v88.715H209.031V101.531l6.825.333a33.93 33.93 0 0 1-11.486 16.312 37.088 37.088 0 0 1-9.323 4.824 35.157 35.157 0 0 1-11.153 1.667Zm8.823-25.466a17.28 17.28 0 0 0 9.156-2.33 15.625 15.625 0 0 0 5.826-7.157 25.864 25.864 0 0 0 2.164-10.985 26.3 26.3 0 0 0-2.164-11.152 14.636 14.636 0 0 0-5.826-6.991 18.037 18.037 0 0 0-18.312 0 14.975 14.975 0 0 0-5.66 6.991 28.2 28.2 0 0 0-2 11.152 27.732 27.732 0 0 0 2 10.985 16.031 16.031 0 0 0 5.66 7.157 17.277 17.277 0 0 0 9.156 2.33Z" fill="#141414"></path>
  <path d="M298.074 124.834a46.8 46.8 0 0 1-23.638-5.992 44.24 44.24 0 0 1-16.314-16.312 47.109 47.109 0 0 1-5.993-23.8 46.2 46.2 0 0 1 5.993-23.635 43.875 43.875 0 0 1 16.314-16.478 46.79 46.79 0 0 1 23.638-5.992 60.923 60.923 0 0 1 21.974 3.828A38.016 38.016 0 0 1 336.2 47.437L319.382 67.41a18.918 18.918 0 0 0-4.661-4.161 20.772 20.772 0 0 0-6.326-3 22.581 22.581 0 0 0-7.491-1.165 18.4 18.4 0 0 0-9.655 2.5 17.182 17.182 0 0 0-6.492 6.991 22.041 22.041 0 0 0-2.164 9.987 22.041 22.041 0 0 0 2.164 9.987 17.423 17.423 0 0 0 6.326 6.991A18.357 18.357 0 0 0 300.9 98.2a26.04 26.04 0 0 0 7.491-1 20.933 20.933 0 0 0 6.16-2.829 20.131 20.131 0 0 0 4.827-4.328L336.2 110.186A40.092 40.092 0 0 1 319.882 121 60.448 60.448 0 0 1 298.074 124.834Z" fill="#141414"></path>
  <path d="M387.768 124.834c-10.099 0-18.811-1.998-26.135-5.826a42.936 42.936 0 0 1-16.98-16.312 47.106 47.106 0 0 1-5.993-23.8 50.173 50.173 0 0 1 3.329-18.475 43.522 43.522 0 0 1 9.322-14.647 40.178 40.178 0 0 1 14.15-9.654 46.4 46.4 0 0 1 18.145-3.5 44.22 44.22 0 0 1 17.479 3.329 38.271 38.271 0 0 1 13.651 9.487 41.031 41.031 0 0 1 8.823 14.481 46.7 46.7 0 0 1 2.83 18.309l-.167 6.991H356.306l-3.829-15.489h48.941l-3 3.329v-3.162a10.241 10.241 0 0 0-2-6.325 11.85 11.85 0 0 0-4.994-4.328 16.521 16.521 0 0 0-7.158-1.5 17.954 17.954 0 0 0-9.489 2.33 14.314 14.314 0 0 0-5.659 6.325 22.894 22.894 0 0 0-2 9.987 23.429 23.429 0 0 0 2.663 11.485 19.088 19.088 0 0 0 8.157 7.49 30.321 30.321 0 0 0 13.318 2.663 27.386 27.386 0 0 0 8.989-1.332 31.062 31.062 0 0 0 8.49-4.66l14.316 20.14a60.03 60.03 0 0 1-11.819 7.49 58.981 58.981 0 0 1-23.472 5.16Z" fill="#141414"></path>
  <path d="M448.352 125c-4.994 0-8.878-1.387-11.653-4.161-2.663-2.774-3.995-6.713-3.995-11.818a15.879 15.879 0 0 1 4.328-11.484 15.006 15.006 0 0 1 11.32-4.494c4.883 0 8.712 1.387 11.486 4.161S464 104.917 464 109.021a15.878 15.878 0 0 1-4.328 11.485A15.006 15.006 0 0 1 448.352 125Z" fill="#141414"></path>
</svg>
```

### Markup SVG inline — wordmark claro (para fondos oscuros)

```svg
<svg width="464" height="125" viewBox="0 0 464 125" xmlns="http://www.w3.org/2000/svg">
  <path d="M0 123.169V34.454H28.965L30.297 52.43l-6.326 2a24.309 24.309 0 0 1 6.492-11.152 34.6 34.6 0 0 1 11.487-7.825 35.391 35.391 0 0 1 13.983-2.83c6.659 0 12.263 1.387 16.813 4.161a24.663 24.663 0 0 1 10.488 12.15c3.553 7.99 4.434 14.537 4.434 26.188v54.594H55.933v-52.1a16.819 16.819 0 0 0-1.332-7.157 9.327 9.327 0 0 0-4-4.494 11.593 11.593 0 0 0-6.326-1.332 16.741 16.741 0 0 0-5.327.832 11.132 11.132 0 0 0-4.162 2.663 11.85 11.85 0 0 0-2.83 3.828 13.35 13.35 0 0 0-.832 4.827v52.929H0Z" fill="#ffffff"></path>
  <path d="M103.929 123.169V0h30.964v123.169h-30.964Z" fill="#ffffff"></path>
  <path d="M183.894 124.667a35.164 35.164 0 0 1-19.81-5.825 42.478 42.478 0 0 1-13.817-16.312 54.7 54.7 0 0 1-4.994-23.8c0-9.099 1.665-17.088 4.994-23.968a39.437 39.437 0 0 1 13.817-16.145 35.285 35.285 0 0 1 20.309-5.992 36.708 36.708 0 0 1 11.32 1.664 26.914 26.914 0 0 1 8.989 4.827 36.936 36.936 0 0 1 6.659 7.157 40.531 40.531 0 0 1 4.661 8.655l-6.325-.333V34.454H240.16v88.715H209.031V101.531l6.825.333a33.93 33.93 0 0 1-11.486 16.312 37.088 37.088 0 0 1-9.323 4.824 35.157 35.157 0 0 1-11.153 1.667Zm8.823-25.466a17.28 17.28 0 0 0 9.156-2.33 15.625 15.625 0 0 0 5.826-7.157 25.864 25.864 0 0 0 2.164-10.985 26.3 26.3 0 0 0-2.164-11.152 14.636 14.636 0 0 0-5.826-6.991 18.037 18.037 0 0 0-18.312 0 14.975 14.975 0 0 0-5.66 6.991 28.2 28.2 0 0 0-2 11.152 27.732 27.732 0 0 0 2 10.985 16.031 16.031 0 0 0 5.66 7.157 17.277 17.277 0 0 0 9.156 2.33Z" fill="#ffffff"></path>
  <path d="M298.074 124.834a46.8 46.8 0 0 1-23.638-5.992 44.24 44.24 0 0 1-16.314-16.312 47.109 47.109 0 0 1-5.993-23.8 46.2 46.2 0 0 1 5.993-23.635 43.875 43.875 0 0 1 16.314-16.478 46.79 46.79 0 0 1 23.638-5.992 60.923 60.923 0 0 1 21.974 3.828A38.016 38.016 0 0 1 336.2 47.437L319.382 67.41a18.918 18.918 0 0 0-4.661-4.161 20.772 20.772 0 0 0-6.326-3 22.581 22.581 0 0 0-7.491-1.165 18.4 18.4 0 0 0-9.655 2.5 17.182 17.182 0 0 0-6.492 6.991 22.041 22.041 0 0 0-2.164 9.987 22.041 22.041 0 0 0 2.164 9.987 17.423 17.423 0 0 0 6.326 6.991A18.357 18.357 0 0 0 300.9 98.2a26.04 26.04 0 0 0 7.491-1 20.933 20.933 0 0 0 6.16-2.829 20.131 20.131 0 0 0 4.827-4.328L336.2 110.186A40.092 40.092 0 0 1 319.882 121 60.448 60.448 0 0 1 298.074 124.834Z" fill="#ffffff"></path>
  <path d="M387.768 124.834c-10.099 0-18.811-1.998-26.135-5.826a42.936 42.936 0 0 1-16.98-16.312 47.106 47.106 0 0 1-5.993-23.8 50.173 50.173 0 0 1 3.329-18.475 43.522 43.522 0 0 1 9.322-14.647 40.178 40.178 0 0 1 14.15-9.654 46.4 46.4 0 0 1 18.145-3.5 44.22 44.22 0 0 1 17.479 3.329 38.271 38.271 0 0 1 13.651 9.487 41.031 41.031 0 0 1 8.823 14.481 46.7 46.7 0 0 1 2.83 18.309l-.167 6.991H356.306l-3.829-15.489h48.941l-3 3.329v-3.162a10.241 10.241 0 0 0-2-6.325 11.85 11.85 0 0 0-4.994-4.328 16.521 16.521 0 0 0-7.158-1.5 17.954 17.954 0 0 0-9.489 2.33 14.314 14.314 0 0 0-5.659 6.325 22.894 22.894 0 0 0-2 9.987 23.429 23.429 0 0 0 2.663 11.485 19.088 19.088 0 0 0 8.157 7.49 30.321 30.321 0 0 0 13.318 2.663 27.386 27.386 0 0 0 8.989-1.332 31.062 31.062 0 0 0 8.49-4.66l14.316 20.14a60.03 60.03 0 0 1-11.819 7.49 58.981 58.981 0 0 1-23.472 5.16Z" fill="#ffffff"></path>
  <path d="M448.352 125c-4.994 0-8.878-1.387-11.653-4.161-2.663-2.774-3.995-6.713-3.995-11.818a15.879 15.879 0 0 1 4.328-11.484 15.006 15.006 0 0 1 11.32-4.494c4.883 0 8.712 1.387 11.486 4.161S464 104.917 464 109.021a15.878 15.878 0 0 1-4.328 11.485A15.006 15.006 0 0 1 448.352 125Z" fill="#ffffff"></path>
</svg>
```

```jsx
// JSX (@nlace/ui-kit)
import { NlaceLogo, NlaceAvatar } from '@nlace/ui-kit'
<NlaceLogo variant="dark"  height={32} />   // sobre fondos claros
<NlaceLogo variant="light" height={32} />   // sobre fondos oscuros
<NlaceAvatar size={40} />                   // avatar cuadrado
```

---

## Tailwind v4 (Next.js 15+)

```css
/* app/globals.css */
@import "tailwindcss";
@import "@nlace/ui-kit/tailwind-v4";

/* El @source es obligatorio para que Tailwind v4 escanee clases del kit */
@source "../node_modules/@nlace/ui-kit/dist";
```

**Clases disponibles:**
- Colores: `bg-nl-primary` · `text-nl-accent` · `border-nl-border-soft` · `text-nl-700`
- Radios: `rounded-input` · `rounded-card` · `rounded-pill`
- Sombras: `shadow-card` · `shadow-hover`
- Gradientes: `bg-nl-hero` · `bg-nl-brand` · `bg-nl-accent` · `bg-nl-primary`
- Animaciones: `animate-fade-up` · `animate-shimmer` · `animate-pulse-ring` · `animate-spin-nl`
- Tipografía: `font-display` · `font-body` · `font-mono`
- Tracking: `tracking-nl-tight` · `tracking-nl-normal` · `tracking-nl-ui`
- Motion: `duration-ui` · `duration-reveal` · `ease-nl`

**Tokens adicionales con `@theme` (no `tailwind.config.js`).**  
No introducir paletas paralelas si ya existe token equivalente.

---

## Tailwind v3

```js
// tailwind.config.js
module.exports = {
  presets: [require('@nlace/ui-kit/preset')],
}
```

---

## Idioma y tono

- **Idioma:** Español latinoamericano (registro chileno). UI de cara al usuario siempre en español.
- **Tono:** Directo, funcional, sin fluff. Como un product engineer hablando a otro.
- **Persona:** `tú` (informal). Nunca `usted`.
- **Casing:** Sentence case en todo. Sin ALL-CAPS en titulares.
- **CTAs (imperativo):** `Empezar` · `Guardar` · `Cancelar` · `Eliminar` · `Continuar` · `Conectar`
- **Estado (declarativo):** `Cambios guardados correctamente.` · `El proceso tardará unos minutos.` · `Revisa los datos antes de continuar.`
- **Campos:** `Como aparece en tu perfil` · `Formato inválido` · `tu@ejemplo.com`
- **Sin** exclamaciones. **Sin** lenguaje de marketing ("¡Genial!", "¡Increíble!"). **Sin** emoji en producto.
- Nombres propios en caps: `NLACE AI Studio`, `RUT`, `UI`.

---

## Backgrounds y fondos

| Contexto | Regla |
|---|---|
| Canvas de app | `#efefef` — NUNCA blanco puro |
| Cards | `#ffffff` + border-soft + shadow-card |
| Hero sections | `nl-grad-hero` (azul → magenta → pink) o `nl-grad-dark` |
| Slides de énfasis | Fondos claros por defecto. Color de marca (azul/acento) para slides de énfasis. Sin negro completo. |
| Sobre fotografía | Overlay oscuro `rgba(15,16,17,0.45–0.65)` |
| Secciones con color | Solo bloques sólidos o gradientes nombrados. Sin texturas, sin patrones repetitivos. |

---

## Anti-patterns — nunca hacer esto

| Prohibido | Alternativa |
|---|---|
| Canvas con fondo blanco `#ffffff` | Usar `#efefef` |
| Texto gris sobre fondo de color | Usar blanco o `#0f1011` según el fondo |
| Sombras de color (glow azul, etc.) | Solo `shadow-card` y `shadow-hover` neutras |
| Glassmorphism / blur decorativo | Fondos sólidos o gradientes nombrados |
| Formas con clip-path diagonal | Splits siempre verticales u horizontales |
| Íconos filled o en color de marca | Lucide stroke, `currentColor` |
| Emoji expresivos en UI de producto | Nada, o Unicode glyphs solo en Alert |
| ALL-CAPS en titulares | Sentence case; mayúsculas solo en eyebrows |
| `nl-grad-brand` en botones o UI funcional | Solo en text-gradient de titulares |
| Tercera paleta de colores paralela | Usar tokens existentes de `--nl-*` |
| Stock photography genérico | `assets/photos/` del repositorio |
| Overlays diagonales sobre fotos | Overlay lineal vertical `rgba(15,16,17,...)` |
| Body en Space Grotesk | Space Grotesk solo para titulares |
| Titulares en Inter | Inter solo para body, UI, labels |

---

## Patrones de sección frecuentes

### Hero section

```html
<section class="nl-hero">
  <p class="nl-eyebrow">Plataforma de IA</p>
  <h1>Automatiza tu <span class="nl-text-gradient">flujo de trabajo</span></h1>
  <p class="nl-lead">Descripción breve y directa en una o dos líneas.</p>
  <div style="display:flex;gap:12px;flex-wrap:wrap;">
    <button class="nl-btn nl-btn-primary nl-btn-lg">Empezar</button>
    <button class="nl-btn nl-btn-secondary nl-btn-lg">Ver demo</button>
  </div>
</section>

<style>
.nl-hero {
  background: var(--nl-grad-hero);
  color: #ffffff;
  padding: 96px 40px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}
.nl-hero h1   { color: #ffffff; }
.nl-hero .nl-lead { color: rgba(255,255,255,0.75); }
.nl-hero .nl-eyebrow { color: rgba(255,255,255,0.65); }
</style>
```

### Grid de cards

```html
<section style="background:var(--nl-bg);padding:64px 40px;">
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;max-width:1200px;margin:0 auto;">
    <div class="nl-card">
      <i data-lucide="zap" style="width:24px;height:24px;color:var(--nl-primary);margin-bottom:16px;"></i>
      <h4>Título</h4>
      <p>Descripción breve de la funcionalidad.</p>
    </div>
    <div class="nl-card">...</div>
    <div class="nl-card nl-card-accent">
      <h4 style="color:#fff">Card destacada</h4>
      <p style="color:rgba(255,255,255,0.8)">CTA principal del grid.</p>
    </div>
  </div>
</section>
```

---

## Accesibilidad mínima (siempre verificar)

- Contraste AA: texto sobre fondos (ratio mínimo 4.5:1 para body, 3:1 para títulos grandes).
- Foco visible: `focus-visible` con ring de 4px al 20% de opacidad del color semántico.
- Target táctil: mínimo 44×44px en todos los elementos interactivos.
- `role="alert"` en componente Alert.
- `aria-label="Cargando"` en Spinner.
- `prefers-reduced-motion` siempre respetado.

---

## Archivos en este repositorio

```
DESIGN.md                    ← este archivo (fuente de verdad para agentes)
SKILL.md                     ← skill para Claude Code
README.md                    ← brand guide detallado
colors_and_type.css          ← CSS variables canónicas + @font-face + selectores base
fonts/
  Inter-VariableFont_opsz_wght.ttf
  Inter-Italic-VariableFont_opsz_wght.ttf
  SpaceGrotesk-VariableFont_wght.ttf
assets/
  nlace-black.svg            ← wordmark oscuro
  nlace-white.svg            ← wordmark claro
  photos/                    ← 14 fotos oficiales del equipo
  imagery/                   ← 34 imágenes AI (ai-01.png … ai-34.png)
src/
  tokens/tokens.css          ← variables CSS para Tailwind v3
  tokens/tailwind-v4.css     ← @theme para Tailwind v4
  tailwind-preset.js         ← preset Tailwind v3
  components/
    Button.jsx  Card.jsx  Badge.jsx
    Input.jsx   Alert.jsx  Loaders.jsx  NlaceLogo.jsx
preview/                     ← páginas HTML del design system
skill/SKILL.md               ← skill v2.1.0 (npm package)
```
