import React from 'react'

const spinnerSizes = {
  sm: 'w-4 h-4 border-2',
  md: 'w-6 h-6 border-[2.5px]',
  lg: 'w-10 h-10 border-[3px]',
}

export function Spinner({ size = 'md', className = '', ...props }) {
  return (
    <div
      role="status"
      aria-label="Cargando"
      className={[
        'rounded-full border-nl-border-ui border-t-nl-primary',
        'animate-spin-nl',
        spinnerSizes[size] ?? spinnerSizes.md,
        className,
      ].join(' ')}
      {...props}
    />
  )
}

export function Skeleton({ className = '', ...props }) {
  return (
    <div
      className={[
        'rounded-lg bg-nl-border-soft animate-shimmer',
        'bg-[length:200%_100%]',
        className,
      ].join(' ')}
      style={{
        backgroundImage:
          'linear-gradient(90deg, #e8e8e8 25%, #efefef 50%, #e8e8e8 75%)',
      }}
      {...props}
    />
  )
}
