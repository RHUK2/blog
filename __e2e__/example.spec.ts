import { test } from '@playwright/test';

test('프로젝트 생성', async ({ page }) => {
  await page.goto('https://mchecker.wecruitpro.com/projects?groupId=');
  await page.getByRole('button', { name: '후보자 프로젝트 생성' }).click();
  await page.waitForURL('https://mchecker.wecruitpro.com/projects/add?groupId=');
  await page.getByRole('textbox', { name: '공백 포함 24자 이내로 입력해 주세요' }).click();
  await page.getByRole('textbox', { name: '공백 포함 24자 이내로 입력해 주세요' }).fill('후보자124');
  await page.locator('input[name="email"]').click();
  await page.locator('input[name="email"]').fill('gusdnr814@naver.com');
  await page.getByRole('button', { name: '담당자를 선택해주세요' }).click();
  await page.getByRole('option', { name: '류욱현' }).click();
  await page.getByRole('button', { name: '진단지를 선택해주세요' }).click();
  await page.getByRole('option', { name: '[테스트] 진단지' }).click();
  await page
    .getByText('프로젝트 즉시 진행 (* 아래 [프로젝트 등록하기] 버튼을 누르면 후보자에게 즉시 메일이 발송됩니다.)')
    .click();
  await page
    .getByText(
      '개인정보보호법 및 체커 개인정보 수집 및 이용 동의 약관에 따라 후보자의 개인정보를 체커 사이트에 등록하기 전 후보자 본인에게 미리 동의를 받으',
    )
    .click();
  // await page.getByRole('button', { name: '프로젝트 등록하기' }).click();
});
