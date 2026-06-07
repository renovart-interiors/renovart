// Single source for the service catalogue (PAG-02) — consumed by BOTH the
// Servicii page (visible blocks) AND serviceSchema()'s OfferCatalog in
// schema.ts, so the DOM and the Service JSON-LD never drift.
//
// Six fixed services. Each description is factual and scannable (COP-02),
// leading with what the service is. Full ro-RO diacritics. The optional `icon`
// key drives the inline-SVG glyph rendered on the Servicii page (Plan 03).

export type Service = { slug: string; title: string; description: string; icon?: string };

export const services = [
  {
    slug: 'zugraveli-vopsitorii',
    title: 'Zugrăveli și vopsitorii',
    description:
      'Zugrăvim și vopsim casa scării — pereți, tavane și elemente de lemn sau metal. Pregătim suportul (chituire, șlefuire, amorsare) și aplicăm finisaje rezistente, uniforme, alese împreună cu asociația.',
    icon: 'paint',
  },
  {
    slug: 'reparatii-trepte-podeste',
    title: 'Reparații trepte și podeste',
    description:
      'Reparăm treptele și podestele degradate, ciobite sau fisurate și refacem suprafețele de călcare. Readucem scara la o stare sigură și uniformă, eliminând neregularitățile care prezintă risc de împiedicare.',
    icon: 'stairs',
  },
  {
    slug: 'balustrade-mana-curenta',
    title: 'Balustrade și mână curentă',
    description:
      'Reparăm, fixăm sau înlocuim balustradele și mâna curentă, astfel încât să fie stabile și sigure pe toată înălțimea scării. Tratăm și finisăm elementele metalice împotriva ruginii.',
    icon: 'rail',
  },
  {
    slug: 'tamplarie-usi-acces',
    title: 'Tâmplărie și uși de acces',
    description:
      'Montăm și reparăm ușile de acces și tâmplăria casei scării. Reglăm închiderea, etanșarea și sistemele de închidere, pentru un acces controlat și o izolare mai bună.',
    icon: 'door',
  },
  {
    slug: 'instalatii-electrice-casa-scarii',
    title: 'Instalații electrice pe casa scării',
    description:
      'Refacem și completăm instalația electrică a casei scării — corpuri de iluminat, senzori și automate de scară, trasee și tablouri. Lucrările respectă normele în vigoare pentru un iluminat sigur și economic.',
    icon: 'bulb',
  },
  {
    slug: 'hidroizolatii',
    title: 'Hidroizolații',
    description:
      'Executăm hidroizolații pentru zonele afectate de infiltrații — terase, intrări și socluri ale casei scării. Oprim pătrunderea apei și protejăm finisajele nou refăcute de degradare prematură.',
    icon: 'shield',
  },
] as const satisfies readonly Service[];
