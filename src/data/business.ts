// Single source of truth for all NAP / contact data (LAY-05, D-15).
// No contact string may be hardcoded in any component — import from here.

const PHONE_DISPLAY = '+40 757 656 989'; // human-readable (D-11)
const PHONE_TEL = '+40757656989'; // tel: form — keep the leading + (D-11)
const PHONE_WA = '40757656989'; // wa.me path — NO +, NO spaces (D-12)
const WA_MESSAGE = 'Bună ziua, sunt administrator de bloc și doresc o ofertă pentru renovarea scării de bloc.'; // D-12 — administrator-tailored prefill (CTA-01)
// Careers-tailored WhatsApp prefill for job applicants (CAR-01 / D-09) — same number, applicant framing.
const WA_CAREERS = 'Bună ziua, sunt interesat(ă) de un loc de muncă (zugrav-finisor) la Renovart Interiors.';

export const business = {
  name: 'Renovart Interiors', // REAL brand (D-10)
  phoneDisplay: PHONE_DISPLAY,
  telHref: `tel:${PHONE_TEL}`,
  whatsappHref: `https://wa.me/${PHONE_WA}?text=${encodeURIComponent(WA_MESSAGE)}`,
  // Careers WhatsApp link (CAR-01) — reuses the existing PHONE_WA; applicant-tailored message.
  whatsappCareersHref: `https://wa.me/${PHONE_WA}?text=${encodeURIComponent(WA_CAREERS)}`,
  // Real domain live 2026-07-04; CUI still a placeholder (owner to supply).
  // Email is the owner's Yahoo for now — may switch to a @renovart-interiors.ro address later.
  // Service-area business (no public storefront): NO street address is shown in the
  // footer/contact page or emitted in JSON-LD — location is expressed via serviceArea
  // + addressLocality (Cluj-Napoca) only.
  email: 'dr.sirbu_nicoleta@yahoo.com',
  hours: 'Luni–Vineri, 08:00–17:00',
  serviceArea: 'Cluj-Napoca și împrejurimi',
  cui: 'RO00000000',
  domain: 'https://renovart-interiors.ro',
  defaultDescription:
    'Renovarea profesională a scărilor de bloc în Cluj-Napoca.',
  // Placeholder OG image — a generated 1200x630 brand card lives at
  // public/og-default.png. LAUNCH CHECKLIST: replace with a real branded
  // before/after share image before handoff (WR-02 / IN-03).
  ogImage: '/og-default.png',
  // Agency that built the site — surfaced as the footer credit link and as the
  // WebSite node's `creator` in JSON-LD (schema.org provenance / AEO signal).
  builtBy: { name: 'Boring Technologies', url: 'https://boringtechnologies.com/' },
} as const;

// NOTE (Phase 5, CMS-03): the former `trust` const moved to the CMS-editable
// src/data/copy/trust.json (loaded via the `trustCopy` collection). The trust
// band's serviceArea value stays derived from business.serviceArea here so the
// NAP single-source (LAY-05) is not duplicated into the copy JSON.
// LAUNCH CHECKLIST: yearsExperience and worksCompleted in trust.json are
// conservative owner-supplied placeholders — confirm the real numbers with the
// client before handoff. Do NOT inflate.
