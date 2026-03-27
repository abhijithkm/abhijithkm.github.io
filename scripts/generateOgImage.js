import puppeteer from "puppeteer";
import { writeFile, mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT = resolve(__dirname, "../public/og-image.png");

const html = `<!DOCTYPE html>
<html>
<head>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px;
    background: #020617;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Inter', system-ui, sans-serif;
    overflow: hidden; position: relative;
  }
  .orb1 { position: absolute; top: -120px; left: -100px; width: 500px; height: 500px; border-radius: 50%; background: rgba(99,102,241,0.15); filter: blur(120px); }
  .orb2 { position: absolute; bottom: -120px; right: -100px; width: 400px; height: 400px; border-radius: 50%; background: rgba(167,139,250,0.1); filter: blur(120px); }
  .content { position: relative; z-index: 1; text-align: center; }
  .name {
    font-size: 64px; font-weight: 800; letter-spacing: -1px;
    background: linear-gradient(135deg, #818cf8, #a78bfa, #22d3ee);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }
  .role { margin-top: 16px; font-size: 24px; color: rgba(248,250,252,0.4); text-transform: uppercase; letter-spacing: 6px; font-weight: 600; }
  .desc { margin-top: 24px; font-size: 18px; color: rgba(248,250,252,0.35); max-width: 700px; line-height: 1.6; }
  .url { margin-top: 32px; font-size: 14px; color: rgba(248,250,252,0.2); letter-spacing: 1px; }
</style>
</head>
<body>
  <div class="orb1"></div>
  <div class="orb2"></div>
  <div class="content">
    <div class="name">Abhijith K M</div>
    <div class="role">Frontend Engineer</div>
    <div class="desc">React · TypeScript · Modern UI Architecture · Scalable Web Applications</div>
    <div class="url">abhijithkm.github.io</div>
  </div>
</body>
</html>`;

async function generate() {
  console.log("\n🖼️  Generating OG image...\n");
  const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630 });
  await page.setContent(html, { waitUntil: "load" });
  await page.screenshot({ path: OUTPUT, type: "png" });
  await browser.close();
  console.log("  ✔ og-image.png generated\n");
}

generate();
