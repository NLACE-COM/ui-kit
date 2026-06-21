/* Genera todos los artefactos de tokens desde tokens/*.json (fuente unica DTCG).
   Uso: npm run tokens:build  (o: node build/build-tokens.mjs) */

import StyleDictionary from 'style-dictionary';
import { registerNlaceFormats } from './formats.mjs';

registerNlaceFormats(StyleDictionary);

const sd = new StyleDictionary({
  source: [
    'tokens/color.json',
    'tokens/opacity.json',
    'tokens/alias.json',
    'tokens/typography.json',
    'tokens/radius.json',
    'tokens/shadow.json',
    'tokens/motion.json',
    'tokens/gradient.json',
    'tokens/extensions.json',
  ],
  usesDtcg: true,
  // Sin transforms: queremos los valores tal cual se autoran (refs ya resueltas);
  // el naming por plataforma lo resuelven los custom formats.
  platforms: {
    nlace: {
      // name/kebab solo asigna un nombre único por token (evita el warning de
      // colisiones); no toca los valores. El naming real lo hacen los formats.
      transforms: ['name/kebab'],
      buildPath: './',
      files: [
        { destination: 'src/tokens/tokens.css', format: 'nlace/tokens-css' },
        { destination: 'colors_and_type.css', format: 'nlace/colors-and-type' },
        { destination: 'src/tokens/tailwind-v4.css', format: 'nlace/tailwind-v4' },
        { destination: 'src/tailwind-preset.js', format: 'nlace/tailwind-preset' },
        { destination: 'src/tokens/tokens.mjs', format: 'nlace/tokens-js' },
        { destination: 'src/tokens/tokens.cjs', format: 'nlace/tokens-cjs' },
        { destination: 'src/tokens/tokens.json', format: 'nlace/tokens-json' },
        { destination: 'src/tokens/tokens.d.ts', format: 'nlace/tokens-dts' },
      ],
    },
  },
});

await sd.hasInitialized;
await sd.buildAllPlatforms();
console.log('✓ tokens generados desde tokens/*.json');
