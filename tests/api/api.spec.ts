import { test, expect } from '@playwright/test';
import { getAPIRacingInfo,getGameInfo } from '../utils/InfoAPI';

test('Validate API response status is 200', async ({ request }) => {
  const response = await getAPIRacingInfo(request,'V75');
  expect(response.status()).toBe(200);
});

test('Validate response structure for "products" endpoint', async ({ request }) => {
  const response = await getAPIRacingInfo(request, 'V75');
  const data = await response.json();

  expect(data).toHaveProperty('betType');
  expect(data).toHaveProperty('upcoming');
  expect(data).toHaveProperty('results');
});


test('Validate bet type matches in "products" response', async ({ request }) => {
  const betType = 'V75';
  const response = await getAPIRacingInfo(request, betType);
  const data = await response.json();

  expect(data.betType).toBe(betType);
});


test('Validate response structure for "product" endpoint', async ({ request }) => {
    const response = await getGameInfo(request, 'V75_2021-02-13_6_5');

    expect(response.status()).toBe(200);
  
  });

