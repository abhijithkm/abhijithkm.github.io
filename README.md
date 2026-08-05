# abhijithkm.github.io

Personal portfolio — React 19 + Vite + Tailwind 4, deployed to GitHub Pages via GitHub Actions (push to `dev`).

## Android app pages

Every Android app gets three URLs, all generated from **one data file**:

| URL | Purpose |
|---|---|
| `/apps/` | Index of all published Android apps |
| `/apps/<slug>/` | Detail page — screenshots, features, Play Store link |
| `/apps/<slug>/privacy/` | Privacy policy (use this URL in Google Play Console) |

### Adding a new app

1. **Add an entry** to [`src/data/androidApps.json`](src/data/androidApps.json) (copy an existing entry; the field shapes are documented in [`src/data/androidApps.ts`](src/data/androidApps.ts)). Pick a permanent, lowercase `slug`.
2. **Add assets** under `public/apps/<slug>/`: an `icon.png` (or `.svg`) and portrait screenshots (`1.png`, `2.png`, …), referenced from the JSON entry.
3. **Fill in the `privacy` block truthfully** — what data the app collects, its permissions, ad/analytics SDKs, and third-party services. The privacy page is rendered from this.
4. Preview with `npm run dev`, then push to `dev` to deploy.

The privacy policy URL for Play Console is:
`https://abhijithkm.github.io/apps/<slug>/privacy/`

### Sample entries

Entries flagged `"sample": true` render **only in dev** — they are excluded from
production builds and prerendering, so it's safe to push before you've replaced
them. To test the full production pipeline including samples:

```bash
VITE_INCLUDE_SAMPLES=1 npx vite build && PRERENDER_INCLUDE_SAMPLES=1 npm run prerender
```

### Prerendering

GitHub Pages serves a single-page app, so deep links would normally return
HTTP 404 (bad for SEO and rejected by Google Play's privacy-policy check).
`scripts/prerender.js` runs after `vite build` (locally via `npm run build`,
in CI as its own step) and writes real static HTML for every `/apps` route,
plus a `404.html` SPA fallback for everything else.

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
