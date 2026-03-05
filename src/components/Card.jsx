import React from 'react'

export function Card({
  accent = false,
  hover = true,
  padding = 'p-6',
  className = '',
  children,
  ...props
}) {
  return (
    <div
      className={[
        'rounded-card border',
        accent
          ? 'bg-nl-primary text-white border-transparent'
          : 'bg-white border-nl-border-soft shadow-card',
        hover && !accent
          ? 'transition-all duration-ui ease-nl hover:-translate-y-[3px] hover:shadow-hover'
          : '',
        padding,
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </div>
  )
}
