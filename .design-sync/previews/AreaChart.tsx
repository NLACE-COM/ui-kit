import React from 'react'
import { AreaChart } from '@nlace/ui-kit'

const card: React.CSSProperties = {
  padding: 24,
  background: '#ffffff',
  maxWidth: 640,
}

export function IngresosTrimestrales() {
  return (
    <div style={card}>
      <AreaChart
        showDots
        labels={['Q1', 'Q2', 'Q3', 'Q4']}
        series={[{ name: 'Ingresos (€)', values: [142000, 178000, 214000, 268000] }]}
      />
    </div>
  )
}

export function TokensProcesados() {
  return (
    <div style={card}>
      <AreaChart
        showDots
        labels={['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun']}
        series={[{ name: 'Tokens procesados (M)', values: [12.4, 18.9, 27.3, 41.2, 58.6, 79.1] }]}
      />
    </div>
  )
}
