import puppeteer from "puppeteer";
import { mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = resolve(__dirname, "../public/projects/hobby");

const apps = [
  { name: "capture", url: "https://capture-akm.vercel.app/" },
  { name: "dev-toolbox", url: "https://dev-toolbox-xi.vercel.app/" },
  { name: "page-flow", url: "https://page-flow-v2.vercel.app/" },
  { name: "schema-visualizer", url: "https://schema-visualizer-nu.vercel.app/" },
  { name: "chrono", url: "https://chrono-five.vercel.app/" },
  { name: "json-generator", url: "https://json-generator-chi.vercel.app/" },
  { name: "sudoku", url: "https://sudoku-studio.vercel.app/" },
  { name: "read-rhythm", url: "https://read-rhythm.vercel.app/" },
];

async function generateScreenshots() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  console.log(`\n📸 Generating screenshots for ${apps.length} apps...\n`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  let success = 0;
  let failed = 0;

  for (const app of apps) {
    const outputPath = resolve(OUTPUT_DIR, `${app.name}.png`);
    try {
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 800 });
      await page.goto(app.url, {
        waitUntil: "networkidle2",
        timeout: 30000,
      });
      // Extra wait for JS-rendered content
      await new Promise((r) => setTimeout(r, 2000));
      await page.screenshot({ path: outputPath, type: "png" });
      await page.close();
      console.log(`  ✔ ${app.name} → ${app.name}.png`);
      success++;
    } catch (err) {
      console.error(`  ✖ ${app.name} — ${err.message}`);
      failed++;
    }
  }

  await browser.close();

  console.log(`\n✅ Done: ${success} captured, ${failed} failed\n`);
}

generateScreenshots();
