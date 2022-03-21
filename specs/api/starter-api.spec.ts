import { APIResponse, expect, test } from '@playwright/test';

test('GET /character', async ({ request }) => {
  const characters: APIResponse = await request.get(`character`);
  expect(characters.ok()).toBeTruthy();
});
