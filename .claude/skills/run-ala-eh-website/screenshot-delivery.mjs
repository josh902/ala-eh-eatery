import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });

// Desktop screenshot
console.log('📸 Taking desktop screenshot...');
const desktopPage = await browser.newPage({ viewport: { width: 1280, height: 1024 } });
await desktopPage.goto('http://localhost:3000', { waitUntil: 'networkidle' });

// Scroll to delivery section
await desktopPage.evaluate(() => {
  const el = document.getElementById('delivery');
  if (el) el.scrollIntoView();
});
await desktopPage.waitForTimeout(800);
await desktopPage.screenshot({ path: '.claude/skills/run-ala-eh-website/delivery-desktop.png' });
console.log('✓ Desktop screenshot saved');

// Mobile screenshot
console.log('📱 Taking mobile screenshot...');
const mobilePage = await browser.newPage({ viewport: { width: 375, height: 812 } });
await mobilePage.goto('http://localhost:3000', { waitUntil: 'networkidle' });

// Scroll to delivery section
await mobilePage.evaluate(() => {
  const el = document.getElementById('delivery');
  if (el) el.scrollIntoView();
});
await mobilePage.waitForTimeout(800);
await mobilePage.screenshot({ path: '.claude/skills/run-ala-eh-website/delivery-mobile.png' });
console.log('✓ Mobile screenshot saved');

await browser.close();
console.log('✅ Screenshots complete!');
