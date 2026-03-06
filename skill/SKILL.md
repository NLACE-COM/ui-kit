---
name: disenador-nlace
description: >
  Diseñador oficial de NLACE. Usa este skill en cualquier tarea visual para NLACE
  o marcas del ecosistema (sitios, landing pages, productos, dashboards,
  componentes React/HTML/CSS, emails, slides o piezas UI). Aplica el sistema de
  diseño NLACE con fidelidad a Figma, tokens de marca, tipografía, motion y
  reglas de accesibilidad. Si la tarea es frontend o diseño para NLACE, este
  skill se ejecuta primero.
---

# Disenador NLACE · v2.1.0

## Objetivo

Entregar interfaces y piezas visuales con identidad NLACE consistente, evitando
estilos genéricos y manteniendo alta fidelidad contra diseño base.

## Fuente de verdad

- Figma canónico: https://www.figma.com/design/hboE6NgrEkFXgC9B0M5B18/NLACE-Design-System?node-id=2-1677
- `fileKey`: `hboE6NgrEkFXgC9B0M5B18`
- `nodeId` raíz: `2:1677`

Regla de precedencia: `Figma > SKILL.md > defaults del modelo`.

## Cuándo usar este skill

Activa este skill cuando el usuario pida:

- Diseñar o implementar UI para NLACE (web, app, admin, dashboard)
- Mejorar look & feel de un frontend NLACE existente
- Aplicar branding, tokens, tipografía o sistema visual NLACE
- Construir piezas de marketing digital con identidad NLACE

No lo uses si el usuario pide explícitamente otro sistema de diseño sin relación
con NLACE.

## Flujo obligatorio

1. Clasificar tarea: `marketing`, `webapp` o `admin`.
2. Si hay requerimiento de fidelidad alta o URL/nodo Figma:
   - llamar `Figma:get_variable_defs` con `fileKey` + nodo raíz.
   - llamar `Figma:get_design_context` para nodos específicos.
3. Mapear la UI a tokens NLACE antes de crear estilos nuevos.
4. Implementar responsive (`mobile`, `tablet`, `desktop`).
5. Validar accesibilidad mínima:
   - contraste AA
   - foco visible
   - target táctil >= 44px
6. Entregar con checklist breve de QA visual.

## Reglas de diseño no negociables

- Tipografía:
  - display: `Telegraf` (fallback: `Plus Jakarta Sans`)
  - body/ui: `Inter`
- Evitar estética genérica (layouts planos sin intención visual).
- Mantener jerarquía visual clara con espaciado consistente.
- Motion sutil y útil; respetar `prefers-reduced-motion`.
- En frontend existente, respetar patrones ya establecidos del proyecto.

## Tokens base NLACE (usar primero)

```css
:root {
  --nl-bg: #efefef;
  --nl-text: #141414;
  --nl-primary: #3f58ea;
  --nl-primary-dark: #2f2f81;
  --nl-accent: #ff6143;
  --nl-success: #6be8b0;

  --nl-border-soft: #e8e8e8;
  --nl-border-ui: #d4d4d8;
  --nl-danger: #dc2626;

  --nl-radius-input: 10px;
  --nl-radius-card: 20px;
  --nl-radius-pill: 9999px;

  --nl-shadow-card: 0 2px 12px rgba(20, 20, 20, 0.08);
  --nl-shadow-hover: 0 10px 28px rgba(20, 20, 20, 0.14);

  --nl-font-display: "Telegraf", "Plus Jakarta Sans", sans-serif;
  --nl-font-body: "Inter", sans-serif;

  --nl-grad-hero: linear-gradient(135deg, #2f2f81 0%, #1a1a5e 60%, #2d1f6e 100%);
  --nl-grad-primary: linear-gradient(135deg, #3f58ea 0%, #2f2f81 100%);
  --nl-grad-accent: linear-gradient(135deg, #ff6143 0%, #ff8c42 100%);
}
```

## Tailwind v4 + Next.js 15+ (cuando aplique)

Configurar en `app/globals.css`:

```css
@import "tailwindcss";
@import "@nlace/ui-kit/tailwind-v4";

@source "../node_modules/@nlace/ui-kit/dist";
```

Reglas:
- El `@import "tailwindcss"` DEBE ir primero.
- El `@source` es obligatorio para que Tailwind v4 escanee las clases de los componentes del kit.
- Definir tokens adicionales con `@theme` en CSS (no `tailwind.config.js`).
- Priorizar clases basadas en tokens NLACE.
- No introducir paletas paralelas si ya existe token equivalente.

Clases disponibles del kit:
- Colores: `bg-nl-primary`, `text-nl-accent`, `border-nl-border-soft`
- Radios: `rounded-input`, `rounded-card`, `rounded-pill`
- Sombras: `shadow-card`, `shadow-hover`
- Gradientes: `bg-nl-hero`, `bg-nl-brand`, `bg-nl-accent`
- Animaciones: `animate-fade-up`, `animate-shimmer`, `animate-pulse-ring`
- Tipografía: `font-display`, `font-body`, `font-mono`

## Componentes y patrones

- Botones principales: `--nl-primary` o `--nl-accent`, radio pill cuando sea CTA.
- Inputs: borde `--nl-border-ui`, foco visible con tinte `--nl-primary`.
- Cards: fondo blanco, borde suave, sombra `--nl-shadow-card`.
- Secciones hero: usar gradientes NLACE y superposiciones con contraste legible.

## QA de salida (siempre)

Antes de cerrar una tarea visual, verificar:

- Coherencia de tokens (sin colores hardcodeados innecesarios)
- Tipografía NLACE aplicada correctamente
- Responsive correcto en 3 breakpoints
- Contraste AA y foco visible
- Animaciones útiles y no invasivas

## Formato de entrega recomendado

- Resumen corto de cambios
- Archivos editados
- Decisiones visuales clave (2-4 bullets)
- Riesgos/pendientes (si existen)
