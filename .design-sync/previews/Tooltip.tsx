import React from 'react'
import { Tooltip, Button } from '@nlace/ui-kit'

const row: React.CSSProperties = {
  display: 'flex',
  gap: 16,
  alignItems: 'center',
  padding: 48,
}

export function Triggers() {
  return (
    <div style={row}>
      <Tooltip label="Copiar enlace" placement="top">
        <Button variant="secondary">Compartir</Button>
      </Tooltip>
      <Tooltip label="Reentrenar con datos nuevos" placement="top">
        <Button variant="primary">Reentrenar</Button>
      </Tooltip>
    </div>
  )
}
