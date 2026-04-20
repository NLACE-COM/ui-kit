---
name: nlace-design
description: Use this skill to generate well-branded interfaces and assets for NLACE, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Canonical palette (user-confirmed, supersedes the npm kit)

- Black `#0F1011` · White `#FFFFFF`
- Primary blue `#5869F7` · Accent red `#FC624B`
- Pink `#F76DEE` · Magenta `#B717AF`
- Success `#42CF8A` · Surface `#DBDCD7`

## Type

- Display: **Space Grotesk** (ship the variable TTF in `fonts/`)
- Body: **Inter** (variable TTF, italic variant included)
- Mono: JetBrains Mono (Google Fonts fallback for SF Mono)

## Key files

- `README.md` — full brand guide (content / visual / icon systems)
- `colors_and_type.css` — authoritative CSS variables + @font-face
- `preview/` — registered design-system cards
- `ui_kits/ai-studio/` — interactive reference UI for NLACE AI Studio
- `src/components/*.jsx` — original kit components (Button, Badge, Card, Input, Alert, Loaders, NlaceLogo)
- `assets/nlace-black.svg`, `assets/nlace-white.svg` — wordmark
