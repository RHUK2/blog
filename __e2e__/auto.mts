import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ locale: 'ko', timezoneId: 'Asia/Seoul' });
  await page.goto('https://mchecker.wecruitpro.com');
  await page.waitForTimeout(5000);
  await browser.close();
})();
