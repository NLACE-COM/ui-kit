import React from 'react'
import { Modal, Button } from '@nlace/ui-kit'

export function Dialogo() {
  return (
    <div style={{ position: 'relative', minHeight: 480 }}>
      <Modal
        open={true}
        title="Publicar modelo en producción"
        description="Esta acción reemplazará la versión activa."
        footer={
          <>
            <Button variant="secondary">Cancelar</Button>
            <Button variant="primary">Publicar</Button>
          </>
        }
      >
        El modelo <strong>nlace-intent-v4</strong> pasará a recibir el 100% del
        tráfico de producción. Podrás revertir al despliegue anterior en
        cualquier momento desde el historial de versiones.
      </Modal>
    </div>
  )
}
