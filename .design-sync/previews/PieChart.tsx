import React from 'react'
import { PieChart } from '@nlace/ui-kit'

const card: React.CSSProperties = {
  padding: 24,
  background: '#ffffff',
  maxWidth: 640,
}

export function DistribucionPlanes() {
  return (
    <div style={card}>
      <PieChart
        data={[
          { label: 'Enterprise', value: 38 },
          { label: 'Pro', value: 142 },
          { label: 'Starter', value: 286 },
          { label: 'Free', value: 514 },
        ]}
      />
    </div>
  )
}

export function CanalesAdquisicion() {
  return (
    <div style={card}>
      <PieChart
        data={[
          { label: 'Búsqueda orgánica', value: 4280 },
          { label: 'Referidos', value: 2150 },
          { label: 'Anuncios', value: 1620 },
          { label: 'Directo', value: 980 },
        ]}
      />
    </div>
  )
}
