import React from 'react'
import { Tabs } from '@nlace/ui-kit'

const wrap: React.CSSProperties = {
  padding: 24,
}

const panel: React.CSSProperties = {
  padding: '16px 4px',
  fontSize: 14,
  color: '#3a3b3d',
  lineHeight: 1.6,
}

const items = [
  { id: 'resumen', label: 'Resumen' },
  { id: 'actividad', label: 'Actividad', badge: 12 },
  { id: 'facturacion', label: 'Facturación' },
]

const paneles: Record<string, string> = {
  resumen: 'Vista general del proyecto: 3 modelos en producción y 2 en evaluación.',
  actividad: '12 eventos nuevos esta semana, incluyendo 4 reentrenamientos automáticos.',
  facturacion: 'Plan Enterprise — próxima factura el 1 de julio por $4.200.',
}

export function Underline() {
  return (
    <div style={wrap}>
      <Tabs items={items} variant="underline" defaultValue="resumen">
        {(active: string) => <div style={panel}>{paneles[active]}</div>}
      </Tabs>
    </div>
  )
}

export function Pill() {
  return (
    <div style={wrap}>
      <Tabs items={items} variant="pill" defaultValue="actividad">
        {(active: string) => <div style={panel}>{paneles[active]}</div>}
      </Tabs>
    </div>
  )
}
