import React from 'react'

const sizes = {
  sm: { track: 'w-9 h-5',  knob: 'w-3.5 h-3.5', on: 'translate-x-4' },
  md: { track: 'w-12 h-7', knob: 'w-5 h-5',     on: 'translate-x-5' },
}

/**
 * Switch — accessible toggle. Controlled (checked) or uncontrolled (defaultChecked).
 *
 * <Switch label="Notificaciones" defaultChecked />
 */
export function Switch({
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
  size = 'md',
  label,
  description,
  className = '',
  ...props
}) {
  const isControlled = checked !== undefined
  const [internal, setInternal] = React.useState(defaultChecked)
  const on = isControlled ? checked : internal
  const s = sizes[size] ?? sizes.md

  const toggle = () => {
    if (disabled) return
    if (!isControlled) setInternal(!on)
    onChange?.(!on)
  }

  return (
    <label
      className={[
        'inline-flex items-center gap-3 font-body select-none',
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        className,
      ].join(' ')}
      {...props}
    >
      <button
        type="button"
        role="switch"
        aria-checked={on}
        disabled={disabled}
        onClick={toggle}
        className={[
          'relative shrink-0 rounded-pill p-0.5',
          'transition-colors duration-ui ease-nl',
          'focus:outline-none focus:ring-4 focus:ring-nl-primary/20',
          s.track,
          on ? 'bg-nl-primary' : 'bg-nl-400/45',
        ].join(' ')}
      >
        <span
          className={[
            'block rounded-pill bg-white shadow-card',
            'transition-transform duration-ui ease-nl',
            s.knob,
            on ? s.on : 'translate-x-0',
          ].join(' ')}
        />
      </button>
      {(label || description) && (
        <span className="flex flex-col">
          {label && <span className="text-[0.9rem] font-semibold text-nl-text">{label}</span>}
          {description && <span className="text-[0.8rem] text-nl-500">{description}</span>}
        </span>
      )}
    </label>
  )
}
