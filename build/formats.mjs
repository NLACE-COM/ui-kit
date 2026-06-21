/* Custom formats de Style Dictionary para @nlace/ui-kit.
   Cada plataforma traduce el token semantico (color.primary, gradient.hero...)
   a la convencion de nombres que ya consumen los proyectos. Asi una sola fuente
   (tokens/*.json) genera CSS vars, Tailwind v3/v4 y objeto JS sin desincronizarse. */

const BANNER_CSS = `/* ⚠️  ARCHIVO GENERADO — NO EDITAR A MANO.
   Fuente: tokens/*.json · Generador: build/build-tokens.mjs (Style Dictionary)
   Editá los tokens y corré: npm run tokens:build */\n`;
const BANNER_JS = `// ⚠️  ARCHIVO GENERADO — NO EDITAR A MANO.
// Fuente: tokens/*.json · Generador: build/build-tokens.mjs (Style Dictionary)
// Editá los tokens y corré: npm run tokens:build\n`;

// ── helpers ───────────────────────────────────────────────────────────────
const keyOf = (t) => t.path.slice(1).join('-'); // ['color','primary-dark'] -> 'primary-dark'
const catOf = (t) => t.path[0];

const byCat = (tokens) => {
  const m = {};
  for (const t of tokens) (m[catOf(t)] ||= []).push(t);
  return m;
};

// fontFamily: array -> string CSS, citando familias con espacios
const cssFont = (arr) => arr.map((f) => (/\s/.test(f) ? `"${f}"` : f)).join(', ');
// fontFamily: array -> literal JS ['"Space Grotesk"', 'sans-serif']
const jsFontArr = (arr) =>
  '[' + arr.map((f) => (/\s/.test(f) ? `'"${f}"'` : `'${f}'`)).join(', ') + ']';

// clave JS: 900 -> number literal · primary-dark -> 'primary-dark' · pink -> pink
const jsKey = (k) => {
  if (/^[0-9]+$/.test(k)) return k;
  if (/^[a-zA-Z_$][\w$]*$/.test(k)) return k;
  return `'${k}'`;
};

// con usesDtcg:true los tokens exponen $value (no .value)
const valOf = (t) => t.$value;
// valor CSS de un token (resuelve fontFamily array)
const cssVal = (t) => (Array.isArray(valOf(t)) ? cssFont(valOf(t)) : valOf(t));

// ── mapeos de nombre por plataforma ─────────────────────────────────────────
const CSS_NAME = {
  color: (k) => `--nl-${k}`,
  opacity: (k) => `--nl-${k}`,
  gradient: (k) => `--nl-grad-${k}`,
  font: (k) => `--nl-font-${k}`,
  tracking: (k) => `--nl-tracking-${k}`,
  radius: (k) => `--nl-radius-${k}`,
  shadow: (k) => `--nl-shadow-${k}`,
  duration: (k) => `--nl-dur-${k}`,
  easing: () => `--nl-ease`,
  alias: (k) => `--${k}`,
  ext: (k) => `--nl-${k}`,
};

// secciones de :root (orden + comentario). extOnly se omite en el canonico.
const CSS_SECTIONS = [
  { title: 'Colores de marca y neutros', cats: ['color'] },
  { title: 'Opacidades semánticas', cats: ['opacity'] },
  { title: 'Aliases semánticos', cats: ['alias'] },
  { title: 'Tipografía', cats: ['font', 'tracking'] },
  { title: 'Radios', cats: ['radius'] },
  { title: 'Sombras', cats: ['shadow'] },
  { title: 'Motion', cats: ['duration', 'easing'] },
  { title: 'Gradientes', cats: ['gradient'] },
  { title: 'Extensiones nlace.com', cats: ['ext'], extOnly: true },
];

const renderRoot = (cats, { includeExt }) => {
  const lines = [];
  for (const section of CSS_SECTIONS) {
    if (section.extOnly && !includeExt) continue;
    const tokensInSection = section.cats.flatMap((c) => cats[c] || []);
    if (!tokensInSection.length) continue;
    lines.push(`  /* ${section.title} */`);
    for (const c of section.cats) {
      for (const t of cats[c] || []) {
        lines.push(`  ${CSS_NAME[c](keyOf(t))}: ${cssVal(t)};`);
      }
    }
    lines.push('');
  }
  if (lines[lines.length - 1] === '') lines.pop();
  return lines.join('\n');
};

// ── bloques estáticos (no son tokens) ───────────────────────────────────────
const TOKENS_CSS_FOOTER = `
/* Base */
body {
  font-family: var(--nl-font-body);
  background: var(--nl-bg);
  color: var(--nl-text);
  -webkit-font-smoothing: antialiased;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: var(--nl-font-display);
  letter-spacing: -0.018em;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

/* Utilidades globales */
.nl-text-gradient {
  background: var(--nl-grad-text-brand);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nl-overlay-dark {
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.55) 0%,
    rgba(0, 0, 0, 0) 60%
  );
}
`;

const CT_HEAD = `/* NLACE Design System — colors_and_type.css
   CSS variables canonicas de marca (tipo + color) + selectores semanticos
   (h1, h2, code, p, etc). El bloque :root sale generado desde tokens/*.json. */

/* Webfonts — Inter + Space Grotesk como TTF variables en /fonts.
   JetBrains Mono (code) se trae de Google Fonts como equivalente libre. */
@font-face {
  font-family: "Inter";
  src: url("fonts/Inter-VariableFont_opsz_wght.ttf") format("truetype-variations");
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "Inter";
  src: url("fonts/Inter-Italic-VariableFont_opsz_wght.ttf") format("truetype-variations");
  font-weight: 100 900;
  font-style: italic;
  font-display: swap;
}
@font-face {
  font-family: "Space Grotesk";
  src: url("fonts/SpaceGrotesk-VariableFont_wght.ttf") format("truetype-variations");
  font-weight: 300 700;
  font-style: normal;
  font-display: swap;
}
@import url("https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap");
`;

const CT_TAIL = `
/* ── Base ─────────────────────────────────────────────────────── */
body {
  font-family: var(--nl-font-body);
  background:  var(--nl-bg);
  color:       var(--nl-text);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

/* ── Headings — display font, tight tracking ──────────────────── */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--nl-font-display);
  letter-spacing: var(--nl-tracking-normal);
  color: var(--nl-text);
  margin: 0;
}
h1 { font-size: clamp(40px, 5vw, 64px); font-weight: 700; letter-spacing: var(--nl-tracking-tight); line-height: 1.05; }
h2 { font-size: clamp(30px, 3.4vw, 44px); font-weight: 600; line-height: 1.12; }
h3 { font-size: 28px; font-weight: 600; line-height: 1.2; }
h4 { font-size: 22px; font-weight: 600; line-height: 1.25; }
h5 { font-size: 18px; font-weight: 600; line-height: 1.3; }
h6 { font-size: 14px; font-weight: 600; line-height: 1.3;
     text-transform: uppercase; letter-spacing: var(--nl-tracking-ui); color: var(--nl-500); }

/* ── Body text ────────────────────────────────────────────────── */
p    { font-size: 16px; line-height: 1.55; color: var(--nl-700); margin: 0; }
small{ font-size: 13px; color: var(--nl-500); }
a    { color: var(--nl-primary); text-decoration: none; border-bottom: 1px solid transparent;
       transition: border-color var(--nl-dur-ui) var(--nl-ease); }
a:hover { border-bottom-color: var(--nl-primary); }

/* ── Mono / code ──────────────────────────────────────────────── */
code, kbd, samp {
  font-family: var(--nl-font-mono);
  font-size: 0.9em;
  background: #f4f4f5;
  padding: 2px 6px;
  border-radius: 6px;
  color: var(--nl-900);
}
pre {
  font-family: var(--nl-font-mono);
  background: var(--nl-900);
  color: #fafafa;
  padding: 16px 18px;
  border-radius: 14px;
  font-size: 13px;
  overflow-x: auto;
}

/* ── Utility classes ──────────────────────────────────────────── */
.nl-eyebrow {
  font-family: var(--nl-font-body);
  font-size: 12px; font-weight: 600;
  text-transform: uppercase;
  letter-spacing: var(--nl-tracking-ui);
  color: var(--nl-primary);
}
.nl-text-gradient {
  background: var(--nl-grad-brand);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.nl-lead { font-size: 20px; line-height: 1.45; color: var(--nl-700); }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
`;

const V4_HEADER = `/* NLACE UI Kit — tailwind-v4.css (Tailwind CSS v4, @theme nativo).

   Uso (Tailwind v4 + Next.js), en tu CSS global:
     @import "tailwindcss";
     @import "@nlace/ui-kit/tailwind-v4";
   El @import de tailwindcss DEBE ir primero.
   Para Tailwind v3 usá: @nlace/ui-kit/preset */
`;

const V4_ANIMATIONS = `
	/* ── Animaciones ─────────────────────────────────────────────────── */
	--animate-fade-up: fade-up 0.48s cubic-bezier(0.22, 1, 0.36, 1) both;
	--animate-pulse-ring: pulse-ring 1.6s ease infinite;
	--animate-shimmer: shimmer 1.4s ease-in-out infinite;
	--animate-spin-nl: spin 0.7s linear infinite;

	@keyframes fade-up {
		0% { opacity: 0; transform: translateY(12px); }
		100% { opacity: 1; transform: translateY(0); }
	}

	@keyframes pulse-ring {
		0% { transform: scale(1); opacity: 0.35; }
		100% { transform: scale(2.2); opacity: 0; }
	}

	@keyframes shimmer {
		0% { background-position: -200% 0; }
		100% { background-position: 200% 0; }
	}
`;

const V4_BASE = `
/* ── Base styles (opcional) ──────────────────────────────────────────── */
@layer base {
	body {
		font-family: var(--font-body);
		background-color: var(--color-nl-bg);
		color: var(--color-nl-text);
		-webkit-font-smoothing: antialiased;
	}

	h1, h2, h3, h4, h5, h6 {
		font-family: var(--font-display);
		letter-spacing: var(--tracking-nl-normal);
	}
}
`;

const PRESET_STATIC_TAIL = (letterSpacing) => `      animation: {
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
${letterSpacing}
      },`;

// ── registro ────────────────────────────────────────────────────────────────
export function registerNlaceFormats(StyleDictionary) {
  // tokens.css — todas las CSS vars (incluye aliases + extensiones)
  StyleDictionary.registerFormat({
    name: 'nlace/tokens-css',
    format: ({ dictionary }) => {
      const cats = byCat(dictionary.allTokens);
      return `${BANNER_CSS}\n:root {\n${renderRoot(cats, { includeExt: true })}\n}\n${TOKENS_CSS_FOOTER}`;
    },
  });

  // colors_and_type.css — canonico (sin extensiones) + selectores tipograficos
  StyleDictionary.registerFormat({
    name: 'nlace/colors-and-type',
    format: ({ dictionary }) => {
      const cats = byCat(dictionary.allTokens);
      return `${CT_HEAD}\n:root {\n${renderRoot(cats, { includeExt: false })}\n}\n${CT_TAIL}`;
    },
  });

  // tailwind-v4.css — @theme nativo
  StyleDictionary.registerFormat({
    name: 'nlace/tailwind-v4',
    format: ({ dictionary }) => {
      const cats = byCat(dictionary.allTokens);
      const L = [];
      const push = (name, val) => L.push(`\t${name}: ${val};`);
      L.push('\t/* ── Colores de marca y neutros ──────────────────────────────── */');
      for (const t of cats.color || []) push(`--color-nl-${keyOf(t)}`, valOf(t));
      L.push('');
      L.push('\t/* ── Opacidades semánticas ───────────────────────────────────── */');
      for (const t of cats.opacity || []) push(`--color-nl-${keyOf(t)}`, valOf(t));
      L.push('');
      L.push('\t/* ── Tipografía ──────────────────────────────────────────────── */');
      for (const t of cats.font || []) push(`--font-${keyOf(t)}`, cssFont(valOf(t)));
      L.push('');
      L.push('\t/* ── Radios ──────────────────────────────────────────────────── */');
      for (const t of cats.radius || []) push(`--radius-${keyOf(t)}`, valOf(t));
      L.push('');
      L.push('\t/* ── Sombras ─────────────────────────────────────────────────── */');
      for (const t of cats.shadow || []) push(`--shadow-${keyOf(t)}`, valOf(t));
      L.push('');
      L.push('\t/* ── Motion ──────────────────────────────────────────────────── */');
      for (const t of cats.easing || []) {
        push('--ease-nl', valOf(t));
        push('--transition-timing-function-nl', valOf(t));
      }
      for (const t of cats.duration || []) push(`--duration-${keyOf(t)}`, valOf(t));
      L.push('');
      L.push('\t/* ── Gradientes ──────────────────────────────────────────────── */');
      for (const t of cats.gradient || []) push(`--background-image-nl-${keyOf(t)}`, valOf(t));
      L.push('');
      L.push('\t/* ── Letter spacing ──────────────────────────────────────────── */');
      for (const t of cats.tracking || []) push(`--tracking-nl-${keyOf(t)}`, valOf(t));
      return `${BANNER_CSS}${V4_HEADER}\n@theme {\n${L.join('\n')}\n${V4_ANIMATIONS}}\n${V4_BASE}`;
    },
  });

  // tailwind-preset.js — preset Tailwind v3
  StyleDictionary.registerFormat({
    name: 'nlace/tailwind-preset',
    format: ({ dictionary }) => {
      const cats = byCat(dictionary.allTokens);
      const colorLines = [...(cats.color || []), ...(cats.opacity || [])]
        .map((t) => `          ${jsKey(keyOf(t))}: '${valOf(t)}',`)
        .join('\n');
      const font = Object.fromEntries((cats.font || []).map((t) => [keyOf(t), valOf(t)]));
      const grad = (cats.gradient || [])
        .map((t) => `        'nl-${keyOf(t)}': '${valOf(t)}',`)
        .join('\n');
      const radius = (cats.radius || [])
        .map((t) => `        ${jsKey(keyOf(t))}: '${valOf(t)}',`)
        .join('\n');
      const shadow = (cats.shadow || [])
        .map((t) => `        ${jsKey(keyOf(t))}: '${valOf(t)}',`)
        .join('\n');
      const dur = (cats.duration || [])
        .map((t) => `        ${jsKey(keyOf(t))}: '${valOf(t)}',`)
        .join('\n');
      const ease = (cats.easing || [])[0]?.$value ?? 'cubic-bezier(0.22, 1, 0.36, 1)';
      const letterSpacing = (cats.tracking || [])
        .map((t) => `        'nl-${keyOf(t)}': '${valOf(t)}',`)
        .join('\n');

      return `${BANNER_JS}// Uso en tailwind.config.js:
//   const nlacePreset = require('@nlace/ui-kit/preset')
//   module.exports = { presets: [nlacePreset], ... }

/** @type {import('tailwindcss').Config} */
const nlacePreset = {
  theme: {
    extend: {
      colors: {
        nl: {
${colorLines}
        }
      },
      fontFamily: {
        display: ${jsFontArr(font.display)},
        body:    ${jsFontArr(font.body)},
        mono:    ${jsFontArr(font.mono)},
      },
      borderRadius: {
${radius}
      },
      boxShadow: {
${shadow}
      },
      transitionTimingFunction: {
        nl: '${ease}',
      },
      transitionDuration: {
${dur}
      },
      backgroundImage: {
${grad}
      },
${PRESET_STATIC_TAIL(letterSpacing)}
    }
  }
}

module.exports = nlacePreset
`;
    },
  });

  // tokens.js — objeto ESM (nested + mapa flat de CSS vars)
  StyleDictionary.registerFormat({
    name: 'nlace/tokens-js',
    format: ({ dictionary }) => {
      const cats = byCat(dictionary.allTokens);
      const cssVars = {};
      for (const t of dictionary.allTokens) {
        const fn = CSS_NAME[catOf(t)];
        if (fn) cssVars[fn(keyOf(t))] = cssVal(t);
      }
      const group = (c, val = (t) => valOf(t)) =>
        Object.fromEntries((cats[c] || []).map((t) => [keyOf(t), val(t)]));
      const tokens = {
        color: group('color'),
        opacity: group('opacity'),
        gradient: group('gradient'),
        font: group('font'),
        tracking: group('tracking'),
        radius: group('radius'),
        shadow: group('shadow'),
        duration: group('duration'),
        easing: (cats.easing || [])[0]?.$value ?? null,
        alias: group('alias'),
        ext: group('ext'),
      };
      return `${BANNER_JS}export const cssVars = ${JSON.stringify(cssVars, null, 2)};

export const tokens = ${JSON.stringify(tokens, null, 2)};

export default tokens;
`;
    },
  });

  // tokens.cjs — mismo objeto en CommonJS (para consumidores con require)
  StyleDictionary.registerFormat({
    name: 'nlace/tokens-cjs',
    format: ({ dictionary }) => {
      const cats = byCat(dictionary.allTokens);
      const cssVars = {};
      for (const t of dictionary.allTokens) {
        const fn = CSS_NAME[catOf(t)];
        if (fn) cssVars[fn(keyOf(t))] = cssVal(t);
      }
      const group = (c) => Object.fromEntries((cats[c] || []).map((t) => [keyOf(t), valOf(t)]));
      const tokens = {
        color: group('color'),
        opacity: group('opacity'),
        gradient: group('gradient'),
        font: group('font'),
        tracking: group('tracking'),
        radius: group('radius'),
        shadow: group('shadow'),
        duration: group('duration'),
        easing: (cats.easing || [])[0]?.$value ?? null,
        alias: group('alias'),
        ext: group('ext'),
      };
      return `${BANNER_JS}const cssVars = ${JSON.stringify(cssVars, null, 2)};

const tokens = ${JSON.stringify(tokens, null, 2)};

module.exports = { cssVars, tokens };
module.exports.default = tokens;
`;
    },
  });

  // tokens.json — mapa resuelto nombre-CSS -> valor (universal, cualquier lenguaje)
  StyleDictionary.registerFormat({
    name: 'nlace/tokens-json',
    format: ({ dictionary }) => {
      const cssVars = {};
      for (const t of dictionary.allTokens) {
        const fn = CSS_NAME[catOf(t)];
        if (fn) cssVars[fn(keyOf(t))] = cssVal(t);
      }
      return JSON.stringify(cssVars, null, 2) + '\n';
    },
  });

  // tokens.d.ts — tipos (estático)
  StyleDictionary.registerFormat({
    name: 'nlace/tokens-dts',
    format: () =>
      `${BANNER_JS}export declare const cssVars: Record<string, string>;

export interface NlaceTokens {
  color: Record<string, string>;
  opacity: Record<string, string>;
  gradient: Record<string, string>;
  font: { display: string[]; body: string[]; mono: string[] };
  tracking: Record<string, string>;
  radius: Record<string, string>;
  shadow: Record<string, string>;
  duration: Record<string, string>;
  easing: string;
  alias: Record<string, string>;
  ext: Record<string, string>;
}

export declare const tokens: NlaceTokens;
export default tokens;
`,
  });
}
