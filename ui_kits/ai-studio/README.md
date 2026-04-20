# NLACE AI Studio — UI kit

Interactive prototype of the flagship NLACE product surface, built on the NLACE Design System.

## Screens

- **Home** — hero banner (`nl-hero` gradient), stat grid, recent projects list.
- **Projects** — filterable list with tabs (Todos / Activos / Entrenando / Borradores) and live search from the topbar.
- **Chat (Nuevo proyecto)** — text composer with suggestion grid; simulated response flow.
- **Placeholder stubs** — Modelos, Assets, Datasets, Equipo, Facturación, Configuración. Reserved routes.

## Files

- `index.html` — entry point, routing + shell.
- `styles.css` — scoped to the kit; all tokens aligned with `@nlace/ui-kit`.
- `components.jsx` — atoms + primitives: `Button`, `Badge`, `Card`, `Input`, `Icon`, `Sidebar`, `Topbar`, `StatCard`, `ProjectRow`, `ChatMessage`, `Composer`, `Banner`.
- `screens.jsx` — composed screens: `HomeScreen`, `ProjectsScreen`, `ChatScreen`, plus the sample project data.

## Icons

Uses **Lucide** via CDN as a flagged substitute for a canonical NLACE icon set (the source repo does not ship one). Swap the CDN script for the real set when NLACE adopts one.

## What this is not

A production implementation. Component internals are cosmetic recreations — enough to look pixel-aligned with the NLACE visual system, not enough to ship. Click-throughs fake async work with `setTimeout`.
