import React from 'react'

const sizes = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
}

/**
 * Modal — centered dialog with scrim. Controlled via `open` + `onClose`.
 *
 * <Modal open={open} onClose={()=>setOpen(false)} title="Confirmar"
 *        footer={<><Button variant="secondary">Cancelar</Button><Button>Guardar</Button></>}>
 *   ¿Seguro que quieres continuar?
 * </Modal>
 */
export function Modal({
  open = false,
  onClose,
  title,
  description,
  size = 'md',
  footer,
  closeOnScrim = true,
  className = '',
  children,
  ...props
}) {
  React.useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') onClose?.() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 font-body"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-nl-900/45 backdrop-blur-[2px] animate-[fadeUp_0.2s_ease]"
        onClick={() => closeOnScrim && onClose?.()}
      />
      <div
        className={[
          'relative w-full bg-white rounded-card shadow-hover',
          'border border-nl-border-soft overflow-hidden',
          'animate-fade-up',
          sizes[size] ?? sizes.md,
          className,
        ].join(' ')}
        {...props}
      >
        {(title || onClose) && (
          <div className="flex items-start justify-between gap-4 px-6 pt-5 pb-3">
            <div className="flex flex-col gap-1">
              {title && <h4 className="text-[1.15rem] font-semibold font-display text-nl-text">{title}</h4>}
              {description && <p className="text-[0.85rem] text-nl-500">{description}</p>}
            </div>
            {onClose && (
              <button
                onClick={onClose}
                aria-label="Cerrar"
                className="shrink-0 -mr-1 -mt-1 w-8 h-8 grid place-items-center rounded-pill text-nl-500 hover:bg-nl-400/15 hover:text-nl-text transition-colors duration-ui"
              >
                ✕
              </button>
            )}
          </div>
        )}
        <div className="px-6 py-2 text-[0.9rem] text-nl-700 leading-relaxed">{children}</div>
        {footer && (
          <div className="flex items-center justify-end gap-2.5 px-6 pt-4 pb-5 mt-2">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
