# NLACE Design System

Version: Canonica via `@nlace/ui-kit` (latest)
Estado: Activo
Fecha canonica: 2026-03-05
Fuente primaria: paquete `@nlace/ui-kit` (repo GitHub oficial del UI kit)
Instalacion: `npm install @nlace/ui-kit@latest`
Snapshot historico local: `references/nlace-ui-kit-tailwind-v1.5.0.html`
Fuente visual viva (Figma): `https://www.figma.com/design/hboE6NgrEkFXgC9B0M5B18/NLACE-Design-System?node-id=2-1677&m=dev`
Nodo canonico Figma: `2:1677` (`NLACE Design System`)
Scope: Web marketing, webapp/producto, admin tools, landing pages y componentes UI.

## 0) Sincronizacion canonica

Orden recomendado:
1. Verificar Figma nodo `2:1677`.
2. Actualizar a `@nlace/ui-kit@latest`.
3. Contrastar el paquete contra Figma.
4. Usar `references/nlace-ui-kit-tailwind-v1.5.0.html` solo como referencia historica.
5. Actualizar este documento (`nlace-design-system.md`).
6. Ajustar `SKILL.md` cuando cambien reglas operativas.

Criterio de conflicto:
- Si `@nlace/ui-kit`, Figma y referencia local divergen:
  - Prioridad 1: Figma (estado visual actual aprobado).
  - Prioridad 2: `@nlace/ui-kit` (implementacion distribuible).
  - Prioridad 3: referencia local.

## 1) Tailwind theme.extend canonico

```js
colors: {
  nl: {
    bg: '#efefef',
    text: '#141414',
    primary: '#3f58ea',
    'primary-dark': '#2f2f81',
    accent: '#ff6143',
    'accent-warm': '#ff8c42',
    success: '#6be8b0',
    'success-dark': '#22c55e',
    'success-text': '#166534',
    'success-bg': '#f0fdf4',
    white: '#ffffff',
    900: '#18181b',
    700: '#3f3f46',
    500: '#71717a',
    400: '#a1a1aa',
    'border-soft': '#e8e8e8',
    'border-ui': '#d4d4d8',
    danger: '#dc2626',
    cyan: '#a5f3fc',
    'blue-24': '#1a1a5e',
    'blue-28': '#2d1f6e',
  }
}
```

```js
fontFamily: {
  display: ['"Space Grotesk"', 'sans-serif'],
  body: ['Inter', 'sans-serif'],
  mono: ['"SF Mono"', '"Fira Code"', 'monospace'],
}

borderRadius: {
  input: '10px',
  card: '20px',
  pill: '9999px',
}

boxShadow: {
  card: '0 2px 12px rgba(20,20,20,0.08)',
  hover: '0 10px 28px rgba(20,20,20,0.14)',
}

transitionTimingFunction: {
  nl: 'cubic-bezier(0.22, 1, 0.36, 1)',
}

transitionDuration: {
  ui: '220ms',
  reveal: '480ms',
}

letterSpacing: {
  'nl-tight': '-0.03em',
  'nl-normal': '-0.018em',
  'nl-ui': '0.08em',
}
```

## 2) Gradientes canonicos

```js
backgroundImage: {
  'nl-hero': 'linear-gradient(135deg, #2f2f81 0%, #1a1a5e 60%, #2d1f6e 100%)',
  'nl-primary': 'linear-gradient(135deg, #3f58ea 0%, #2f2f81 100%)',
  'nl-accent': 'linear-gradient(135deg, #ff6143 0%, #ff8c42 100%)',
  'nl-mint': 'linear-gradient(135deg, #6be8b0 0%, #34d399 100%)',
  'nl-dark': 'linear-gradient(180deg, #18181b 0%, #2f2f81 100%)',
  'nl-surface': 'linear-gradient(135deg, #ffffff 0%, #f4f4f5 100%)',
  'nl-brand': 'linear-gradient(90deg, #3f58ea 0%, #ff6143 100%)',
}
```

Regla:
- Maximo 1 gradiente dominante por seccion.

## 3) Motion system canonico

```js
animation: {
  'fade-up': 'fadeUp 0.48s cubic-bezier(0.22,1,0.36,1) both',
  'pulse-ring': 'pulseRing 1.6s ease infinite',
  'shimmer': 'shimmer 1.4s ease-in-out infinite',
  'spin-nl': 'spin 0.7s linear infinite',
}
```

Patrones:
- UI: `220ms`
- Reveal: `480ms`
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)`
- Required: `prefers-reduced-motion: reduce`

## 4) Catalogo canonico de componentes (25 secciones)

1. Logos
2. Colores
3. Tipografia
4. Botones
5. Inputs
6. Cards
7. Badges
8. Alerts
9. Navegacion
10. Hero
11. Features
12. Tablas
13. Tabs
14. Avatars
15. Modales
16. Loaders
17. Controles
18. Gradientes
19. Motion
20. Espaciado
21. Radios
22. Sombras
23. Focus
24. Code blocks
25. tailwind.config

## 5) Assets graficos oficiales

- `assets/logos/nlace-black.svg`
- `assets/logos/nlace-white.svg`
- `assets/logos/logo-nlace-black.png`
- `assets/logos/avatar-nlace-blue.jpg`

Reglas:
- No deformar, recolorear, rotar o aplicar efectos.
- Fondo claro -> logo negro.
- Fondo oscuro/gradiente -> logo blanco.
- Avatar para favicon/perfil/icono cuadrado.

## 6) Reglas de implementacion Tailwind

- Usar utilidades tokenizadas del namespace `nl` (`bg-nl-*`, `text-nl-*`, `border-nl-*`).
- Evitar clases arbitrarias con hex (`bg-[#xxxxxx]`) cuando exista token en `colors.nl`.
- Marketing: CTA principal coral (`nl-accent`).
- Producto/admin: CTA principal violeta (`nl-primary`).
- Reusar patrones del catalogo antes de crear variantes nuevas.

## 7) Accesibilidad minima obligatoria

- Contraste AA en texto/controles.
- Focus visible en todos los interactivos.
- Touch target recomendado: `44px` minimo.
- No depender solo del color para estado.
- Motion degradable con `prefers-reduced-motion`.

## 8) Checklist de QA de marca

- Tipografia correcta (`display`/`body`) segun contexto.
- Tokens aplicados sin hex sueltos innecesarios.
- CTA correcto segun contexto (marketing vs producto/admin).
- Estados hover/active/disabled definidos.
- Responsive correcto en mobile/tablet/desktop.
- Componentes dentro del catalogo canonico (o desviacion justificada).

## 9) Gobierno del sistema

- Nuevos colores solo por token + rol documentado.
- Nuevos componentes con proposito, variantes, estados y responsive.
- No introducir fuentes nuevas sin aprobacion de marca.
- Actualizar Figma y referencia local en el mismo ciclo de cambio.
