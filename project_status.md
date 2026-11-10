# Project status: abhijithkm.github.io

Last updated: Nov 10, 2026. This file is the handoff: read it first when continuing on another machine or in a new chat.

## What this is

Personal portfolio for Abhijith K M, a full-stack software engineer: https://abhijithkm.github.io.
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
| `feature/phone-stage` | Chosen design A (current work) | yes |
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

## Design: A, "phone stage" (on `feature/phone-stage`)

- Light cool "fog" theme with ink-navy text. `surface-*` tokens in `src/index.css` are remapped light.
- One pinned phone (`src/components/stage.tsx`) shows the selected Android app's screenshots; selecting an app (tap, or scrolling its row to the middle) re-tints the page with that app's `accent` colour (`--accent`, animated via `@property`).
- Home sections are ruled lists, not card grids. The career trail (study, work, shipped apps, oldest first) is kept.
- Skills section was refreshed from a scan of the owner's project folders (Mobile, Testing and Desktop groups added). Levels on new entries are guesses and may need adjusting.

## Current status

Done and pushed to `feature/phone-stage` (up to commit `9ea10c9`):
- ReadRhythm added to the Android apps list (also on `dev`, live).
- Monsoon redesign, then design A, then the skills refresh.

Done but NOT committed (working tree of `feature/phone-stage`, made by an agent, only partly verified):
- The non-home pages restyled to the light style: `/apps`, app detail, privacy, 404, shared app header, app card and image placeholder.
- The popups restyled to light: the Ctrl+K command palette and the screenshot lightbox. `.theme-night` CSS removed.
- Verified in the browser so far: app detail page, apps index (4 cards), 404.
- Still to verify: privacy page, command palette, lightbox, mobile width (375px), keyboard behaviour.

## What's left

1. Verify the uncommitted restyle (list above), fix anything off, then commit it on `feature/phone-stage`.
2. Owner decisions before anything goes live:
   - Confirm the current-employer line in `profile.ts` (it may be out of date).
   - Rename the "C# / .NET 8" skill (the work spans several .NET versions)?
   - Give Motora its own `accent` colour in `androidApps.json`.
   - Review the skill levels set on the new entries.
3. Cleanup: move the hard-coded component text into `profile.ts`; update the stale description in `index.html`.
4. When approved: open a PR from `feature/phone-stage`, then merge to `dev` to deploy.
5. Decide what to do with the unused design branches (keep, push, or delete).
6. Optional: add more projects to the Projects list (needs a live URL and an image per entry). The owner is also considering making some repos public; that review lives outside this repo.

## Running it locally

- `npm install`, then `npm run dev -- --port 3456 --strictPort` (port 5173 was blocked on the owner's Windows machine with EACCES).
- `.claude/launch.json` has a `dev` entry for the preview tooling.
- `npm run build:quick` (typecheck + build). `npm run build` also regenerates screenshots/OG image and prerenders (needs Chrome via Puppeteer).
- Extra worktrees for side-by-side design previews need a `node_modules` junction and a git-ignored `vite.config.local.ts` that allows the parent folder in `server.fs.allow`, otherwise fonts return 403.

## Tooling notes

- The shell tool fails on very long heredocs (keep each file under about 5 KB) and on the literal string `"--d"`.
- A GateGuard hook denies the first edit, write or destructive command per path: state the facts it asks for, then retry.

## Session history

- Nov 6, 2026: added ReadRhythm to the Android apps and pushed to `dev` (live).
- Nov 6 to 7, 2026: redesigned the site (Monsoon), then built alternatives A, B, C and a game-map idea (dropped). Chose A.
- Nov 7 to 10, 2026: pushed A, refreshed the skills section from the owner's project folders, restyled app pages and popups to match A (uncommitted), audited GitHub repos (outside this repo), wrote this file.
