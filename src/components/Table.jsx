import React from 'react'

/**
 * Table — lightweight data table with the NLACE skin.
 *
 * <Table
 *   columns={[
 *     {key:'name',  header:'Empresa'},
 *     {key:'plan',  header:'Plan'},
 *     {key:'mrr',   header:'MRR', align:'right'},
 *     {key:'state', header:'Estado', render:(r)=><Badge>{r.state}</Badge>},
 *   ]}
 *   rows={[...]}
 *   rowKey="id"
 * />
 */
export function Table({
  columns = [],
  rows = [],
  rowKey = 'id',
  dense = false,
  className = '',
  ...props
}) {
  const pad = dense ? 'px-4 py-2.5' : 'px-5 py-3.5'
  const alignCls = (a) => (a === 'right' ? 'text-right' : a === 'center' ? 'text-center' : 'text-left')

  return (
    <div className={['w-full overflow-x-auto rounded-card border border-nl-border-soft bg-white font-body', className].join(' ')} {...props}>
      <table className="w-full border-collapse text-[0.88rem]">
        <thead>
          <tr className="border-b border-nl-border-soft">
            {columns.map((c) => (
              <th
                key={c.key}
                className={[
                  pad, alignCls(c.align),
                  'text-[0.72rem] font-semibold uppercase tracking-[0.06em] text-nl-500 whitespace-nowrap',
                ].join(' ')}
              >
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr
              key={r[rowKey] ?? i}
              className="border-b border-nl-border-soft last:border-0 transition-colors duration-150 hover:bg-nl-primary/5"
            >
              {columns.map((c) => (
                <td key={c.key} className={[pad, alignCls(c.align), 'text-nl-700 whitespace-nowrap'].join(' ')}>
                  {c.render ? c.render(r) : r[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
