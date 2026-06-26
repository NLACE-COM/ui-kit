import React from 'react'
import { Dropdown, Button } from '@nlace/ui-kit'

const wrap: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'flex-start',
  padding: 48,
}

export function Acciones() {
  return (
    <div style={wrap}>
      <Dropdown
        trigger={<Button variant="secondary">Acciones ▾</Button>}
        items={[
          { id: 'edit', label: 'Editar' },
          { id: 'dup', label: 'Duplicar' },
          { divider: true },
          { id: 'del', label: 'Eliminar', danger: true },
        ]}
      />
    </div>
  )
}
