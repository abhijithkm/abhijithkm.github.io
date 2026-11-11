# Project status: abhijithkm.github.io

Last updated: Nov 11, 2026 (Motora live on Google Play). This file is the handoff: read it first when continuing on another machine or in a new chat.

## What this is

Personal portfolio for Abhijith K M, a full-stack software engineer: https://abhijithkm.space (custom domain; abhijithkm.github.io redirects to it).
A static React single-page app, deployed to GitHub Pages from the `dev` branch by GitHub Actions
(`.github/workflows/deploy.yml`: `tsc -b`, `vite build`, Puppeteer prerender of the `/apps` routes, publish `dist`).

- Stack: React 19, TypeScript 5.9, Vite 8, Tailwind 4, react-router 7, framer-motion, fuse.js (search).
- Fonts are self-hosted through `@fontsource` (Schibsted Grotesk, Instrument Sans, Geist Mono, plus Bricolage Grotesque and JetBrains Mono used by an older design).
- Routes: `/` (home), `/apps`, `/apps/:slug`, `/apps/:slug/privacy`, anything else is a 404.
  Android app pages are prerendered because Google Play needs the privacy URL to return HTTP 200.

## Branches and deploys (important)

- `dev` auto-deploys the LIVE site on every push. Never push to `dev` without the owner's approval.
- `master` and `gh-pages` are stale. `staging` and `site-improvements` exist on the remote and are old.
- Work happens on `feature/*` branches. Pushing a feature branch does not deploy.
- Commit identity for this repo is personal: `Abhijith KM <meabhijithkm@gmail.com>` (check `git config user.email` before committing; no Co-Authored-By trailer).

| Branch | What it is | On remote |
|---|---|---|
| `feature/phone-stage` | Design A. Merged to `dev` in PR #2 (merge commit `42e1da4`), live | yes |
| `feature/portfolio-redesign` | Design "Monsoon": dark green, career trail | yes |
| `feature/logbook` | Design B: ruled ledger | local only |
| `feature/datasheet` | Design C: blueprint datasheet | local only |

`feature/logbook` and `feature/datasheet` exist only on the machine they were built on. Push them if they must survive a migration.

## Where the content lives

Not in one file:
- `src/data/profile.ts`: name, tagline, bio, contact, skills, jobs, education, achievements, nav links, social links.
- `src/data/androidApps.json`: all Android apps (text, features, privacy policy). `androidApps.ts` holds the types and helpers.
- `src/data/hobbyApps.ts`: the web projects list.
- `public/`: app icons and screenshots (`public/apps/<slug>/`), project images (`public/projects/hobby/`), `resume.pdf`.
- Some copy is written inside components (Hero blurb, section titles, Contact text). `index.html` has page meta (its share description is out of date).
- Adding an Android app: see `README.md` (JSON entry plus assets under `public/apps/<slug>/`).

## Design: A, "phone stage" (live; source branch `feature/phone-stage`)

- Light cool "fog" theme with ink-navy text. `surface-*` tokens in `src/index.css` are remapped light.
- One pinned phone (`src/components/stage.tsx`) shows the selected Android app's screenshots; selecting an app (tap, or scrolling its row to the middle) re-tints the page with that app's `accent` colour (`--accent`, animated via `@property`).
- Home sections are ruled lists, not card grids. The career trail (study, work, shipped apps, oldest first) is kept.
- Skills section was refreshed from a scan of the owner's project folders (Mobile, Testing and Desktop groups added). Levels on new entries are guesses and may need adjusting.

## Current status

Design A is merged to `dev` (PR #2, Nov 10, 2026) and live. The deploy workflow for `42e1da4` finished successfully.

Checked on the live site (desktop): home renders, the phone stage lists Motora, TinySteps, Fuel Tracker and ReadRhythm, the three fonts load, and `/resume.pdf` and the app privacy URLs return 200 (the four privacy pages are prerendered with their text). An unknown path returns a real 404.

Before merging, in the local build: every route had no horizontal overflow at 375px; the Ctrl+K palette (search, arrows, Esc) and the screenshot lightbox (arrows, Esc) work in the light style.

Not checked: the live app pages at phone width, Tab order and screen-reader behaviour of the dialogs (the lightbox has no real focus trap).

Known quirk: if one script chunk fails to load (seen once as a network error), the SPA stays blank until a reload; there is no retry.

## What's left

1. Owner decisions:
   - Confirm the current-employer line in `profile.ts` (it may be out of date; the hero repeats it).
   - Rename the "C# / .NET 8" skill (the work spans several .NET versions)?
   - Give Motora its own `accent` colour in `androidApps.json`.
   - Review the skill levels set on the new entries.
2. Cleanup: move the hard-coded component text into `profile.ts`; update the stale share description in `index.html`.
3. Use the `abhijithkm.space` privacy URLs in Play Console (the github.io ones add a 301 before the 200).
4. Add `robots.txt` and a sitemap (both return 404 today).
5. Decide what to do with the unused design branches (keep, push `feature/logbook` and `feature/datasheet`, or delete).
6. Optional: add more projects to the Projects list (needs a live URL and an image per entry). The owner is also considering making some repos public; that review lives outside this repo.

## Running it locally

- `npm install`, then `npm run dev -- --port 3456 --strictPort` (port 5173 was blocked on the owner's Windows machine with EACCES).
- A local `.claude/launch.json` (not committed) holds a `dev` entry for the preview tooling; recreate it if missing.
- `npm run build:quick` (typecheck + build). `npm run build` also regenerates screenshots/OG image and prerenders (needs Chrome via Puppeteer).
- Extra worktrees for side-by-side design previews need a `node_modules` junction and a git-ignored `vite.config.local.ts` that allows the parent folder in `server.fs.allow`, otherwise fonts return 403.

## Tooling notes

- The shell tool fails on very long heredocs (keep each file under about 5 KB) and on the literal string `"--d"`.
- A GateGuard hook denies the first edit, write or destructive command per path: state the facts it asks for, then retry.

## Session history

- Nov 6, 2026: added ReadRhythm to the Android apps and pushed to `dev` (live).
- Nov 6 to 7, 2026: redesigned the site (Monsoon), then built alternatives A, B, C and a game-map idea (dropped). Chose A.
- Nov 7 to 10, 2026: pushed A, refreshed the skills section from the owner's project folders, restyled app pages and popups to match A, audited GitHub repos (outside this repo), wrote this file, verified and committed the restyle.
- Nov 10, 2026: opened and merged PR #2 (design A to `dev`), checked the live site on `abhijithkm.space`, updated this file through a PR.
- Nov 11, 2026: Motora went live on Google Play; set its `playStoreUrl` in `androidApps.json` (the site now shows 4 live apps). The Play Console also lists Price Calculator, PregApp and Panam, which are not on the site yet.
