import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '..', '__auth__', 'auth.json');

setup('authenticate', async ({ page }) => {
  await page.goto('https://example.com');

  await page.waitForTimeout(2000);

  await page.getByRole('textbox', { name: '아이디' }).click();
  await page.getByRole('textbox', { name: '아이디' }).fill(process.env.EMAIL ?? '');
  await page.getByRole('textbox', { name: '아이디' }).press('Tab');
  await page.getByRole('textbox', { name: '비밀번호' }).fill(process.env.PASSWORD ?? '');
  await page.getByRole('button', { name: '로그인' }).click();

  await page.waitForURL('https://example.com/projects?groupId=', { timeout: 60000 });
  await expect(page.getByText('Co., Ltd. All Right')).toBeVisible();

  await page.context().storageState({ path: authFile });
});
