import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 1024 } });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

// Find delivery section and scroll it into full view with more space
const deliveryEl = await page.$('#delivery');
if (deliveryEl) {
  await page.evaluate(el => {
    el.scrollIntoView({ block: 'center' });
  }, deliveryEl);
}

await page.waitForTimeout(1000);
await page.screenshot({ path: '.claude/skills/run-ala-eh-website/delivery-full.png', fullPage: false });
console.log('✓ Full delivery section screenshot saved');

await browser.close();
