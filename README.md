# Kalvex HTML Website

Static bilingual website for Kalvex, an Icelandic technology consultancy focused on software quality assurance, AI quality guardrails, test automation and project management.

## Project

- Default language: Icelandic (`index.html`)
- English entry: `en.html`
- Styling: standalone CSS in `assets/css/custom.css`
- Homepage visual enhancement: subtle Vanta canvas in `assets/js/hero-vanta.js`
- Build output: generated static site in `output/`
- Assets: `static/kalvex-logo.svg`, `static/favicon.svg`, `static/favicon.png` and `favicon.ico`
- Custom domain for GitHub Pages: `CNAME`
- No Svelte, Prismic, Tailwind, Vite or framework runtime
- Vanta is loaded only on the two homepage files and falls back to the static hero if scripts do not load

## Commands

```bash
npm run build
npm run check
npm run serve
```

`npm run build` regenerates the static pages from `tools/build-static-site.mjs` and copies all deployable assets into `output/`.

`npm run check` validates local HTML links and asset references inside `output/`.

`npm run serve` starts a small dependency-free static server from `output/` at `http://localhost:4173`.

## Deployment

The site is portable static HTML. Use these settings with any static host:

- Build command: `npm run build`
- Output directory: `output`
- Install command: none required

## CI/CD

GitHub Actions builds and validates the static site without a hosting-provider dependency:

- Pull requests and pushes to `master` run `.github/workflows/static-site.yml`
- The workflow builds `output/`, validates internal links and assets, and uploads the static site as an artifact
- Lighthouse CI audits a local server started from `output/`
- Pushes to `master` deploy `output/` to GitHub Pages

For production deployment, configure the repository's Pages source to **GitHub Actions**. The generated `output/` directory includes `CNAME` for `kalvex.dev` and a `.nojekyll` marker.

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
