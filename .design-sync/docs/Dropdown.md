---
category: Overlays
---
Menú desplegable click-to-open con ítems, divisores, iconos y acción destructiva.

```jsx
<Dropdown
  trigger={<Button variant="secondary">Acciones ▾</Button>}
  items={[
    { id: 'edit', label: 'Editar' },
    { divider: true },
    { id: 'del', label: 'Eliminar', danger: true },
  ]}
  onSelect={(id) => {}}
/>
```

- `align`: `left` | `right`. Cierra con click afuera o Escape.
