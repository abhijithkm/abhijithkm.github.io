/**
 * Prerenders the /apps routes into real static HTML files inside dist/,
 * so GitHub Pages serves them with HTTP 200 (required for Google Play
 * privacy-policy URLs, and good for SEO). Run AFTER `vite build`.
 *
 * Also writes dist/404.html (copy of index.html) so any non-prerendered
 * deep link still loads the SPA client-side.
 *
 * Sample apps ("sample": true) are skipped unless PRERENDER_INCLUDE_SAMPLES=1.
 */
import puppeteer from "puppeteer";
import { preview } from "vite";
import { readFile, writeFile, mkdir, copyFile, access } from "node:fs/promises";
import { resolve, join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const DIST = resolve(ROOT, "dist");

async function main() {
  try {
    await access(join(DIST, "index.html"));
  } catch {
    console.error("✖ dist/index.html not found — run `vite build` first.");
    process.exit(1);
  }

  // SPA fallback for client-side routing on GitHub Pages
  await copyFile(join(DIST, "index.html"), join(DIST, "404.html"));
  console.log("  ✔ dist/404.html (SPA fallback)");

  const includeSamples = process.env.PRERENDER_INCLUDE_SAMPLES === "1";
  const allApps = JSON.parse(
    await readFile(resolve(ROOT, "src/data/androidApps.json"), "utf8")
  );
  const apps = allApps.filter((a) => includeSamples || !a.sample);

  if (apps.length === 0) {
    console.log(
      "  ℹ No published Android apps in androidApps.json — skipping prerender."
    );
    return;
  }

  const routes = ["/apps/"];
  for (const app of apps) {
    routes.push(`/apps/${app.slug}/`, `/apps/${app.slug}/privacy/`);
  }

  console.log(`\n🖨  Prerendering ${routes.length} routes...\n`);

  const server = await preview({
    root: ROOT,
    preview: { port: 4173, strictPort: false },
  });
  const baseUrl = server.resolvedUrls.local[0].replace(/\/$/, "");

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  let failed = 0;
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });

    for (const route of routes) {
      try {
        await page.goto(baseUrl + route, {
          waitUntil: "networkidle2",
          timeout: 30000,
        });
        // Let lazy chunks render and entry animations settle
        await new Promise((r) => setTimeout(r, 800));
        const html = await page.evaluate(
          () => "<!DOCTYPE html>" + document.documentElement.outerHTML
        );
        const outDir = join(DIST, route);
        await mkdir(outDir, { recursive: true });
        await writeFile(join(outDir, "index.html"), html);
        console.log(`  ✔ ${route}`);
      } catch (err) {
        failed++;
        console.error(`  ✖ ${route} — ${err.message}`);
      }
    }
  } finally {
    await browser.close();
    await server.close();
  }

  if (failed > 0) {
    console.error(`\n✖ ${failed} route(s) failed to prerender.`);
    process.exit(1);
  }
  console.log(`\n✅ Prerendered ${routes.length} routes into dist/\n`);
}

main();
