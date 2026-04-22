---
name: nlace-design
description: >
  Diseñador oficial de NLACE. Usa este skill en cualquier tarea visual para NLACE
  o marcas del ecosistema (sitios, landing pages, productos, dashboards,
  componentes React/HTML/CSS, emails, slides o piezas UI). Aplica el sistema de
  diseño NLACE con fidelidad a tokens, tipografía, motion y reglas de accesibilidad.
  Si la tarea es frontend o diseño para NLACE, este skill se ejecuta primero.
user-invocable: true
---

**Lee `DESIGN.md`** en la raíz del repositorio. Contiene todos los tokens, reglas, componentes y ejemplos de código necesarios — es la referencia completa y autocontenida. No necesitas leer otros archivos para empezar.

Si creas artefactos visuales (slides, mocks, prototipos), usa los tokens de `DESIGN.md` y genera HTML estático autocontenido. Si trabajas en código de producción, importa desde `@nlace/ui-kit`.

Si el usuario invoca este skill sin más instrucciones, pregunta qué quiere construir y actúa como diseñador experto que genera artefactos HTML _o_ código de producción según la necesidad.

---

## Fuente de verdad

- **Figma:** https://www.figma.com/design/hboE6NgrEkFXgC9B0M5B18/NLACE-Design-System
- **npm:** `@nlace/ui-kit` — tokens CSS, Tailwind v4, preset v3, React components
- **Fotos oficiales:** `assets/photos/` — 14 fotos del equipo NLACE

Precedencia: `Figma > SKILL.md > defaults del modelo`.

---

## Paleta canónica (confirmada por el equipo, prevalece sobre el kit npm)

| Token | Hex | Uso |
|---|---|---|
| `nl-black` | `#0F1011` | Texto principal, fondos oscuros |
| `nl-white` | `#FFFFFF` | Cards, superficies |
| `nl-primary` | `#5869F7` | Primario — bg, texto, borde |
| `nl-accent` | `#FC624B` | CTA, highlights |
| `nl-pink` | `#F76DEE` | Acento secundario, gradientes |
| `nl-magenta` | `#B717AF` | Gradient stop, badge PRO |
| `nl-success` | `#42CF8A` | Estados positivos |
| `nl-surface` | `#DBDCD7` | Border-soft, canvas neutro |

Neutros: `#3F3F46` (700) · `#71717A` (500) · `#A1A1AA` (400) · `#C6C7C2` (border-ui) · `#EFEFEF` (bg)

---

## Tipografía

- **Display:** Space Grotesk — titulares, hero. Pesos 500–700. Tracking -0.03em a -0.018em.
- **Body / UI:** Inter — todo lo demás. Pesos 400/500/600/700.
- **Mono:** JetBrains Mono (web) / SF Mono → Fira Code (producción). Código, etiquetas técnicas.
- **Eyebrows:** Inter o Mono, 10–12px, `font-weight:600`, `letter-spacing:0.08em`, `text-transform:uppercase`.
- Archivos TTF en `fonts/` — Inter variable + Space Grotesk variable.

---

## Tokens de diseño

```css
/* Radios */
--nl-radius-input: 10px;   /* inputs */
--nl-radius-card:  20px;   /* cards */
--nl-radius-pill:  9999px; /* botones, badges */

/* Sombras — solo 2 niveles */
--nl-shadow-card:  0 2px 12px rgba(15,16,17,0.08);
--nl-shadow-hover: 0 10px 28px rgba(15,16,17,0.14);

/* Motion */
--nl-dur-ui:     220ms;  /* micro-interactions */
--nl-dur-reveal: 480ms;  /* entradas de contenido */
--nl-ease: cubic-bezier(0.22, 1, 0.36, 1); /* quart-out, nunca rebota */

/* Gradientes */
--nl-grad-hero:    linear-gradient(135deg, #5869f7 0%, #b717af 60%, #f76dee 100%);
--nl-grad-primary: linear-gradient(135deg, #5869f7 0%, #2d3bc4 100%);
--nl-grad-accent:  linear-gradient(135deg, #fc624b 0%, #f76dee 100%);
--nl-grad-brand:   linear-gradient(90deg,  #5869f7 0%, #fc624b 100%);
--nl-grad-dark:    linear-gradient(180deg, #0f1011 0%, #2d3bc4 100%);
```

---

## Reglas de diseño no negociables

### Color
- El canvas de la app es `#EFEFEF`, nunca blanco puro.
- Cards: `bg-white` + `border-soft` + `shadow-card`.
- **Nunca** texto gris sobre fondo de color. Usar blanco o `#0f1011` según el fondo.
- Solo 2 niveles de sombra. Sin sombras de color. Sin glassmorphism.
- El texto-gradiente de marca (`nl-grad-brand`) solo en titulares, nunca en UI funcional.

### Tipografía
- Titulares: Space Grotesk, tracking negativo (-0.02 a -0.04em).
- Body: Inter, 16px / 1.55 mínimo.
- Sin ALL-CAPS en titulares (solo eyebrows/labels técnicos).
- Sentence case para strings de UI.

### Formas y layout
- **Nunca formas con líneas diagonales** (clip-path diagonal, polígonos inclinados).
- Splits y divisiones siempre verticales u horizontales.
- Fondos: bloques de color sólidos, gradientes nombrados, fotos con overlay. Sin texturas, sin patrones repetitivos.

### Motion
- Hover en botones: `translateY(-2px)` + `shadow-hover`. No cambio de color.
- Hover en cards: `translateY(-3px)` + `shadow-hover`.
- Animaciones de entrada: `fade-up` (12px + opacity), 480ms, `ease-nl`.
- **Siempre** respetar `prefers-reduced-motion`.

### Fotografia
- Fotos oficiales del equipo en `assets/photos/` (14 fotos).
- Sobre fotos oscuras: overlay `rgba(15,16,17,0.45–0.65)`.
- Sobre fotos con overlay de color: usar `rgba(primario, 0.5–0.65)`.
- Sin overlays diagonales. Sin filtros de color sobre fotos de personas.

---

## Iconografía — regla no negociable

- Íconos siempre en **línea plana** (stroke), **monocromo**, `currentColor`.
- **Nunca** filled, nunca en color de marca, nunca multi-tono, nunca decorativos en colores.
- **Sistema de referencia:** Lucide (stroke 1.5, rounded caps, geométrico).
  CDN: `https://unpkg.com/lucide@latest`
- **Emoji:** nunca en UI de producto.
- **Unicode glyphs** (`ℹ ✓ ⚠ ✕`): solo en el componente `Alert`.

Tamaños estándar: 16px (inline) · 18px (botones/nav) · 20–24px (standalone) · 32px+ (estados vacíos).

---

## Componentes clave

| Componente | Variantes |
|---|---|
| **Button** | `accent` · `primary` · `secondary` · `success` · `outline` · `danger` — siempre `border-radius:pill` |
| **Badge** | tonal (12% opacity) + solid — `pill` siempre |
| **Card** | rest · hover (-3px) · accent (bg-primary) |
| **Input** | rest · focus (ring primary/20) · error · success |
| **Alert** | info (blue) · success (green) · warning (pink/magenta) · error (accent) |
| **Spinner** | `border-top-color: primary`, 0.7s linear |
| **Skeleton** | shimmer 200%→200%, 1.4s ease-in-out |

Importar desde: `@nlace/ui-kit`

---

## Presentaciones / decks

- Fondos siempre claros. **Nunca fondos negros** como color de slide completo.
- Fondos de color de marca (azul, rojo) aceptables para slides de énfasis.
- Splits siempre verticales u horizontales. Sin formas diagonales.
- Texto gris solo sobre fondos blancos o `#efefef`. Nunca sobre colores.
- Fotos: siempre del directorio `assets/photos/`. Sin stock genérico.
- Íconos en slides: stroke, monocromo, nunca decorativos en color.

---

## Idioma y tono

- **Español** latinoamericano (registro chileno). UI de cara al usuario en español.
- Tono: directo, funcional, sin fluff. Imperativo para CTAs (`Empezar`, `Guardar`).
- Persona: `tú` (informal). Sin `usted`.
- Casing: sentence case. Sin ALL-CAPS en titulares.
- Sin emoji expresivos en ningún contexto de producto.

---

## Archivos clave

- `README.md` — brand guide completo (contenido, visual, íconos, fotografía)
- `colors_and_type.css` — CSS variables canónicas + @font-face
- `fonts/` — Inter + Space Grotesk variable TTFs
- `assets/nlace-black.svg`, `assets/nlace-white.svg` — wordmark
- `assets/photos/` — 14 fotos oficiales del equipo
- `preview/` — 22+ tarjetas HTML del design system
- `ui_kits/ai-studio/` — UI kit interactivo de NLACE AI Studio
- `src/components/*.jsx` — Button, Badge, Card, Input, Alert, Loaders, NlaceLogo
- `src/tokens/tokens.css` — tokens para Tailwind v3
- `src/tokens/tailwind-v4.css` — tokens para Tailwind v4
- `decks/ventajas-design-system.html` — presentación de referencia (17 slides)
