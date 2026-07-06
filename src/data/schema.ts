// JSON-LD schema factories — derived ENTIRELY from business.ts (LAY-05).
// Zero hardcoded NAP/contact strings: every value flows from `business`.
// Pure functions returning plain objects; pages wrap one node (or a @graph
// array) with `@context: 'https://schema.org'` once at the root and pass the
// result to <JsonLd>. Do NOT add `@context` inside these factories.
import { business } from './business';

// Structural types for the factory params — kept local so schema.ts typechecks
// independently of faq.ts/services.ts. They match the `FaqItem`/`Service` shapes
// those single-source modules export (the arrays passed in are those exports).
type FaqItem = { question: string; answer: string };
type Service = { slug: string; title: string; description: string; icon?: string };

const SITE = business.domain; // e.g. https://nume-firma.ro
const BIZ_ID = `${SITE}/#business`; // stable @id for cross-reference
// business.telHref carries the "tel:" prefix — strip it; the remaining
// "+<country><number>" form is the Google-correct telephone format.
const tel = business.telHref.replace(/^tel:/, '');
// Absolute image/logo URL (mirrors BaseHead's ogImage resolution).
const ogImageAbs = new URL(business.ogImage, SITE).href;

/**
 * Business node — emitted on Home + Contact. Typed as BOTH
 * HomeAndConstructionBusiness (parent) AND GeneralContractor (most specific
 * LocalBusiness subtype for a renovation firm) so answer engines resolve the
 * precise entity while general consumers still match the parent (GEO-01).
 * `geo` is intentionally OMITTED: no fake coordinates are shipped (geo is
 * recommended, not required, so absence is valid). `sameAs`/`priceRange` are
 * intentionally absent — sameAs awaits a real Google Business Profile (owner
 * follow-up) and priceRange would be a pricing claim the owner has chosen not
 * to make.
 */
export function homeAndConstructionBusiness() {
  return {
    '@type': ['HomeAndConstructionBusiness', 'GeneralContractor'],
    '@id': BIZ_ID,
    name: business.name,
    url: SITE,
    telephone: tel,
    email: business.email,
    image: ogImageAbs,
    logo: ogImageAbs,
    address: {
      '@type': 'PostalAddress',
      // Service-area business (no public storefront): city/region/country only, no
      // streetAddress (a fake/omitted street would hurt local trust more than help).
      addressLocality: 'Cluj-Napoca',
      addressRegion: 'Cluj',
      addressCountry: 'RO',
    },
    areaServed: { '@type': 'City', name: 'Cluj-Napoca' },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '17:00',
      },
    ],
    // geo: OMITTED by decision — no fake coordinates.
  };
}

/**
 * WebSite node — emitted on Home. Declares site-level provenance: `publisher`
 * cross-references the business (Renovart owns/publishes the content) while
 * `creator` names the agency that built the site (Boring Technologies) as a
 * resolvable Organization with its own @id + url. This is the schema.org-correct
 * "built by" relationship — a soft AEO/entity signal that complements (does not
 * replace) the followed footer credit link.
 */
export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': `${SITE}/#website`,
    url: SITE,
    name: business.name,
    inLanguage: 'ro-RO',
    publisher: { '@id': BIZ_ID },
    creator: {
      '@type': 'Organization',
      '@id': `${business.builtBy.url}#organization`,
      name: business.builtBy.name,
      url: business.builtBy.url,
    },
  };
}

/**
 * Service node — emitted on Servicii. `provider` cross-references the business
 * node by @id (no duplication). `hasOfferCatalog` lists the six offerings.
 */
export function serviceSchema(services: readonly Service[]) {
  return {
    '@type': 'Service',
    name: 'Renovarea scărilor de bloc',
    serviceType: 'Renovarea scărilor de bloc',
    provider: { '@id': BIZ_ID },
    areaServed: { '@type': 'City', name: 'Cluj-Napoca' },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicii de renovare a scărilor de bloc',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.title,
          description: s.description,
        },
      })),
    },
  };
}

/**
 * FAQPage node — emitted on Home (and optionally Contact). Mirrors the visible
 * FAQ DOM exactly (same faq.ts source → no drift).
 */
export function faqPageSchema(items: readonly FaqItem[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.question,
      acceptedAnswer: { '@type': 'Answer', text: it.answer },
    })),
  };
}

/**
 * BreadcrumbList node — emitted on /lucrari/[slug]. The final (current) crumb
 * omits `item` per Google guidance.
 */
export function breadcrumbList(crumbs: readonly { name: string; url?: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      ...(c.url ? { item: new URL(c.url, SITE).href } : {}),
    })),
  };
}

/**
 * Article node — emitted on each /ghiduri/[slug] guide (GEO-02, Phase 8).
 * Single-sourced from business.ts via BIZ_ID: `author` and `publisher` both
 * reference the same GeneralContractor/Organization entity, so answer engines
 * resolve one consistent brand. Returns a plain node WITHOUT `@context`; the
 * guide page wraps a @graph and adds `@context` once at the root.
 */
export function articleSchema(args: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified: string;
}) {
  return {
    '@type': 'Article',
    headline: args.headline,
    description: args.description,
    inLanguage: 'ro-RO',
    datePublished: args.datePublished,
    dateModified: args.dateModified,
    author: { '@id': BIZ_ID },
    publisher: { '@id': BIZ_ID },
    mainEntityOfPage: new URL(args.path, SITE).href,
    image: ogImageAbs,
  };
}
