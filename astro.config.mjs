// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://renovart-interiors.ro', // SET-03 — custom domain, never github.io
  base: '/', // SET-03 — no path prefix (handoff-safe)
  // output: 'static' is the Astro 6 default — do NOT set an adapter (SET-01)
  integrations: [mdx(), sitemap()], // SET-02
  image: {
    layout: 'constrained', // auto srcset/sizes for <Image>/<Picture>
    responsiveStyles: true, // auto responsive CSS (anti-CLS)
  },
  fonts: [
    // D-03 — self-hosted via native Fonts API, emitted to _astro/fonts/
    {
      provider: fontProviders.fontsource(),
      name: 'Fraunces', // sturdy, warm display serif (UI-SPEC)
      cssVariable: '--font-display',
      weights: [600, 700],
      styles: ['normal'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Inter', // clean neutral body sans (UI-SPEC)
      cssVariable: '--font-body',
      weights: [400, 600],
      styles: ['normal'],
    },
  ],
});
