import React from 'react'
import { Card, Button, Badge } from '@nlace/ui-kit'

const grid: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 20,
  padding: 24,
  maxWidth: 760,
}

const titulo: React.CSSProperties = {
  fontSize: '1.05rem',
  fontWeight: 600,
  marginBottom: 8,
}

const parrafo: React.CSSProperties = {
  fontSize: '0.9rem',
  lineHeight: 1.5,
  opacity: 0.85,
  marginBottom: 16,
}

export function Default() {
  return (
    <div style={grid}>
      <Card padding="p-6">
        <div style={{ width: 300 }}>
          <h3 style={titulo}>Resumen mensual</h3>
          <p style={parrafo}>
            Tus agentes procesaron 3.420 conversaciones este mes, un 18% más que en mayo.
          </p>
          <Badge variant="success">+18% vs. mes anterior</Badge>
        </div>
      </Card>
    </div>
  )
}

export function Acento() {
  return (
    <div style={grid}>
      <Card accent padding="p-6">
        <div style={{ width: 300 }}>
          <h3 style={titulo}>Plan Enterprise</h3>
          <p style={parrafo}>
            Modelos dedicados, soporte prioritario y créditos de inferencia ilimitados para tu equipo.
          </p>
        </div>
      </Card>
    </div>
  )
}

export function Composicion() {
  return (
    <div style={grid}>
      <Card padding="p-6">
        <div style={{ width: 320 }}>
          <h3 style={titulo}>Activa tu primer agente</h3>
          <p style={parrafo}>
            Conecta tus fuentes de datos y despliega un asistente de IA en menos de cinco minutos.
          </p>
          <Button variant="primary">Crear agente</Button>
        </div>
      </Card>
    </div>
  )
}
