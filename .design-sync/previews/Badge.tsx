import React from 'react'
import { Badge } from '@nlace/ui-kit'

const row: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 10,
  alignItems: 'center',
  padding: 24,
}

export function Suaves() {
  return (
    <div style={row}>
      <Badge variant="primary">Activo</Badge>
      <Badge variant="accent">Nuevo</Badge>
      <Badge variant="success">Completado</Badge>
      <Badge variant="danger">Pendiente</Badge>
      <Badge variant="neutral">Archivado</Badge>
    </div>
  )
}

export function Solidas() {
  return (
    <div style={row}>
      <Badge variant="solidPrimary">Pro</Badge>
      <Badge variant="solidAccent">Beta</Badge>
      <Badge variant="solidDark">Enterprise</Badge>
    </div>
  )
}
