// Single source of truth for all NAP / contact data (LAY-05, D-15).
// No contact string may be hardcoded in any component — import from here.

const PHONE_DISPLAY = '+40 757 656 989'; // human-readable (D-11)
const PHONE_TEL = '+40757656989'; // tel: form — keep the leading + (D-11)
const PHONE_WA = '40757656989'; // wa.me path — NO +, NO spaces (D-12)
const WA_MESSAGE = 'Bună ziua, aș dori detalii despre renovarea scării de bloc.'; // D-12

export const business = {
  name: 'Renovart Interiors', // REAL brand (D-10)
  phoneDisplay: PHONE_DISPLAY,
  telHref: `tel:${PHONE_TEL}`,
  whatsappHref: `https://wa.me/${PHONE_WA}?text=${encodeURIComponent(WA_MESSAGE)}`,
  // Realistic Cluj-Napoca placeholders (D-13) — tracked on the launch/handoff checklist:
  email: 'contact@nume-firma.ro',
  address: 'Str. Exemplu nr. 10, Cluj-Napoca, Cluj',
  hours: 'Luni–Vineri, 08:00–17:00',
  serviceArea: 'Cluj-Napoca și împrejurimi',
  cui: 'RO00000000',
  domain: 'https://nume-firma.ro', // D-14 placeholder
  defaultDescription:
    'Renovarea profesională a scărilor de bloc în Cluj-Napoca.',
  // Placeholder OG image — a generated 1200x630 brand card lives at
  // public/og-default.png. LAUNCH CHECKLIST: replace with a real branded
  // before/after share image before handoff (WR-02 / IN-03).
  ogImage: '/og-default.png',
} as const;
