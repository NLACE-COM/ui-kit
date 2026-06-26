import React from 'react'
import { BarChart } from '@nlace/ui-kit'

const card: React.CSSProperties = {
  padding: 24,
  background: '#ffffff',
  maxWidth: 640,
}

export function MrrMensual() {
  return (
    <div style={card}>
      <BarChart
        labels={['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun']}
        series={[{ name: 'MRR (€)', values: [18400, 21200, 24800, 27600, 31500, 36200] }]}
      />
    </div>
  )
}

export function NuevosVsRecurrentes() {
  return (
    <div style={card}>
      <BarChart
        labels={['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun']}
        series={[
          { name: 'Clientes nuevos', values: [42, 58, 51, 67, 73, 89] },
          { name: 'Renovaciones', values: [120, 134, 151, 168, 182, 205] },
        ]}
      />
    </div>
  )
}

export function IngresosPorPlanApilado() {
  return (
    <div style={card}>
      <BarChart
        stacked
        showValues={false}
        labels={['Q1', 'Q2', 'Q3', 'Q4']}
        series={[
          { name: 'Enterprise', values: [42000, 51000, 58000, 67000] },
          { name: 'Pro', values: [28000, 31000, 35000, 39000] },
          { name: 'Starter', values: [9000, 11000, 12500, 14000] },
        ]}
      />
    </div>
  )
}
