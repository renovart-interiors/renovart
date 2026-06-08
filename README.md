# Renovart Interiors — site de prezentare

Static, mobile-first marketing site (Astro 6, TypeScript, `output: 'static'`) in
Romanian (ro-RO) for a Cluj-Napoca firm that renovates apartment-building
stairwells (*renovarea scărilor de bloc*). Zero/minimal client JS, before/after
portfolio as the centerpiece, content edited by the owner through Pages CMS.

This README is the developer handoff. The **non-technical owner** uses a separate
plain-Romanian guide: [`docs/GHID-CLIENT.md`](docs/GHID-CLIENT.md).

---

## Prerequisites

- **Node.js >= 22.12.0** — hard floor declared in `package.json` `engines`. Astro 6
  requires it, and CI (`withastro/action@v6`) runs on Node 22 — so use Node 22 LTS
  locally to match.
- npm (ships with Node).

---

## Local development

```bash
npm install      # install dependencies (once, and after pulling dependency changes)
npm run dev      # start the dev server (hot reload) at http://localhost:4321
```

---

## Build, typecheck & verify

```bash
npm run build    # production build → dist/ (the static site GH Pages serves)
npm run check    # astro check — TypeScript + template/schema diagnostics
npm run verify   # astro build + the dist/ gate (scripts/validate-jsonld.mjs)
```

`npm run verify` is the **repeatable quality gate**. It builds the site and then runs
the zero-dependency `dist/` validator, which asserts:

- the JSON-LD blocks are present and valid (Service / LocalBusiness / Breadcrumb);
- the Contact page ships **no `<form>`** (contact is phone + WhatsApp only);
- no placeholder/lorem text leaked into the built HTML;
- a `lucrari` image survives the CMS → `astro:assets` round-trip as **optimized
  AVIF/WebP with `srcset`** (the CMS-02 image smoke test, D-03);
- the **sitemap is emitted from the custom domain** (`nume-firma.ro`) and contains
  **no `github.io`** URL (SEO-06 / D-13).

Run `npm run verify` before every push to `main`. It is not a CI hard gate (see the
deploy note below) — it is the local guardrail.

---

## Deploy model

Deployment is **push-to-`main`**. The workflow at `.github/workflows/deploy.yml` uses:

- `actions/checkout@v6`
- `withastro/action@v6` — this single action **installs dependencies, runs
  `astro build`, AND uploads the Pages artifact** (it wraps `configure-pages` +
  `upload-pages-artifact` internally — do **not** add those as separate steps);
- `actions/deploy-pages@v5` — publishes the artifact to GitHub Pages.

**Pages CMS also commits straight to `main`**, so an owner content edit triggers the
same build + deploy automatically. Important consequences:

- A **failed build never takes the live site down** — GitHub Pages keeps serving the
  last good deploy, and edits are never blocked.
- But a failed build is a **silent no-op to the owner**: Pages CMS does not surface CI
  status. GitHub emails the **repo owner** when an Action fails. This is why the client
  guide tells the owner to *contact the developer if a change does not appear*, and why
  the CMS form keeps required fields minimal (D-08, D-10) so ordinary edits can't fail
  validation.

### One-time GitHub setting (must be done once on the real repo)

In the GitHub repo: **Settings → Pages → Build and deployment → Source = "GitHub Actions"**.
Without this, the workflow runs but nothing is published. It only needs to be set once.

### Cloudflare DNS note (do this correctly or SSL breaks)

DNS is on Cloudflare. The records pointing at GitHub Pages **must be grey-cloud /
DNS-only** — click the cloud icon so it is **grey, not orange**. Do **NOT** proxy
(orange-cloud) the GitHub Pages records: **GitHub manages the TLS certificate**, and
proxying through Cloudflare breaks the certificate handshake. Cloudflare is DNS-only
here; GitHub serves the site and its SSL.

---

## Pages CMS (owner content editing)

`.pages.yml` at the **repo root** is the Pages CMS form configuration. It exposes the
`lucrari` (projects) collection with Romanian field labels, the `featured` toggle, and
the before/after `pairs` + after-only `gallery` model. Images upload into
`src/assets/lucrari/` so `astro:assets` optimizes them on the next build.

The owner does **not** read this README — they use the plain-Romanian guide:
[`docs/GHID-CLIENT.md`](docs/GHID-CLIENT.md).

---

## Launch / placeholder checklist (D-15)

**This is the single gating list for go-live.** Every item below is a placeholder
shipped during development that MUST be swapped to real values before handoff. Nothing
goes live until all boxes are checked.

> **Swap these three together** — the domain appears in three files and a mismatch
> silently breaks the sitemap (Pitfall 5): `astro.config.mjs` `site`, `public/CNAME`,
> and the `Sitemap:` line in `public/robots.txt`.

### Domain (swap all three at once)

- [ ] `astro.config.mjs` — `site: 'https://nume-firma.ro'` → real domain
- [ ] `public/CNAME` — bare host `nume-firma.ro` → real bare host (no `https://`)
- [ ] `public/robots.txt` — `Sitemap: https://nume-firma.ro/sitemap-index.xml` → real
      domain (must match `site`; re-run `npm run verify` to confirm no `github.io` and
      the real host is present)

### Business identity — `src/data/business.ts`

- [ ] `name` — confirm the real brand (currently `Renovart Interiors`)
- [ ] `email` — `contact@nume-firma.ro` → real email
- [ ] `address` — `Str. Exemplu nr. 10, Cluj-Napoca, Cluj` → real address
- [ ] `hours` — `Luni–Vineri, 08:00–17:00` → real opening hours
- [ ] `serviceArea` — `Cluj-Napoca și împrejurimi` → real service area
- [ ] `cui` — `RO00000000` → real CUI
- [ ] confirm `phoneDisplay` / `phoneTel` / `phoneWA` are the real phone number
- [ ] **geo coordinates** — currently **omitted from the JSON-LD** (LocalBusiness has no
      `geo`); add real latitude/longitude when known so the LocalBusiness markup is complete

### Share image — `public/og-default.png`

- [ ] `business.ts` `ogImage` points at `/og-default.png` (placeholder generated card);
      replace `public/og-default.png` with a **real branded before/after share image**
      (1200×630)

### Trust stats — `src/data/business.ts` (`trust`)

- [ ] `yearsExperience` — `peste 10` → real, confirmed number (do NOT inflate)
- [ ] `worksCompleted` — `zeci de` → real, confirmed number

### Imagery — `src/assets/lucrari/`

- [ ] Replace the seed/demo project imagery with **real photos**. The Cluj project
      (`renovare-casa-scarii-cluj`, after-only gallery) ships real photos; the demo
      Mărăști project (`scara-bloc-demo-marasti`) is seed data — replace or remove it.

### Pre-launch verification

- [ ] **BLOCKING:** run one real Pages CMS upload and confirm the `/src/assets/lucrari/...`
      round-trip (A1) before launch — the owner adds or edits a `Lucrare` through Pages CMS,
      the written frontmatter path matches the `import.meta.glob` key, and the change appears
      live after the next build (this validates the full CMS → `astro:assets` → deploy path on
      the real repo). Deferred from Phase 4; the build-side invariant is already guaranteed by
      the D-03 smoke test (`npm run verify`), but the live round-trip must be exercised before go-live.
- [ ] `npm run verify` is green.
- [ ] One-time manual hardening pass recorded (Lighthouse 95+ mobile, WCAG AA contrast,
      keyboard nav, visible focus) — D-10/D-11. See `docs/` HUMAN-UAT steps; deferred from Phase 4.
