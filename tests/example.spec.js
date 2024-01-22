const { test, expect } = require('@playwright/test');

const crypto = require('node:crypto')

const email = process.env.EMAIL
const password = process.env.PASSWORD
const randomString = crypto.randomBytes(4).toString("hex")
const prefixedEmail = `${randomString}-${email}`

import { addressDetails, baseUrl } from '../environment';

test.beforeEach(async ({ page }) => {
  await page.goto(`${baseUrl}/?rp-allow-testing-04-on`);

  if (process.env.LOCALE == "ie") {
    await page.getByRole('row', { name: 'For delivery to ROI Over 10,' }).getByRole('link').click();
  }

  await page.goto(`${baseUrl}/?fusionx-pages-on`);
  await page.goto(`${baseUrl}/?ciam-enabled`);
  await page.goto(`${baseUrl}/checkout?fusionx-checkout-on`);
  await page.goto(`${baseUrl}/`);
  await page.frameLocator('iframe[name="trustarc_cm"]').getByRole('button', { name: 'Accept Cookies' }).click();
  await expect(page.getByText('Powered by FusionX')).toBeVisible()
});

test('Buy item using card', async ({ page }) => {
  await page.getByLabel('Your Account').click();
  await page.getByTestId('email').fill(email);
  await page.getByTestId('password').fill(password);
  await page.getByRole('button', { name: 'Sign in >' }).click();
  await page.getByLabel('Your Account').click();

  await page.goto(`${baseUrl}/p/bath-plug-chrome-chain-16-/31293`)
  await page.getByRole('button', { name: 'Delivery' }).click();
  await page.goto(`${baseUrl}/checkout`)
  
  await page.getByLabel('Select address 1').click();
  await page.getByText('Pay with Card').click();
  await page.locator('#wpwl-registrations iframe[name="card\\.cvv"]').click();
  await page.frameLocator('#wpwl-registrations iframe[name="card\\.cvv"]').getByPlaceholder('e.g.').fill('123');
  await page.getByRole('button', { name: 'Use this card' }).click();
  await page.getByRole('button', { name: 'Place order and pay' }).click();
  
  await expect(page.getByRole('heading', { name: 'Order Received' })).toBeVisible({ timeout: 30000 });
});

test('Create an account', async ({ page }) => {
  console.log(`Email: ${prefixedEmail}`)
  await page.getByLabel('Your Account').click();
  await page.getByRole('button', { name: 'Create an account >' }).click();
  await page.getByTestId('EMAIL').fill(prefixedEmail);
  await page.getByTestId('PASSWORD').fill(password);
  await page.getByTestId('Continue').click()
  await page.getByTestId('TITLE').selectOption('9')
  await page.getByTestId('FIRST NAME').click();
  await page.getByTestId('FIRST NAME').fill('Cave');
  await page.getByTestId('LAST NAME').fill('Man');
  await page.getByTestId('PROFESSION').selectOption('9');
  await page.getByPlaceholder(`Enter ${addressDetails.postcodeLabel} or address`).fill(addressDetails.postcode);
  await page.getByTestId('find').click();
  await page.getByTestId('address_search_results').selectOption(addressDetails.address);
  await page.getByTestId('button').click({delay: 500});
  await expect(page.getByText('Cave Man')).toBeVisible()
});