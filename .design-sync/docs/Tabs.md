---
category: Navigation
---
Pestañas controladas o no controladas, en variante `underline` o `pill`.

```jsx
<Tabs items={[{ id: 'a', label: 'Resumen' }, { id: 'b', label: 'Detalle', badge: 3 }]} variant="underline">
  {(active) => <div>{active}</div>}
</Tabs>
```

- `children` puede ser una función `(activeId) => ReactNode`. `items[].badge` muestra un contador.
