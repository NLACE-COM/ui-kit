import React from 'react'
import { DonutChart } from '@nlace/ui-kit'

const card: React.CSSProperties = {
  padding: 24,
  background: '#ffffff',
  maxWidth: 640,
}

export function UsoDeCuota() {
  return (
    <div style={card}>
      <DonutChart
        centerValue="72%"
        centerLabel="Uso de cuota"
        data={[
          { label: 'Consumido', value: 72 },
          { label: 'Disponible', value: 28 },
        ]}
      />
    </div>
  )
}

export function DistribucionTokensModelo() {
  return (
    <div style={card}>
      <DonutChart
        centerValue="79M"
        centerLabel="Tokens / mes"
        data={[
          { label: 'GPT-4o', value: 41 },
          { label: 'Claude Sonnet', value: 28 },
          { label: 'Llama 3', value: 19 },
          { label: 'Embeddings', value: 11 },
        ]}
      />
    </div>
  )
}
