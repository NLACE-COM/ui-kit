import React from 'react'

export function Input({
  label,
  error,
  success,
  hint,
  className = '',
  ...props
}) {
  const stateClass = error
    ? 'border-nl-danger focus:ring-nl-danger/20'
    : success
    ? 'border-nl-success-dark focus:ring-nl-success-dark/20'
    : 'border-nl-border-ui focus:border-nl-primary focus:ring-nl-primary/20'

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-[0.82rem] font-semibold text-nl-text font-body">
          {label}
        </label>
      )}
      <input
        className={[
          'w-full min-h-[44px] px-[14px]',
          'bg-white border-[1.5px] rounded-input',
          'font-body text-[0.9rem] text-nl-text',
          'transition-all duration-ui ease-nl',
          'outline-none focus:ring-4',
          'placeholder:text-nl-400',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          stateClass,
          className,
        ].join(' ')}
        {...props}
      />
      {(error || hint) && (
        <p className={`text-[0.78rem] font-body ${error ? 'text-nl-danger' : 'text-nl-500'}`}>
          {error || hint}
        </p>
      )}
    </div>
  )
}
