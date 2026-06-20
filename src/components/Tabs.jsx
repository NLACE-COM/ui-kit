import React from 'react'

const listVariants = {
  underline: 'gap-6 border-b border-nl-border-soft',
  pill:      'gap-1 p-1 bg-nl-400/12 rounded-pill w-max',
}

/**
 * Tabs — controlled or uncontrolled.
 *
 * <Tabs items={[{id:'a',label:'Resumen'},{id:'b',label:'Detalle'}]} variant="underline">
 *   {(active) => <div>{active}</div>}
 * </Tabs>
 */
export function Tabs({
  items = [],
  value,
  defaultValue,
  onChange,
  variant = 'underline',
  className = '',
  children,
  ...props
}) {
  const isControlled = value !== undefined
  const [internal, setInternal] = React.useState(
    defaultValue ?? items[0]?.id,
  )
  const active = isControlled ? value : internal

  const select = (id) => {
    if (!isControlled) setInternal(id)
    onChange?.(id)
  }

  return (
    <div className={['flex flex-col gap-4 font-body', className].join(' ')} {...props}>
      <div role="tablist" className={['flex items-center', listVariants[variant] ?? listVariants.underline].join(' ')}>
        {items.map((it) => {
          const on = it.id === active
          const base = 'relative cursor-pointer font-semibold text-[0.9rem] transition-all duration-ui ease-nl disabled:opacity-40 disabled:cursor-not-allowed'
          const skin = variant === 'pill'
            ? [
                'px-4 py-1.5 rounded-pill',
                on ? 'bg-white text-nl-primary shadow-card' : 'text-nl-500 hover:text-nl-text',
              ].join(' ')
            : [
                'pb-3 -mb-px border-b-2',
                on ? 'border-nl-primary text-nl-text' : 'border-transparent text-nl-500 hover:text-nl-text',
              ].join(' ')
          return (
            <button
              key={it.id}
              role="tab"
              aria-selected={on}
              disabled={it.disabled}
              onClick={() => select(it.id)}
              className={[base, skin].join(' ')}
            >
              {it.label}
              {it.badge != null && (
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-pill text-[0.68rem] font-semibold bg-nl-primary/10 text-nl-primary">
                  {it.badge}
                </span>
              )}
            </button>
          )
        })}
      </div>
      {typeof children === 'function' ? children(active) : children}
    </div>
  )
}
