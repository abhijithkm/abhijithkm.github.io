# Project Status — abhijithkm.space (Personal Portfolio)

> **Purpose of this file:** single source of truth for project state so work can continue
> from any machine or chat session. **Always update this file when making changes.**
> Last updated: 2026-07-17 (evening)

## Project Overview

Personal portfolio site for Abhijith K M — Full-Stack Software Engineer, Kerala, India.

- **Live URL:** https://abhijithkm.space/
- **Repo:** https://github.com/abhijithkm/abhijithkm.github.io
- **Stack:** React 19 + TypeScript + Vite 8, Tailwind CSS v4, framer-motion, three.js (@react-three/fiber), lucide-react
- **Hosting:** GitHub Pages with custom domain

## Critical: Branch & Deployment Layout

| Branch | Role |
|--------|------|
| `dev` | **REAL source of the live site.** Push here = auto-deploy via `.github/workflows/deploy.yml` (actions/deploy-pages) |
| `site-improvements` | Current working branch (created from `dev`, July 2026). Contains unmerged fixes |
| `master` | STALE — abandoned CRA rewrite. Do NOT work here |
| `gh-pages` | STALE — old deploy method, no longer served |
| `staging` | Old, unused |

**Never edit master/gh-pages expecting live changes.** Deployment = merge to `dev`, GitHub Actions builds (`tsc -b && vite build`) and publishes `dist/`.

**RULE: never merge/push to `dev` without explicit owner approval** — dev auto-deploys production. Work on feature branches; owner merges when ready.

## Site Structure

Single-page app. Sections rendered in `src/App.tsx` (most lazy-loaded):
Hero (3D particle field + terminal animation) → ImpactMetrics → About → HobbyApps (12 apps at subdomains, e.g. schema.abhijithkm.space) → Skills → Experience → Achievements → Education → ResumeSummary → Contact. Plus AIChat (keyword bot), CommandPalette (Ctrl+K), 3-theme switcher (dark/cyberpunk/minimal).

- Content data: `src/data/profile.ts`, `src/data/hobbyApps.ts`
- Static assets: `public/` (hobby app screenshots, og-image, resume.pdf)
- Screenshot/OG generation scripts: `scripts/` (puppeteer, dev-time only)

## Current Status

`site-improvements` branch pushed, commit `5309ba3`, **not yet merged to dev / not live**.

### Done in this branch (July 2026)
- [x] Fixed broken resume link — added `public/resume.pdf` (was 404 in production)
- [x] Contact form actually sends now — FormSubmit AJAX (`formsubmit.co/ajax/meabhijithkm@gmail.com`) with sending/sent/error states + mailto fallback (was fake success before)
- [x] SEO: canonical/og:url/og:image/twitter:image now point to abhijithkm.space (were abhijithkm.github.io)
- [x] Added JSON-LD Person schema, `robots.txt`, `sitemap.xml`, `404.html` (redirects to /)
- [x] Reduced motion support: MotionConfig reducedMotion="user"; ParticleField skips render
- [x] Theme menu closes on outside click / Escape
- [x] puppeteer moved to devDependencies
- [x] Build + typecheck verified locally
- [x] Replaced outdated resume with new Full-Stack version in `public/resume.pdf` (link `/resume.pdf` unchanged, already correct)
- [x] **DEPLOYED (2026-07-18, owner-approved):** resume.pdf cherry-picked onto `dev` (commit `dddcdfb`) — live /resume.pdf now 200. Rest of branch still unmerged

## What's Left / TODO

1. **Merge `site-improvements` → `dev`** to deploy remaining fixes — contact form, SEO, a11y (PR: https://github.com/abhijithkm/abhijithkm.github.io/pull/new/site-improvements). Owner merges; resume.pdf already on dev (same content, merges clean)
2. **FormSubmit activation** (owner action): after deploy, submit form once; FormSubmit emails meabhijithkm@gmail.com one-time confirmation link — must click or messages won't deliver
3. **Profile photo missing**: About section wants `public/profile.jpg` — currently shows initials fallback. Drop photo in `public/`
4. **Dependabot: 17 vulnerabilities** on default branch (1 critical, 2 high) — https://github.com/abhijithkm/abhijithkm.github.io/security/dependabot
5. **`Projects.tsx` never rendered**: professional projects (KGOA, feedback software) exist as component + data but missing from App.tsx; referenced images `/projects/kgoa.png`, `/projects/feedback.png` don't exist in public/
6. Optional: default branch on GitHub is `master` (stale) — consider switching default to `dev`

## Dev Commands

```sh
npm install
npm run dev          # dev server
npm run build:quick  # tsc -b && vite build (no screenshot regen)
npm run build        # regenerates screenshots/OG via puppeteer, then builds
npx vite preview --port 4173
```

## Session History

- **2026-07-17:** Mistakenly redesigned stale `master` + pushed old `gh-pages` (no live effect — Pages serves from Actions). Learned branch layout. Created `site-improvements` from `dev`, fixed resume 404, contact form, SEO, a11y. Pushed.
