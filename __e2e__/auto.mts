import { writeFileSync } from 'fs';
import path, { dirname } from 'path';
import { chromium } from 'playwright';
import { fileURLToPath } from 'url';

const __dirname = path.join(dirname(fileURLToPath(import.meta.url)), 'output.txt');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const url = 'https://blog.naver.com/npjoa/223864729106';
  await page.goto(url, { waitUntil: 'networkidle' });

  const frame = page.frame({ name: 'mainFrame' }); // iframe 이름은 실제로 확인 필요
  if (!frame) {
    console.error('iframe을 찾을 수 없습니다.');
    await browser.close();
    return;
  }

  const title = await frame.locator('#post-view223864729106').textContent();

  writeFileSync(__dirname, title?.replace(/([\s]{2,}|\n)/g, '') ?? '');

  await browser.close();
})();
