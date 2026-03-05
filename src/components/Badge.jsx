import React from 'react'

const variants = {
  primary:       'bg-nl-primary/10 text-nl-primary',
  accent:        'bg-nl-accent/10 text-[#d64f2a]',
  success:       'bg-nl-success/20 text-nl-success-text',
  danger:        'bg-nl-danger/8 text-nl-danger',
  neutral:       'bg-nl-400/15 text-nl-700',
  solidPrimary:  'bg-nl-primary text-white',
  solidAccent:   'bg-nl-accent text-white',
  solidDark:     'bg-nl-900 text-white',
}

export function Badge({
  variant = 'primary',
  className = '',
  children,
  ...props
}) {
  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 px-3 py-1',
        'rounded-pill text-[0.78rem] font-semibold font-body',
        variants[variant] ?? variants.primary,
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </span>
  )
}
