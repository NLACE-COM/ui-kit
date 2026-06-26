import React from 'react'
import { MeshGradient } from '@nlace/ui-kit'

export function Fondo() {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: 300,
        borderRadius: 20,
        overflow: 'hidden',
      }}
    >
      <MeshGradient style={{ position: 'absolute', inset: 0 }} />
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 40,
        }}
      >
        <h2
          style={{
            margin: 0,
            color: '#ffffff',
            fontSize: 38,
            lineHeight: 1.05,
            fontWeight: 800,
            letterSpacing: '-0.02em',
            maxWidth: 520,
            textShadow: '0 1px 18px rgba(0,0,0,0.22)',
          }}
        >
          IA que trabaja por ti
        </h2>
        <p
          style={{
            margin: '14px 0 0',
            color: '#ffffff',
            fontSize: 16,
            opacity: 0.95,
            maxWidth: 440,
            textShadow: '0 1px 12px rgba(0,0,0,0.22)',
          }}
        >
          Automatiza tareas y conversaciones con la plataforma de NLACE.
        </p>
      </div>
    </div>
  )
}
