import React from 'react'
import { Skeleton } from '@nlace/ui-kit'

export function LineasDeTexto() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 24, width: 360 }}>
      <Skeleton className="h-5 w-48 rounded" />
      <Skeleton className="h-4 w-full rounded" />
      <Skeleton className="h-4 w-full rounded" />
      <Skeleton className="h-4 w-32 rounded" />
    </div>
  )
}

export function TarjetaCargando() {
  return (
    <div
      style={{
        display: 'flex',
        gap: 16,
        alignItems: 'center',
        padding: 24,
        width: 360,
        background: '#ffffff',
        border: '1px solid #dbdcd7',
        borderRadius: 20,
      }}
    >
      <Skeleton className="h-16 w-16 rounded-lg" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        <Skeleton className="h-5 w-40 rounded" />
        <Skeleton className="h-4 w-full rounded" />
      </div>
    </div>
  )
}
