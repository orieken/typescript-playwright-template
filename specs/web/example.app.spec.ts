import { APIResponse, test } from '@playwright/test';

interface User {
  status: string;
  image: string;
  species: string;
  gender: string;
  name: string;
  id: number;
}

const MOCKED_USERS: User[] = [
  {
    status: 'Alive',
    image: 'https://rickandmortyapi.com/api/character/avatar/4.jpeg',
    species: 'Human',
    gender: 'Male',
    name: 'No One',
    id: 1,
  },
];

test.describe('api tests', () => {
  test('GET /character', async ({ request }) => {
    const characters: APIResponse = await request.get(`character`);
    console.log(await characters.json());
  });
});

test.describe('app tests', () => {
  test('Example App test not mocked', async ({ page }) => {
    await page.goto('https://affectionate-minsky-ed2e26.netlify.app/');
    await page.pause();
  });

  test('Example App test aborted', async ({ page }) => {
    // https://tranquil-harbor-61934.herokuapp.com/users
    await page.route('**/users', (route) => route.abort());
    await page.goto('https://affectionate-minsky-ed2e26.netlify.app/');
    await page.pause();
  });

  test('Example App test with mock payload', async ({ page }) => {
    // https://tranquil-harbor-61934.herokuapp.com/users
    await page.route('**/users', (route) => {
      route.fulfill({
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(MOCKED_USERS),
      });
    });
    await page.goto('https://affectionate-minsky-ed2e26.netlify.app/');
    await page.pause();
  });
});
