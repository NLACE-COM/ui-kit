---
category: Data Display
---
Tabla de datos liviana con el skin NLACE: encabezados en mayúsculas, filas con hover.

```jsx
<Table
  columns={[
    { key: 'name', header: 'Empresa' },
    { key: 'mrr',  header: 'MRR', align: 'right' },
    { key: 'state', header: 'Estado', render: (r) => <Badge>{r.state}</Badge> },
  ]}
  rows={rows}
  rowKey="id"
/>
```

- `columns[].render(row)` permite celdas custom. `dense` reduce el padding.
