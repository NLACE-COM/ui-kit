import React from 'react'
import { Input } from '@nlace/ui-kit'

const stack: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 18,
  padding: 24,
  width: 360,
}

export function ConHint() {
  return (
    <div style={stack}>
      <Input
        label="Nombre del agente"
        placeholder="Ej. Asistente de Ventas"
        hint="Así lo verán los miembros de tu equipo."
      />
    </div>
  )
}

export function Estados() {
  return (
    <div style={stack}>
      <Input
        label="Correo de trabajo"
        defaultValue="contacto@empresa"
        error="Introduce un correo electrónico válido."
      />
      <Input
        label="Clave de API"
        defaultValue="sk-nlace-7f3a9c21"
        success
        hint="Clave verificada correctamente."
      />
      <Input
        label="Espacio de trabajo"
        defaultValue="NLACE Producción"
        disabled
        hint="No puedes cambiar el espacio durante un despliegue."
      />
    </div>
  )
}
