import React from 'react'
import { NlaceLogo } from '@nlace/ui-kit'

export function SobreClaro() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        padding: 40,
        background: '#ffffff',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 32,
          background: '#ffffff',
          border: '1px solid #e6e6e6',
          borderRadius: 16,
        }}
      >
        <NlaceLogo variant="black" width={200} />
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 32,
          background: '#efefef',
          borderRadius: 16,
        }}
      >
        <NlaceLogo variant="black" width={160} />
      </div>
    </div>
  )
}

export function SobreAzulMarca() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 56,
        background: '#5869f7',
        borderRadius: 16,
        margin: 24,
      }}
    >
      <NlaceLogo variant="white" width={200} />
    </div>
  )
}
