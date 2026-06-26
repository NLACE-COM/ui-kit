---
category: Charts
---
Gráfico circular SVG con leyenda y porcentajes, paleta de marca.

```jsx
<PieChart data={[{ label: 'Pro', value: 60 }, { label: 'Free', value: 40 }]} />
```

- `data[]`: `{ label, value, color? }`. `donut` lo convierte en anillo (o usa `DonutChart`). `size`, `legend`.
