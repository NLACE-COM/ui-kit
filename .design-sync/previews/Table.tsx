import React from 'react'
import { Table, Badge } from '@nlace/ui-kit'

const rows = [
  { id: 1, empresa: 'Acme S.A.', plan: 'Enterprise', mrr: '$4.200', estado: 'Activo' },
  { id: 2, empresa: 'Globex', plan: 'Pro', mrr: '$890', estado: 'Activo' },
  { id: 3, empresa: 'Initech', plan: 'Pro', mrr: '$890', estado: 'Trial' },
  { id: 4, empresa: 'Umbrella', plan: 'Starter', mrr: '$120', estado: 'Pausado' },
]

const estadoVariant = { Activo: 'success', Trial: 'primary', Pausado: 'neutral' } as const

export function Clientes() {
  return (
    <div style={{ padding: 24 }}>
      <Table
        rowKey="id"
        columns={[
          { key: 'empresa', header: 'Empresa' },
          { key: 'plan', header: 'Plan' },
          { key: 'mrr', header: 'MRR', align: 'right' },
          {
            key: 'estado',
            header: 'Estado',
            render: (r: any) => (
              <Badge variant={estadoVariant[r.estado as keyof typeof estadoVariant]}>{r.estado}</Badge>
            ),
          },
        ]}
        rows={rows}
      />
    </div>
  )
}

export function Compacta() {
  return (
    <div style={{ padding: 24 }}>
      <Table
        dense
        rowKey="id"
        columns={[
          { key: 'empresa', header: 'Empresa' },
          { key: 'plan', header: 'Plan' },
          { key: 'mrr', header: 'MRR', align: 'right' },
        ]}
        rows={rows}
      />
    </div>
  )
}
