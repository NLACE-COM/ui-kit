import React from 'react'
import { Spinner } from '@nlace/ui-kit'

const row: React.CSSProperties = {
  display: 'flex',
  gap: 32,
  alignItems: 'center',
  padding: 40,
  background: '#f4f4f0',
  borderRadius: 16,
}

export function Tamaños() {
  return (
    <div style={row}>
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  )
}

export function EnContexto() {
  return (
    <div style={{ padding: 24 }}>
      <div
        style={{
          display: 'flex',
          gap: 12,
          alignItems: 'center',
          padding: 20,
          background: '#ffffff',
          border: '1px solid #e8e8e8',
          borderRadius: 14,
          width: 320,
        }}
      >
        <Spinner size="md" />
        <span style={{ fontSize: '0.9rem' }}>Generando respuesta del modelo…</span>
      </div>
    </div>
  )
}
