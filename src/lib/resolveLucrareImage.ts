// resolveLucrareImage — the CMS ↔ astro:assets round-trip bridge (CMS-02, D-02).
// RESEARCH Pattern 1 (Astro's official "Dynamically importing images" recipe).
//
// The `lucrari` collection stores image references as plain strings rooted at
// `/src/assets/lucrari/...` (NOT Astro's `image()` helper — see content.config.ts /
// Pitfall 3). This helper resolves such a string to the `ImageMetadata` that
// `<Picture>`/`<Image>` consume, so astro:assets still emits AVIF/WebP + srcset.
//
// import.meta.glob is build-time and statically analyzable: the pattern MUST be a
// LITERAL string (no variable interpolation). Its keys are project-root absolute
// paths like '/src/assets/lucrari/cluj-palier-vopsit.jpg' — i.e. exactly the string
// Pages CMS writes (media.output: /src/assets/lucrari) and the frontmatter stores.
import type { ImageMetadata } from 'astro';

const images = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/lucrari/*.{jpeg,jpg,png,webp,avif}',
);

export async function resolveLucrareImage(path: string): Promise<ImageMetadata> {
  const loader = images[path];
  if (!loader) {
    // Fail closed — a bad CMS path must break the build, never ship a missing image.
    throw new Error(`Imagine inexistentă în src/assets/lucrari: "${path}"`);
  }
  return (await loader()).default;
}
