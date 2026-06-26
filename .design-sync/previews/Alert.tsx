import React from 'react'
import { Alert } from '@nlace/ui-kit'

const stack: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 14,
  padding: 24,
  maxWidth: 560,
}

export function Variantes() {
  return (
    <div style={stack}>
      <Alert variant="info" title="Procesando tu documento">
        Nuestro modelo está analizando el contrato. Te avisaremos cuando termine.
      </Alert>
      <Alert variant="success" title="Pago procesado">
        Tu plan Pro se renovó correctamente. Recibirás la factura por correo.
      </Alert>
      <Alert variant="warning" title="Tu plan expira en 3 días">
        Renueva ahora para no perder el acceso a los agentes personalizados.
      </Alert>
      <Alert variant="error" title="No pudimos conectar con la API">
        Verifica tu clave de acceso en Ajustes e inténtalo de nuevo.
      </Alert>
    </div>
  )
}

export function SoloTexto() {
  return (
    <div style={stack}>
      <Alert variant="info">
        Has consumido el 80% de tus créditos de inferencia este mes.
      </Alert>
      <Alert variant="success">
        Se entrenó el asistente con tus 1.240 documentos sin errores.
      </Alert>
    </div>
  )
}
