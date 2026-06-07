import puppeteer from "puppeteer";
import { mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = resolve(__dirname, "../public/projects/hobby");

const apps = [
  { name: "schema-visualizer", url: "https://schema.abhijithkm.space" },
  { name: "capture", url: "https://capture.abhijithkm.space" },
  { name: "cardamom-app", url: "https://cardamom-app.abhijithkm.space" },
  { name: "chrono", url: "https://chrono.abhijithkm.space" },
  { name: "chuttum", url: "https://chuttum.abhijithkm.space" },
  { name: "dev-toolbox", url: "https://tools.abhijithkm.space" },
  { name: "ballotrix", url: "https://ballotrix.abhijithkm.space" },
  { name: "festcape", url: "https://festcape.abhijithkm.space" },
  { name: "json-generator", url: "https://json.abhijithkm.space" },
  { name: "page-flow", url: "https://pageflow.abhijithkm.space" },
  { name: "read-rhythm", url: "https://read.abhijithkm.space" },
  { name: "sudoku", url: "https://sudoku.abhijithkm.space" },
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
