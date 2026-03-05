# @nlace/ui-kit

Paquete interno de NLACE para el desarrollo de productos propios. Contiene los tokens de diseño, el preset de Tailwind CSS y los componentes React del sistema de diseño oficial de NLACE.

Este kit es la base visual de todos los productos que construimos: desde herramientas internas hasta productos como NLACE AI Studio. Garantiza consistencia entre proyectos y elimina decisiones de diseño repetidas.

**npm:** https://www.npmjs.com/package/@nlace/ui-kit
**Diseño:** https://www.figma.com/design/hboE6NgrEkFXgC9B0M5B18/NLACE-Design-System
**Web:** https://nlace.com

---

## Instalación

```bash
npm install @nlace/ui-kit
```

## Setup

### 1. Tailwind config

En `tailwind.config.js` o `tailwind.config.ts`:

```js
const nlacePreset = require('@nlace/ui-kit/preset')

module.exports = {
  presets: [nlacePreset],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nlace/ui-kit/dist/**/*.{js,mjs}',
  ],
}
```

### 2. CSS tokens

En el entry point del proyecto (`main.jsx`, `_app.tsx`, `layout.tsx`):

```js
import '@nlace/ui-kit/tokens'
```

Carga las variables `--nl-*` y las fuentes (Inter + Plus Jakarta Sans).

---

## Componentes

### Button

```jsx
import { Button } from '@nlace/ui-kit'

<Button variant="accent" size="lg">Empezar</Button>
<Button variant="primary">Guardar</Button>
<Button variant="secondary" size="sm">Cancelar</Button>
<Button variant="danger" disabled>Eliminar</Button>
```

Variantes: `accent` · `primary` · `secondary` · `success` · `outlineLight` · `danger`
Tamaños: `sm` · `md` · `lg`

---

### Card

```jsx
import { Card } from '@nlace/ui-kit'

<Card>Contenido normal</Card>
<Card accent>Card con fondo azul</Card>
<Card hover={false} padding="p-8">Sin efecto hover</Card>
```

---

### Badge

```jsx
import { Badge } from '@nlace/ui-kit'

<Badge variant="primary">Nuevo</Badge>
<Badge variant="accent">Beta</Badge>
<Badge variant="success">Activo</Badge>
<Badge variant="solidDark">v1.5.0</Badge>
```

Variantes: `primary` · `accent` · `success` · `danger` · `neutral` · `solidPrimary` · `solidAccent` · `solidDark`

---

### Input

```jsx
import { Input } from '@nlace/ui-kit'

<Input label="Email" placeholder="tu@ejemplo.com" type="email" />
<Input label="Nombre" hint="Como aparece en tu perfil" />
<Input label="RUT" error="Formato inválido" />
```

---

### Alert

```jsx
import { Alert } from '@nlace/ui-kit'

<Alert variant="info" title="Aviso">El proceso tardará unos minutos.</Alert>
<Alert variant="success" title="Listo">Cambios guardados correctamente.</Alert>
<Alert variant="warning">Revisa los datos antes de continuar.</Alert>
<Alert variant="error" title="Error">No se pudo conectar al servidor.</Alert>
```

Variantes: `info` · `success` · `warning` · `error`

---

### NlaceLogo / NlaceAvatar

```jsx
import { NlaceLogo, NlaceAvatar } from '@nlace/ui-kit'

<NlaceLogo variant="black" width={160} />
<NlaceLogo variant="white" width={120} />
<NlaceAvatar size={40} />
```

---

### Spinner / Skeleton

```jsx
import { Spinner, Skeleton } from '@nlace/ui-kit'

<Spinner size="md" />
<Skeleton className="h-5 w-48" />
<Skeleton className="h-32 w-full rounded-card" />
```

---

## Tokens CSS

Disponibles globalmente tras importar `@nlace/ui-kit/tokens`:

```css
color: var(--nl-primary);
background: var(--nl-grad-hero);
border-radius: var(--nl-radius-card);
transition-duration: var(--nl-dur-ui);
```

---

## Clases Tailwind

```
bg-nl-bg · bg-nl-primary · bg-nl-accent · bg-nl-900
text-nl-500 · text-nl-400 · text-nl-danger
border-nl-border-soft · border-nl-border-ui
rounded-card · rounded-input · rounded-pill
shadow-card · shadow-hover
duration-ui · duration-reveal · ease-nl
font-display · font-body · font-mono
tracking-nl-tight · tracking-nl-normal · tracking-nl-ui
bg-nl-hero · bg-nl-brand · bg-nl-accent (gradientes)
animate-fade-up · animate-shimmer · animate-pulse-ring
```

---

## Publicar nueva versión

```bash
# 1. Actualizar version en package.json
# 2. Publicar en npm
npm publish

# 3. Tag en GitHub
git tag v1.x.x && git push origin v1.x.x
```

---

`v1.5.0` · Marzo 2026 · NLACE
