---
category: Overlays
---
Diálogo centrado con scrim y blur, controlado por `open` + `onClose`.

```jsx
<Modal open={open} onClose={() => setOpen(false)} title="Confirmar"
  footer={<><Button variant="secondary">Cancelar</Button><Button>Guardar</Button></>}>
  ¿Seguro que quieres continuar?
</Modal>
```

- `size`: `sm` | `md` | `lg`. `description` bajo el título. `closeOnScrim` (default true). Cierra con Escape.
