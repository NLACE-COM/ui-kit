import React from 'react'
import { Button } from '@nlace/ui-kit'

const row: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 12,
  alignItems: 'center',
  padding: 24,
}

export function Variantes() {
  return (
    <div style={row}>
      <Button variant="primary">Empezar</Button>
      <Button variant="accent">Probar gratis</Button>
      <Button variant="secondary">Cancelar</Button>
      <Button variant="success">Guardar</Button>
      <Button variant="danger">Eliminar</Button>
    </div>
  )
}

export function Tamaños() {
  return (
    <div style={row}>
      <Button size="sm">Pequeño</Button>
      <Button size="md">Mediano</Button>
      <Button size="lg">Grande</Button>
    </div>
  )
}

export function Estados() {
  return (
    <div style={row}>
      <Button>Activo</Button>
      <Button disabled>Deshabilitado</Button>
    </div>
  )
}

export function SobreFondoOscuro() {
  return (
    <div style={{ ...row, background: '#0f1011', borderRadius: 16 }}>
      <Button variant="outlineLight">Ver demo</Button>
      <Button variant="accent">Agendar</Button>
    </div>
  )
}
