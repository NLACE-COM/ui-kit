# NLACE Design System — guía de uso

Librería React de NLACE (empresa de IA, producto en español). Los componentes ya vienen
**completamente estilados**: úsalos con sus props, no recrees su markup.

## Setup
- **No requiere provider ni ThemeProvider.** Los estilos llegan por `styles.css` (ya enlazado);
  importa los componentes desde el bundle y listo.
- Las fuentes de marca cargan solas: **títulos en Space Grotesk, cuerpo en Inter** (vía estilos
  base de `h1`–`h6`, `p`). Mono = JetBrains Mono.

## Cómo estilar TU layout (importante)
El entorno **no procesa Tailwind**: NO asumas que clases utilitarias `nl-*` arbitrarias
(`bg-nl-primary`, `gap-md`, …) van a resolver — solo está compilado el subconjunto que ya usan
los componentes. Para tu propio layout/glue, estila con las **variables CSS** del sistema (todas
definidas en `:root`) más CSS/estilos inline normales. Esa es la vocabularia confiable:

**Color** — `var(--nl-primary)` #5869f7 · `--nl-accent` #fc624b · `--nl-success` · `--nl-danger`
· superficies `--nl-bg` #efefef, `--nl-surface`, `--nl-white` · texto `--nl-text`, `--nl-700`,
`--nl-500`, `--nl-400` · bordes `--nl-border-soft`, `--nl-border-ui`.
Aliases semánticos: `--fg-1..--fg-4`, `--bg-1`, `--bg-2`, `--line-soft`, `--line-ui`.

**Gradientes** — `var(--nl-grad-brand)`, `--nl-grad-hero`, `--nl-grad-primary`, `--nl-grad-accent`,
`--nl-grad-mint`, `--nl-grad-dark`, `--nl-grad-surface`, `--nl-grad-warm` (naranja, para CTA).

**Radios** — `var(--nl-radius-card)` 20px · `--nl-radius-input` 10px · `--nl-radius-pill`.
**Sombras** — `var(--nl-shadow-card)` · `--nl-shadow-hover`.
**Tipografía** — `var(--nl-font-display)` · `--nl-font-body` · `--nl-font-mono` · tracking
`--nl-tracking-tight/normal/ui`.
**Motion** — `var(--nl-dur-ui)` 220ms · `var(--nl-ease)`.
**Helpers** (clases listas): `.nl-eyebrow` (label en mayúsculas), `.nl-text-gradient` (texto con
degradado de marca), `.nl-lead` (párrafo destacado), `.nl-overlay-dark` / `.nl-overlay-brand`
(scrim sobre imagen: capa absoluta sobre la `<img>`, el texto va encima), `.nl-on-dark` o
`data-nl-surface="dark"` (fuerza texto blanco sobre superficies de marca oscuras).

## Reglas de marca
- **Nunca uses negro/casi-negro (`#0f1011`) como fondo de relleno** de superficies, bloques o
  footers. Prefiere claros: blanco `#ffffff`, off-white `#efefef`, superficie `#f4f4f0`. El negro
  solo como tinta/texto. (Excepción: para el logo en variante `white` usa fondo AZUL de marca.)
- Nota de render: `Button`/`Badge` en variantes `primary`/`accent` salen como **gradiente** de
  marca (no sólido) — es intencional.
- **CTA de marca (botones de llamada a la acción) → naranja `var(--nl-grad-warm)`** (`#fc624b → #ff8c42`),
  no `--nl-grad-accent` (que termina en magenta).
- **Texto sobre imagen/foto:** usá siempre un scrim (`.nl-overlay-dark` / `.nl-overlay-brand`),
  nunca un tinte plano y opaco. En superficies de marca oscuras usá `.nl-on-dark` para asegurar contraste.

## Dónde está la verdad
- Tokens y utilidades completas: lee la `styles.css` enlazada y sus imports (`fonts/fonts.css`,
  `_ds_bundle.css`).
- API de cada componente: `components/<grupo>/<Nombre>/<Nombre>.d.ts` (props) y `<Nombre>.prompt.md`
  (uso + ejemplo). Grupos: actions, forms, data-display, feedback, overlays, navigation, charts, brand.

## Ejemplo
```jsx
import { Card, Button, Badge } from '@nlace/ui-kit'

function PlanCard() {
  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h4 style={{ margin: 0 }}>Plan Pro</h4>
        <Badge variant="success">Activo</Badge>
      </div>
      <p style={{ color: 'var(--nl-500)', marginBottom: 20 }}>
        Hasta 50.000 conversaciones al mes con tu agente de IA.
      </p>
      <Button variant="primary">Gestionar plan</Button>
    </Card>
  )
}
```
