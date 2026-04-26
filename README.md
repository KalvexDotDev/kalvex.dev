# Kalvex HTML Website

Static bilingual website for Kalvex, an Icelandic technology consultancy focused on software quality assurance, AI quality guardrails, test automation and project management.

## Project

- Default language: Icelandic (`index.html`)
- English entry: `en.html`
- Styling: standalone CSS in `assets/css/custom.css`
- Homepage visual enhancement: subtle Vanta canvas in `assets/js/hero-vanta.js`
- Assets: `static/kalvex-logo.svg`, `static/favicon.svg`, `static/favicon.png` and `favicon.ico`
- No Svelte, Prismic, Tailwind, Vite or framework runtime
- Vanta is loaded only on the two homepage files and falls back to the static hero if scripts do not load

## Commands

```bash
npm run build
npm run check
npm run serve
```

`npm run build` regenerates the static pages from `tools/build-static-site.mjs`.

`npm run check` validates local HTML links and asset references.

`npm run serve` starts a small dependency-free static server at `http://localhost:4173`.

## CI/CD

GitHub Actions provides Vercel review-app style deployments:

- Pull requests run `.github/workflows/vercel-preview.yml`
- Pushes to `master` run `.github/workflows/vercel-production.yml`
- Lighthouse CI audits the deployed URL plus key Icelandic and English pages
- Preview workflows post or update a pull request comment with the Vercel URL and Lighthouse summary

Required repository secrets:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

## Pages

Icelandic:

- `index.html`
- `jonusta.html`
- `umbreyttu-rekstrin.html`
- `vottanir-og-vidbragd.html`
- `verkefnastjorun.html`
- `med-ther-i-lidi.html`
- `frettir-og-frasagnir.html`
- `takta-naesta-skref.html`

English:

- `en.html`
- `services.html`
- `software-development.html`
- `certifications-and-accreditations.html`
- `project-management.html`
- `with-you-on-your-side.html`
- `news-and-stories.html`
- `next-steps.html`
