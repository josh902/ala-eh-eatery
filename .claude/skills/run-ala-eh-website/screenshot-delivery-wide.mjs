import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

// Scroll to delivery section
const deliveryEl = await page.$('#delivery');
if (deliveryEl) {
  await page.evaluate(el => {
    el.scrollIntoView({ block: 'center' });
  }, deliveryEl);
}

await page.waitForTimeout(800);
await page.screenshot({ path: '.claude/skills/run-ala-eh-website/delivery-wide.png' });
console.log('✓ Wide delivery section screenshot saved');

await browser.close();
