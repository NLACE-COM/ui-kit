// ⚠️  ARCHIVO GENERADO — NO EDITAR A MANO.
// Fuente: tokens/*.json · Generador: build/build-tokens.mjs (Style Dictionary)
// Editá los tokens y corré: npm run tokens:build
// Uso en tailwind.config.js:
//   const nlacePreset = require('@nlace/ui-kit/preset')
//   module.exports = { presets: [nlacePreset], ... }

/** @type {import('tailwindcss').Config} */
const nlacePreset = {
  theme: {
    extend: {
      colors: {
        nl: {
          400: '#a1a1aa',
          500: '#71717a',
          700: '#3f3f46',
          900: '#0f1011',
          bg: '#efefef',
          text: '#0f1011',
          black: '#0f1011',
          primary: '#5869f7',
          'primary-dark': '#2d3bc4',
          accent: '#fc624b',
          'accent-warm': '#ff8c42',
          pink: '#f76dee',
          magenta: '#b717af',
          success: '#42cf8a',
          'success-dark': '#2ba36a',
          'success-text': '#053a23',
          'success-bg': '#eaf9f1',
          danger: '#fc624b',
          cyan: '#a5f3fc',
          'blue-24': '#1a1a5e',
          'blue-28': '#2d1f6e',
          white: '#ffffff',
          surface: '#dbdcd7',
          'border-soft': '#dbdcd7',
          'border-ui': '#c6c7c2',
          'primary-10': 'rgba(88, 105, 247, 0.1)',
          'primary-20': 'rgba(88, 105, 247, 0.2)',
          'accent-10': 'rgba(252, 98, 75, 0.1)',
          'danger-8': 'rgba(252, 98, 75, 0.08)',
        }
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body:    ['Inter', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', '"SF Mono"', '"Fira Code"', 'monospace'],
      },
      borderRadius: {
        input: '10px',
        card: '20px',
        pill: '9999px',
      },
      boxShadow: {
        card: '0 2px 12px rgba(20, 20, 20, 0.08)',
        hover: '0 10px 28px rgba(20, 20, 20, 0.14)',
      },
      transitionTimingFunction: {
        nl: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      transitionDuration: {
        ui: '220ms',
        reveal: '480ms',
      },
      backgroundImage: {
        'nl-hero': 'linear-gradient(135deg, #5869f7 0%, #b717af 60%, #f76dee 100%)',
        'nl-primary': 'linear-gradient(135deg, #5869f7 0%, #2d3bc4 100%)',
        'nl-accent': 'linear-gradient(135deg, #fc624b 0%, #f76dee 100%)',
        'nl-mint': 'linear-gradient(135deg, #42cf8a 0%, #2ba36a 100%)',
        'nl-dark': 'linear-gradient(180deg, #0f1011 0%, #2d3bc4 100%)',
        'nl-surface': 'linear-gradient(135deg, #ffffff 0%, #dbdcd7 100%)',
        'nl-brand': 'linear-gradient(90deg, #5869f7 0%, #fc624b 100%)',
        'nl-warm': 'linear-gradient(90deg, #fc624b 0%, #ff8c42 100%)',
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
        'nl-tight': '-0.03em',
        'nl-normal': '-0.018em',
        'nl-ui': '0.08em',
      },
    }
  }
}

module.exports = nlacePreset
