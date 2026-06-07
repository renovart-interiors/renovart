// Astro 6 content collections (CLAUDE.md "What NOT to Use" — obey exactly):
// - This file lives at src/content.config.ts (NOT the legacy src/content/config.ts).
// - `defineCollection` is imported from 'astro:content' (NOT 'astro/zod' — that
//   re-exports ONLY `z`; importing defineCollection from there triggers the Phase 1
//   GenerateContentTypesError trap — see 01-03-SUMMARY.md).
// - `z` is imported from 'astro/zod' (NO separate zod install — avoids version drift).
// - `glob` is imported from 'astro/loaders'.
// - schema is a FUNCTION so the image() helper is in scope; image() resolves the
//   frontmatter `./`-relative path against the entry file's own directory (Pattern A)
//   → astro:assets emits AVIF/WebP + responsive srcset at build (fail-closed on a
//   bad/missing path).
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

// `lucrari` — the portfolio spine (LUC-01, D-01, D-12). Every downstream surface
// (grid, detail page, slider, Phase 3 homepage featured pull) reads from this
// collection + schema. Glob matches BOTH .md and .mdx so the real after-only
// project (.md) and the demo before/after project (.mdx) both load.
const lucrari = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/lucrari' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      location: z.string(),
      date: z.coerce.date(), // ISO YYYY-MM-DD → Date (CMS-friendly)
      category: z.enum(['scara-bloc', 'palier', 'fatada-interioara']).optional(),
      coverImage: image(),
      afterImages: z.array(image()), // REQUIRED (D-12)
      beforeImages: z.array(image()).optional(), // OPTIONAL (D-12): only matched
      // before+after pairs drive the slider; after-only → gallery.
      featured: z.boolean().default(false), // seed entries may omit it
    }),
});

export const collections = { lucrari };
