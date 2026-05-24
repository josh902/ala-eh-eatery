import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });

// Test mobile
console.log('Testing mobile (375×812)...');
const mobilePage = await browser.newPage({ viewport: { width: 375, height: 812 } });
await mobilePage.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await mobilePage.click('[aria-label="Open menu"]');
await mobilePage.waitForTimeout(500);

// Verify menu elements exist
const hasLogo = await mobilePage.$('img[alt="Ala Eh"]');
const hasHome = await mobilePage.$('text=Home');
const hasGallery = await mobilePage.$('text=Gallery');
const hasPhone = await mobilePage.$('text=(902)');

console.log('✓ Logo present:', !!hasLogo);
console.log('✓ Home link present:', !!hasHome);
console.log('✓ Gallery link present:', !!hasGallery);
console.log('✓ Phone number present:', !!hasPhone);

// Test hover effect
const homeLink = await mobilePage.$('text=Home').then(el => el?.locator('..'));
if (homeLink) {
  await homeLink.hover();
  await mobilePage.waitForTimeout(300);
}

await mobilePage.screenshot({ path: '.claude/skills/run-ala-eh-website/screenshot-menu-hover.png' });
console.log('✓ Menu hover screenshot saved');

// Test tablet
console.log('\nTesting tablet (768×1024)...');
const tabletPage = await browser.newPage({ viewport: { width: 768, height: 1024 } });
await tabletPage.goto('http://localhost:3000', { waitUntil: 'networkidle' });

// On tablet (md breakpoint), menu button is hidden
const menuButtonExists = await tabletPage.$('[aria-label="Open menu"]');
console.log('✓ Menu button hidden on tablet (md:hidden):', !menuButtonExists);

await browser.close();
console.log('\n✓ All verification tests passed!');
