// requireSingleton — fail-closed read of an object-format copy singleton (CR-02).
//
// All Phase 5 page-chrome copy lives in object-format JSON files loaded by the
// `*Copy` collections, each exposing a single entry keyed `main` (see
// content.config.ts). Pages reading these used `(await getEntry('xCopy','main'))!.data`,
// but the TypeScript non-null assertion `!` is ERASED at runtime and does nothing.
// If the `main` entry is absent (e.g. a CMS round-trip drops the `main` wrapper, or
// an editor renames the top-level key), `getEntry` resolves to `undefined` and
// `undefined.data` throws an opaque `Cannot read properties of undefined (reading
// 'data')` with no indication of which copy file is malformed.
//
// This helper guards the read and throws a CLEAR, content-identifying, build-time
// error instead — honoring the "fail-closed with a clear message" contract the rest
// of content.config.ts advertises. Zero client JS: this runs only in the Astro
// frontmatter (build/SSR-render time), never ships to the browser.
import { getEntry } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

// The object-format copy collections, each keyed by the single `main` entry.
type SingletonCollection = 'homeCopy' | 'serviciiCopy' | 'despreCopy' | 'contactCopy' | 'trustCopy';

// Map each collection to the JSON file the owner edits, for a precise error message.
const COPY_FILE: Record<SingletonCollection, string> = {
  homeCopy: 'src/data/copy/home.json',
  serviciiCopy: 'src/data/copy/servicii.json',
  despreCopy: 'src/data/copy/despre.json',
  contactCopy: 'src/data/copy/contact.json',
  trustCopy: 'src/data/copy/trust.json',
};

// Return the precise per-collection `data` type. `getEntry(collection, 'main')`
// with a generic `collection` widens to a UNION of every collection's data, so
// the result is asserted back to the caller's specific collection entry. This is
// the only cast in the helper and is sound: each of these collections holds an
// object-format JSON file whose single entry is keyed `main` (content.config.ts).
export async function requireSingleton<C extends SingletonCollection>(
  collection: C,
): Promise<CollectionEntry<C>['data']> {
  const entry = (await getEntry(collection, 'main')) as CollectionEntry<C> | undefined;
  if (!entry) {
    throw new Error(
      `${collection}: entrarea „main" lipsește din ${COPY_FILE[collection]} — ` +
        'fișierul trebuie să fie de forma { "main": { ... } }.',
    );
  }
  return entry.data;
}
