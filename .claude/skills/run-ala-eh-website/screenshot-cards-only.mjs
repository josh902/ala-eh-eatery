import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

// Scroll down to show the cards (further down in the section)
await page.evaluate(() => {
  const el = document.getElementById('delivery');
  if (el) {
    const rect = el.getBoundingClientRect();
    window.scrollBy(0, rect.top + 400);
  }
});

await page.waitForTimeout(800);
await page.screenshot({ path: '.claude/skills/run-ala-eh-website/delivery-cards.png' });
console.log('✓ Delivery cards screenshot saved');

await browser.close();
