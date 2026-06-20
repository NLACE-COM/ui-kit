import React from 'react'

const placements = {
  top:    { box: 'bottom-full left-1/2 -translate-x-1/2 mb-2', arrow: 'top-full left-1/2 -translate-x-1/2 -mt-1' },
  bottom: { box: 'top-full left-1/2 -translate-x-1/2 mt-2',    arrow: 'bottom-full left-1/2 -translate-x-1/2 -mb-1' },
  left:   { box: 'right-full top-1/2 -translate-y-1/2 mr-2',   arrow: 'left-full top-1/2 -translate-y-1/2 -ml-1' },
  right:  { box: 'left-full top-1/2 -translate-y-1/2 ml-2',    arrow: 'right-full top-1/2 -translate-y-1/2 -mr-1' },
}

/**
 * Tooltip — dark label on hover/focus. CSS-only reveal, no JS state.
 *
 * <Tooltip label="Copiar enlace" placement="top"><Button>Compartir</Button></Tooltip>
 */
export function Tooltip({
  label,
  placement = 'top',
  className = '',
  children,
  ...props
}) {
  const p = placements[placement] ?? placements.top
  return (
    <span className={['relative inline-flex group/tt font-body', className].join(' ')} {...props}>
      {children}
      <span
        role="tooltip"
        className={[
          'pointer-events-none absolute z-50 whitespace-nowrap',
          'px-2.5 py-1.5 rounded-[8px]',
          'text-[0.76rem] font-medium text-white bg-nl-900',
          'shadow-hover',
          'opacity-0 scale-95 transition-all duration-150 ease-nl',
          'group-hover/tt:opacity-100 group-hover/tt:scale-100',
          'group-focus-within/tt:opacity-100 group-focus-within/tt:scale-100',
          p.box,
        ].join(' ')}
      >
        {label}
        <span className={['absolute w-2 h-2 rotate-45 bg-nl-900', p.arrow].join(' ')} />
      </span>
    </span>
  )
}
