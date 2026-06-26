import React from 'react'
import { NlaceAvatar } from '@nlace/ui-kit'

export function Tamaños() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 28,
        padding: 40,
        background: '#ffffff',
      }}
    >
      <NlaceAvatar size={40} />
      <NlaceAvatar size={56} />
      <NlaceAvatar size={64} />
      <NlaceAvatar size={96} />
    </div>
  )
}

export function EnContexto() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: 32,
        background: '#f4f4f0',
        margin: 24,
        borderRadius: 16,
      }}
    >
      <NlaceAvatar size={48} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ fontWeight: 700, fontSize: 15, color: '#141414' }}>NLACE</span>
        <span style={{ fontSize: 13, color: '#6b6b6b' }}>Asistente de IA</span>
      </div>
    </div>
  )
}
