import React from 'react'
import { Switch } from '@nlace/ui-kit'

const stack: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 18,
  padding: 24,
}

export function ConLabel() {
  return (
    <div style={stack}>
      <Switch label="Notificaciones por email" description="Recibe un resumen diario de tu actividad" defaultChecked />
      <Switch label="Modo compacto" description="Reduce el espaciado de las tablas" />
    </div>
  )
}

export function Estados() {
  return (
    <div style={{ ...stack, flexDirection: 'row', gap: 28, alignItems: 'center' }}>
      <Switch label="Activado" defaultChecked />
      <Switch label="Desactivado" />
      <Switch label="Bloqueado" defaultChecked disabled />
    </div>
  )
}

export function Tamaños() {
  return (
    <div style={{ ...stack, flexDirection: 'row', gap: 28, alignItems: 'center' }}>
      <Switch size="sm" label="Pequeño" defaultChecked />
      <Switch size="md" label="Mediano" defaultChecked />
    </div>
  )
}
