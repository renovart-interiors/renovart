// Single source for FAQ content (PAG-05) — consumed by BOTH the visible
// Faq.astro component AND faqPageSchema() in schema.ts, so the DOM and the
// FAQPage JSON-LD never drift.
//
// Five fixed administrator topics: garanție · deviz · termene · mod de plată ·
// zonă deservită. Each answer LEADS WITH THE DIRECT ANSWER in its first
// sentence (COP-02 AEO) and stays credible/no-hype. Full ro-RO diacritics.

export type FaqItem = { question: string; answer: string };

export const faq = [
  {
    question: 'Ce garanție oferiți pentru lucrări?',
    answer:
      'Oferim garanție scrisă pentru fiecare lucrare de renovare a scării de bloc, consemnată în procesul-verbal de predare. Durata și condițiile concrete se stabilesc în funcție de tipul lucrării (zugrăveli, reparații, instalații) și sunt trecute clar în deviz și în contract, astfel încât asociația să știe exact ce este acoperit.',
  },
  {
    question: 'Cum se face devizul?',
    answer:
      'Devizul este gratuit și se face după o evaluare la fața locului. Venim în scara de bloc, măsurăm și notăm starea reală, apoi întocmim un deviz detaliat, pe categorii de lucrări și materiale, fără costuri ascunse. Astfel administratorul și proprietarii văd transparent ce se execută și ce plătesc înainte de a începe.',
  },
  {
    question: 'Cât durează renovarea unei scări de bloc?',
    answer:
      'O renovare standard de scară de bloc durează în general între câteva zile și două-trei săptămâni, în funcție de numărul de etaje și de complexitatea lucrărilor. Termenul exact îl stabilim în deviz, cu etape clare, și îl respectăm; lucrăm organizat ca accesul locatarilor să fie afectat cât mai puțin.',
  },
  {
    question: 'Cum se face plata?',
    answer:
      'Plata se face etapizat, pe măsură ce lucrările avansează, nu integral în avans. Emitem factură și lucrăm pe baza unui contract cu asociația de proprietari, ceea ce ușurează decontul și evidența pentru administrator. Condițiile de plată sunt agreate dinainte și trecute în deviz.',
  },
  {
    question: 'În ce zonă lucrați?',
    answer:
      'Lucrăm în Cluj-Napoca și împrejurimi. Ne deplasăm pentru evaluare și execuție la blocurile din oraș și din localitățile învecinate; dacă nu sunteți sigur că vă încadrați în zonă, ne puteți suna sau scrie pe WhatsApp și confirmăm rapid.',
  },
] as const satisfies readonly FaqItem[];
