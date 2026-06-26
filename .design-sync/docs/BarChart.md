---
category: Charts
---
Gráfico de barras SVG con la paleta de marca. Agrupado o apilado.

```jsx
<BarChart
  labels={['Ene', 'Feb', 'Mar']}
  series={[{ name: 'MRR', values: [12, 18, 22] }]}
/>
```

- `series[]`: `{ name, values: number[], color? }`. `stacked`, `showValues`, `legend`, `height`.
