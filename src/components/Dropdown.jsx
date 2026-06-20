import React from 'react'

/**
 * Dropdown — click-to-open menu. Uncontrolled open state.
 *
 * <Dropdown
 *   trigger={<Button variant="secondary">Acciones ▾</Button>}
 *   items={[
 *     {id:'edit', label:'Editar'},
 *     {id:'dup',  label:'Duplicar'},
 *     {divider:true},
 *     {id:'del',  label:'Eliminar', danger:true},
 *   ]}
 *   onSelect={(id)=>{}}
 * />
 */
export function Dropdown({
  trigger,
  items = [],
  onSelect,
  align = 'left',
  className = '',
  ...props
}) {
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef(null)

  React.useEffect(() => {
    if (!open) return
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onDoc)
    window.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('mousedown', onDoc); window.removeEventListener('keydown', onKey) }
  }, [open])

  return (
    <div ref={ref} className={['relative inline-flex font-body', className].join(' ')} {...props}>
      <span onClick={() => setOpen((o) => !o)} className="inline-flex">{trigger}</span>
      {open && (
        <div
          role="menu"
          className={[
            'absolute top-full mt-2 z-50 min-w-[200px]',
            'bg-white rounded-[14px] border border-nl-border-soft shadow-hover',
            'p-1.5 animate-fade-up',
            align === 'right' ? 'right-0' : 'left-0',
          ].join(' ')}
        >
          {items.map((it, i) =>
            it.divider ? (
              <div key={`d${i}`} className="my-1.5 h-px bg-nl-border-soft" />
            ) : (
              <button
                key={it.id}
                role="menuitem"
                disabled={it.disabled}
                onClick={() => { onSelect?.(it.id); setOpen(false) }}
                className={[
                  'w-full flex items-center gap-2.5 px-3 py-2 rounded-[9px]',
                  'text-[0.86rem] font-medium text-left',
                  'transition-colors duration-150',
                  'disabled:opacity-40 disabled:cursor-not-allowed',
                  it.danger
                    ? 'text-nl-danger hover:bg-nl-danger/8'
                    : 'text-nl-text hover:bg-nl-primary/8',
                ].join(' ')}
              >
                {it.icon && <span className="text-[0.95rem] opacity-80">{it.icon}</span>}
                <span className="flex-1">{it.label}</span>
                {it.shortcut && <span className="text-[0.72rem] text-nl-400 font-mono">{it.shortcut}</span>}
              </button>
            ),
          )}
        </div>
      )}
    </div>
  )
}
