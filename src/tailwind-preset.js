// NLACE UI Kit — tailwind-preset.js v2.0.0
// Para Tailwind v3. Si usas Tailwind v4, importa @nlace/ui-kit/tailwind-v4 en su lugar.
// Uso en tailwind.config.js:
//   const nlacePreset = require('@nlace/ui-kit/preset')
//   module.exports = { presets: [nlacePreset], ... }

/** @type {import('tailwindcss').Config} */
const nlacePreset = {
  theme: {
    extend: {
      colors: {
        nl: {
          bg:              '#efefef',
          text:            '#141414',
          primary:         '#3f58ea',
          'primary-dark':  '#2f2f81',
          accent:          '#ff6143',
          'accent-warm':   '#ff8c42',
          success:         '#6be8b0',
          'success-dark':  '#22c55e',
          'success-text':  '#166534',
          'success-bg':    '#f0fdf4',
          white:           '#ffffff',
          900:             '#18181b',
          700:             '#3f3f46',
          500:             '#71717a',
          400:             '#a1a1aa',
          'border-soft':   '#e8e8e8',
          'border-ui':     '#d4d4d8',
          danger:          '#dc2626',
          cyan:            '#a5f3fc',
          'blue-24':       '#1a1a5e',
          'blue-28':       '#2d1f6e',
        }
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'Telegraf', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
        mono:    ['"SF Mono"', '"Fira Code"', 'monospace'],
      },
      borderRadius: {
        input: '10px',
        card:  '20px',
        pill:  '9999px',
      },
      boxShadow: {
        card:  '0 2px 12px rgba(20,20,20,0.08)',
        hover: '0 10px 28px rgba(20,20,20,0.14)',
      },
      transitionTimingFunction: {
        nl: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      transitionDuration: {
        ui:     '220ms',
        reveal: '480ms',
      },
      backgroundImage: {
        'nl-hero':    'linear-gradient(135deg, #2f2f81 0%, #1a1a5e 60%, #2d1f6e 100%)',
        'nl-primary': 'linear-gradient(135deg, #3f58ea 0%, #2f2f81 100%)',
        'nl-accent':  'linear-gradient(135deg, #ff6143 0%, #ff8c42 100%)',
        'nl-mint':    'linear-gradient(135deg, #6be8b0 0%, #34d399 100%)',
        'nl-dark':    'linear-gradient(180deg, #18181b 0%, #2f2f81 100%)',
        'nl-surface': 'linear-gradient(135deg, #ffffff 0%, #f4f4f5 100%)',
        'nl-brand':   'linear-gradient(90deg, #3f58ea 0%, #ff6143 100%)',
      },
      animation: {
        'fade-up':    'fadeUp 0.48s cubic-bezier(0.22,1,0.36,1) both',
        'pulse-ring': 'pulseRing 1.6s ease infinite',
        'shimmer':    'shimmer 1.4s ease-in-out infinite',
        'spin-nl':    'spin 0.7s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseRing: {
          '0%':   { transform: 'scale(1)', opacity: '0.35' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      letterSpacing: {
        'nl-tight':  '-0.03em',
        'nl-normal': '-0.018em',
        'nl-ui':     '0.08em',
      },
    }
  }
}

module.exports = nlacePreset
