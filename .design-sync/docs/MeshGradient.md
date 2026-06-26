---
category: Brand
---
Fondo animado WebGL con la paleta de marca NLACE (4 focos en movimiento, realce cálido, grano). Capa de fondo detrás del contenido.

```jsx
<div style={{ position: 'relative' }}>
  <MeshGradient style={{ position: 'absolute', inset: 0, zIndex: 0 }} />
  <div style={{ position: 'relative', zIndex: 1 }}>…contenido…</div>
</div>
```

- `speed`, `intensity`, `grain` (parámetros del shader, live). `colors` = `[primary, accent, pink, magenta, deep]`. `highlight` = realce cálido.
