import React from 'react'

const variants = {
  info:    'bg-nl-primary/8 border-l-[3px] border-nl-primary',
  success: 'bg-nl-success-bg border-l-[3px] border-nl-success-dark',
  warning: 'bg-yellow-50 border-l-[3px] border-yellow-400',
  error:   'bg-nl-danger/7 border-l-[3px] border-nl-danger',
}

const icons = {
  info:    'ℹ',
  success: '✓',
  warning: '⚠',
  error:   '✕',
}

const textColors = {
  info:    'text-nl-primary',
  success: 'text-nl-success-text',
  warning: 'text-yellow-700',
  error:   'text-nl-danger',
}

export function Alert({
  variant = 'info',
  title,
  className = '',
  children,
  ...props
}) {
  return (
    <div
      role="alert"
      className={[
        'flex gap-3.5 rounded-[14px] p-4',
        variants[variant] ?? variants.info,
        className,
      ].join(' ')}
      {...props}
    >
      <span className={`text-base mt-0.5 ${textColors[variant]}`}>
        {icons[variant]}
      </span>
      <div className="flex flex-col gap-0.5">
        {title && (
          <p className={`text-[0.88rem] font-semibold font-body ${textColors[variant]}`}>
            {title}
          </p>
        )}
        <p className="text-[0.85rem] font-body text-nl-700">{children}</p>
      </div>
    </div>
  )
}
