import React from 'react'
import { LineChart } from '@nlace/ui-kit'

const card: React.CSSProperties = {
  padding: 24,
  background: '#ffffff',
  maxWidth: 640,
}

export function SesionesSemana() {
  return (
    <div style={card}>
      <LineChart
        showDots
        labels={['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']}
        series={[{ name: 'Sesiones diarias', values: [3120, 3480, 3650, 3920, 4180, 2240, 1980] }]}
      />
    </div>
  )
}

export function ConversacionesVsResueltas() {
  return (
    <div style={card}>
      <LineChart
        showDots
        labels={['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6']}
        series={[
          { name: 'Conversaciones del agente IA', values: [1240, 1560, 1890, 2310, 2680, 3120] },
          { name: 'Resueltas sin humano', values: [840, 1120, 1430, 1820, 2180, 2640] },
        ]}
      />
    </div>
  )
}
