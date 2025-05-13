import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '..', '__auth__', 'auth.json');

setup('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto('https://mchecker.wecruitpro.com/');

  await page.waitForTimeout(2000);

  await page.getByRole('textbox', { name: '아이디' }).click();
  await page.getByRole('textbox', { name: '아이디' }).fill('huryu@wecruitcorp.com');
  await page.getByRole('textbox', { name: '아이디' }).press('Tab');
  await page.getByRole('textbox', { name: '비밀번호' }).fill('test1004!');
  await page.getByRole('button', { name: '로그인' }).click();
  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL('https://mchecker.wecruitpro.com/projects?groupId=', { timeout: 60000 });
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  await expect(page.getByText('© WECRUIT Co., Ltd. All Right')).toBeVisible();

  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});
