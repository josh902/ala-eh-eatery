#!/usr/bin/env node
// Driver for ala-eh-website. Run from project root or skill dir.
// Usage:
//   node .claude/skills/run-ala-eh-website/driver.mjs [smoke|screenshot <section>|mobile]
//
// Sections: home, about, menu, gallery, testimonials, reserve, location

import { chromium } from './node_modules/playwright/index.mjs';
import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

const SECTION_SELECTORS = {
  home:          '#home, [data-section="home"], nav',
  about:         '#about, [data-section="about"]',
  menu:          '#menu, [data-section="menu"]',
  gallery:       '#gallery, [data-section="gallery"]',
  testimonials:  '#testimonials, [data-section="testimonials"]',
  reserve:       '#reserve, [data-section="reserve"], #reservation',
  location:      '#location, [data-section="location"]',
};

async function findPort() {
  for (const port of [3000, 3001]) {
    try {
      const { default: http } = await import('http');
      await new Promise((resolve, reject) => {
        const req = http.get(`http://localhost:${port}/`, (res) => {
          res.resume();
          resolve(res.statusCode);
        });
        req.on('error', reject);
        req.setTimeout(2000, () => { req.destroy(); reject(new Error('timeout')); });
      });
      return port;
    } catch {
      // try next port
    }
  }
  throw new Error('No dev server found on port 3000 or 3001. Run: npm run dev');
}

async function smoke(page, baseUrl, outDir) {
  await page.goto(baseUrl, { waitUntil: 'networkidle' });
  const title = await page.title();
  if (!title.includes('Ala Eh')) throw new Error(`Unexpected title: ${title}`);
  const heading = await page.locator('h1, h2').first().textContent();
  console.log(`✓ Title: ${title}`);
  console.log(`✓ Heading: ${heading?.trim()}`);
  const navLinks = await page.locator('nav a').allTextContents();
  console.log(`✓ Nav: ${navLinks.map(t => t.trim()).filter(Boolean).join(', ')}`);
  const outPath = path.join(outDir, 'screenshot-hero.png');
  await page.screenshot({ path: outPath, fullPage: false });
  console.log(`✓ Screenshot → ${outPath}`);
}

async function screenshotSection(page, baseUrl, section, outDir) {
  const selector = SECTION_SELECTORS[section];
  if (!selector) {
    console.error(`Unknown section: "${section}". Available: ${Object.keys(SECTION_SELECTORS).join(', ')}`);
    process.exit(1);
  }
  await page.goto(baseUrl, { waitUntil: 'networkidle' });
  // Try to scroll to the section element, fall back to nav link click
  const locator = page.locator(selector).first();
  const count = await locator.count().catch(() => 0);
  if (count > 0) {
    await locator.scrollIntoViewIfNeeded().catch(() => {});
  } else {
    // Click nav link
    await page.locator(`nav a[href*="${section}"]`).first().click().catch(() => {});
  }
  await page.waitForTimeout(600);
  const outPath = path.join(outDir, `screenshot-${section}.png`);
  await page.screenshot({ path: outPath });
  console.log(`✓ Screenshot → ${outPath}`);
}

async function mobile(page, baseUrl, outDir) {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(baseUrl, { waitUntil: 'networkidle' });
  const outPath = path.join(outDir, 'screenshot-mobile.png');
  await page.screenshot({ path: outPath, fullPage: false });
  console.log(`✓ Mobile screenshot (375×812) → ${outPath}`);
}

const [,, cmd, arg] = process.argv;
const outDir = __dirname;

let port;
try {
  port = await findPort();
  console.log(`✓ Dev server on port ${port}`);
} catch (e) {
  console.error(e.message);
  process.exit(1);
}

const baseUrl = `http://localhost:${port}`;
const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1280, height: 800 });

try {
  if (!cmd || cmd === 'smoke') {
    await smoke(page, baseUrl, outDir);
  } else if (cmd === 'screenshot') {
    if (!arg) { console.error('Usage: driver.mjs screenshot <section>'); process.exit(1); }
    await screenshotSection(page, baseUrl, arg, outDir);
  } else if (cmd === 'mobile') {
    await mobile(page, baseUrl, outDir);
  } else {
    console.error(`Unknown command: ${cmd}. Try: smoke | screenshot <section> | mobile`);
    process.exit(1);
  }
} finally {
  await browser.close();
}
