# NLACE Design System

Internal design system for **NLACE** — the company's visual foundation for its own product suite (internal tools, AI products, client dashboards) and marketing surfaces.

> _Paquete interno de NLACE para el desarrollo de productos propios. Contiene los tokens de diseño, el preset de Tailwind CSS y los componentes React del sistema de diseño oficial._

This package is the source of truth for every NLACE-built product, from internal tools to **NLACE AI Studio**. It guarantees consistency across projects and eliminates repeated design decisions.

## Sources

This system was reconstructed from the following:

- **Code repo:** [github.com/NLACE-COM/ui-kit](https://github.com/NLACE-COM/ui-kit) — tokens CSS, Tailwind v4 theme, Tailwind v3 preset, React components, logo assets.
- **Figma (canonical):** https://www.figma.com/design/hboE6NgrEkFXgC9B0M5B18/NLACE-Design-System (fileKey `hboE6NgrEkFXgC9B0M5B18`, root node `2:1677`).
- **Marketing site:** [nlace.com](https://nlace.com).
- **Existing skill:** `skill/SKILL.md` inside the repo (v2.1.0).

Precedence rule from the source skill: **Figma > SKILL.md > model defaults**.

## Products in the NLACE ecosystem

NLACE builds many internal and client products. The known surfaces that share this kit:

- **NLACE AI Studio** — flagship AI product.
- **nlace-hq / nlace-new-site** — marketing surface.
- **NLACE Docs** — documentation.
- **Vertical tools** — Agrointegral, Evo (academic impact MVP), Mutualidades, Forge, Cotizador, Firmas, Casas Chile, Mercier Chile, Cierro, BoardAsAService, etc.

The common denominator across all of them: **Space Grotesk** display type, **Inter** body type, the NLACE blue (`#3f58ea`), a warm accent red (`#ff6143`), and a restrained neutral system.

---

## CONTENT FUNDAMENTALS

The source repo's README, component API, and SKILL.md are in **Spanish**. Copy across NLACE products follows the same voice.

- **Language:** Spanish (Latin American / Chilean register). English is acceptable for dev-facing docs and npm metadata, but user-facing UI is Spanish by default.
- **Tone:** Direct, functional, no fluff. Think "product engineer talking to another engineer." Short sentences. Imperative for CTAs (`Empezar`, `Guardar`, `Cancelar`, `Eliminar`). Declarative for state (`El proceso tardará unos minutos.`, `Cambios guardados correctamente.`, `Revisa los datos antes de continuar.`).
- **Person:** Neutral/informal — uses `tú`, not `usted` (`tu@ejemplo.com`, `Como aparece en tu perfil`).
- **Casing:** Sentence case for UI strings and headlines. Product names `NLACE AI Studio` and acronyms (`RUT`, `UI`) stay in caps. No ALL-CAPS headlines.
- **Punctuation:** Lowercase start for eyebrow labels, minimal punctuation in tight UI strings. Full sentences in alerts and descriptions.
- **Emoji:** Not used in product UI or marketing copy. The `Alert` component uses literal Unicode symbols (`ℹ ✓ ⚠ ✕`) as compact glyphs — not "emoji" in the expressive sense.
- **Vibe:** Utilitarian, industrial, Latin American tech confidence. Zero marketing-speak, zero "delighted" language, zero exclamation marks unless an error genuinely warrants urgency.

**Specific examples (lifted from the source):**

- Button labels: `Empezar` · `Guardar` · `Cancelar` · `Eliminar`
- Badge labels: `Nuevo` · `Beta` · `Activo` · `v1.5.0`
- Alert copy:
  - info → `Aviso` / `El proceso tardará unos minutos.`
  - success → `Listo` / `Cambios guardados correctamente.`
  - warning → `Revisa los datos antes de continuar.`
  - error → `Error` / `No se pudo conectar al servidor.`
- Field hints: `Como aparece en tu perfil`, `Formato inválido` (for RUT validation).

---

## VISUAL FOUNDATIONS

### Colors

- **Primary:** NLACE Blue `#3f58ea` (electric, slightly purple-leaning). Dark variant `#2f2f81` for gradient endings and hero sections.
- **Accent:** NLACE Red-Orange `#ff6143`, warm variant `#ff8c42`. Used sparingly — CTAs, highlights, brand text-gradient endings.
- **Neutrals:** Zinc scale (`#18181b`, `#3f3f46`, `#71717a`, `#a1a1aa`), plus `#d4d4d8` / `#e8e8e8` borders. App background is the distinctive off-white `#efefef` — **not** pure white.
- **Semantic:** Success mint `#6be8b0` (pill) + `#22c55e` (stroke), danger `#dc2626`.
- **Never** use pure white `#ffffff` as the page background. Cards are white; the canvas is `#efefef`.

### Typography

- **Display:** Space Grotesk — headlines, hero numbers, logo wordmark feel. Weights 500–700.
- **Body:** Inter — everything else. Weights 400 / 500 / 600 / 700.
- **Mono:** SF Mono → Fira Code → JetBrains Mono (as Google Fonts substitute for web). Code blocks, keyboard shortcuts.
- **Tracking:** `-0.03em` for large display, `-0.018em` for standard headings, `+0.08em` for UPPERCASE eyebrows and labels.

### Spacing & layout

- Tailwind default scale (4-px steps). No custom spacing tokens — intentional restraint.
- Inputs: `min-h-[44px]` (AA touch target), `px-[14px]`.
- Buttons: `sm` 16×6 px, `md` 22×11 px, `lg` 30×15 px.
- Content typically max-width 1200–1280 px, generous gutters.

### Backgrounds

- **App canvas:** `#efefef` flat — no textures, patterns, or dot grids.
- **Hero sections:** the named gradient `nl-hero` — a deep indigo `#2f2f81 → #1a1a5e → #2d1f6e` at 135°. Saturated, almost indigo-navy.
- **Brand accents:** `nl-brand` — a 90° bar gradient from `#3f58ea` to `#ff6143` used for headline text-gradient effects.
- **No** hand-drawn illustrations, no repeating textures, no photography-first marketing aesthetic in the kit itself. Product screens rely on typography and color blocks.
- Full-bleed imagery is allowed in marketing, but always beneath a dark overlay (`nl-overlay-dark`: 0 → 55% black top-to-bottom).

### Motion

- **Duration:** `--nl-dur-ui` = **220ms** for micro-interactions; `--nl-dur-reveal` = **480ms** for entrance reveals.
- **Easing:** `cubic-bezier(0.22, 1, 0.36, 1)` — the "quart-out" curve, soft decelerate. Applied as `ease-nl` everywhere.
- **Named animations:** `fade-up` (12 px rise + fade, reveal), `pulse-ring` (scale 1→2.2 + fade), `shimmer` (skeleton loading), `spin-nl` (fast spinner, 0.7 s).
- **Reduced motion:** strictly honored — all animations clamp to 0.01 ms under `prefers-reduced-motion`.

### Interaction states

- **Hover (buttons):** `translateY(-2px)` + `shadow-hover`. No color darkening — the lift IS the affordance.
- **Hover (cards):** same — `translateY(-3px)` + larger drop shadow. 220 ms `ease-nl`.
- **Hover (links):** underline reveals via `border-bottom` transition.
- **Press:** no explicit press-state in the kit; translate-0 on `:disabled` serves as the implicit "no-op".
- **Focus:** `focus:ring-4` at 20% opacity of the relevant semantic color (primary, danger, success). Never removed.
- **Disabled:** `opacity-40`, no lift, no shadow, `cursor-not-allowed`.

### Borders, corners, shadows

- **Radii:** `10 px` for inputs, `20 px` for cards, `9999px` (pill) for buttons and badges. Alerts sit between at `14 px`.
- **Borders:** always hairline (`1 px` or `1.5 px`), always `--nl-border-soft` / `--nl-border-ui`. Borders are for separation, not decoration.
- **Shadows:** **two** levels only — `shadow-card` (rest) and `shadow-hover` (lifted). Both are soft, low-opacity, neutral-black (`rgba(20,20,20,0.08 / 0.14)`). No colored shadows, no layered glows.
- **Protection gradients:** used exclusively over imagery — `nl-overlay-dark` (bottom-weighted black fade) for legibility.

### Transparency, blur

- Alpha tokens are semantic: `primary/10`, `primary/20`, `accent/10`, `danger/8`. These drive badge fills and focus rings — **not** decorative glass.
- Blur/glassmorphism is **not** part of the system.

### Cards

- **Rest:** `bg-white`, `border-nl-border-soft`, `shadow-card`, `rounded-card (20 px)`, `p-6` default.
- **Hover:** lift 3 px + `shadow-hover`.
- **Accent variant:** solid `bg-nl-primary` + `text-white` + no border. Used for emphasis CTAs within a card grid.

### Imagery

The kit itself ships no photography. When imagery enters a design: warm, natural light, Latin-American context preferred, slight film grain is acceptable. Avoid bluish-purple gradient overlays on photos — use the `nl-overlay-dark` black fade.

---

## ICONOGRAPHY

**The source repo ships essentially no icon system.** It provides only the NLACE wordmark (`NlaceLogo`) and a square avatar mark (`NlaceAvatar`), plus four literal Unicode glyphs used inside the `Alert` component (`ℹ ✓ ⚠ ✕`).

- No icon font. No sprite. No bundled SVG icon set.
- Emoji: **not used** in product UI.
- Unicode glyphs: acceptable for compact single-character indicators (as in Alerts).
- For product UI that needs a real icon system, the recommended substitute — **flagged as a substitution, not a canonical NLACE token** — is **Lucide** (CDN-available, 1.5 stroke, rounded caps). It matches the kit's aesthetic: minimal, geometric, calm. **Heroicons Outline** is a close second.

All recreations in this design system use **Lucide (CDN)** as a stand-in, clearly documented so anyone can swap it out if/when NLACE adopts a canonical set.

Assets provided:

- `assets/nlace-black.svg` — wordmark, dark variant.
- `assets/nlace-white.svg` — wordmark, light variant (derived).
- `NlaceLogo` / `NlaceAvatar` React components (see `src/components/NlaceLogo.jsx`).

---

## Index (manifest)

Root files:

- `README.md` — this file.
- `SKILL.md` — agent-invocable skill definition, cross-compatible with Claude Code agent skills.
- `colors_and_type.css` — canonical CSS variables for type and color plus semantic selectors.
- `LICENSE` — Apache-2.0.

Folders:

- `assets/` — logos (`nlace-black.svg`, `nlace-white.svg`) + the source-repo preview SVGs.
- `src/tokens/` — `tokens.css` (v3 entry) + `tailwind-v4.css` (v4 entry).
- `src/tailwind-preset.js` — Tailwind v3 preset.
- `src/components/` — React components: `Button`, `Card`, `Badge`, `Input`, `Alert`, `NlaceLogo`, `Loaders` (Spinner, Skeleton).
- `skill/SKILL.md` — the original Spanish-language skill shipped with the npm package.
- `preview/` — card-sized HTML previews registered in the Design System tab (colors, type, components, spacing, brand).
- `ui_kits/ai-studio/` — NLACE AI Studio sample UI (index.html + JSX components).

Fonts are loaded from Google Fonts via `colors_and_type.css`. **Flagged substitution:** the source kit specifies SF Mono → Fira Code; the web preview uses **JetBrains Mono** (Google Fonts) as the nearest free equivalent. Provide an actual SF Mono / Fira Code TTF if strict fidelity is required.
