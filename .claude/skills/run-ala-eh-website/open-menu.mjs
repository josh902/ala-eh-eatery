import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

// Click menu button
await page.click('[aria-label="Open menu"]');
await page.waitForTimeout(600);

// Screenshot
await page.screenshot({ path: '.claude/skills/run-ala-eh-website/screenshot-menu-open.png' });
console.log('✓ Menu open screenshot saved');

await browser.close();
