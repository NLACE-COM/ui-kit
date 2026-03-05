import React from 'react'

const variants = {
  accent:        'bg-nl-accent text-white hover:-translate-y-0.5',
  primary:       'bg-nl-primary text-white hover:-translate-y-0.5',
  secondary:     'bg-white text-nl-text border border-nl-border-ui hover:-translate-y-0.5',
  success:       'bg-nl-success text-nl-success-text hover:-translate-y-0.5',
  outlineLight:  'bg-transparent text-white border border-white/50 hover:-translate-y-0.5',
  danger:        'bg-nl-danger text-white hover:-translate-y-0.5',
}

const sizes = {
  sm: 'px-4 py-1.5 text-[0.82rem]',
  md: 'px-[22px] py-[11px] text-[0.9rem]',
  lg: 'px-[30px] py-[15px] text-base',
}

export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  children,
  ...props
}) {
  return (
    <button
      disabled={disabled}
      className={[
        'inline-flex items-center justify-center gap-2',
        'rounded-pill font-semibold font-body',
        'transition-all duration-ui ease-nl shadow-none',
        'hover:shadow-hover',
        'focus:outline-none focus:ring-4 focus:ring-nl-primary/20',
        'disabled:opacity-40 disabled:translate-y-0 disabled:shadow-none disabled:cursor-not-allowed',
        variants[variant] ?? variants.primary,
        sizes[size] ?? sizes.md,
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </button>
  )
}
