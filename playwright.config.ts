import { PlaywrightTestConfig, devices, ReporterDescription } from '@playwright/test';

type TestGroups = 'api' | 'web';
type LiteralUnion<T extends U, U = string> = T | (U & { zz_IGNORE_ME?: never });
const testGroups: Record<TestGroups, string> = {
  api: 'api',
  web: 'web',
};

function getTestGroup(): string {
  if (!process.env.TEST_GROUP) {
    return 'web';
  }
  return testGroups[process.env.TEST_GROUP as TestGroups];
}

function getReporter() {
  const reporters = [];
  if (process.env.CI) {
    reporters.push(['github']);
    reporters.push(['junit', { outputFile: `./playwright-report/${getTestGroup()}.xml` }]);
  } else {
    reporters.push(['list']);
    reporters.push(['html', { open: 'never', outputFolder: `./playwright-report/${getTestGroup()}/` }]);
  }

  return reporters as
    | LiteralUnion<'list' | 'dot' | 'line' | 'github' | 'json' | 'junit' | 'null' | 'html', string>
    | ReporterDescription[];
}

const config: PlaywrightTestConfig = {
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: getReporter(),
  use: {
    trace: 'on-first-retry',
    video: 'on-first-retry',
    baseURL: 'https://rickandmortyapi.com/api/',
    extraHTTPHeaders: {
      Accept: 'application/json',
    },
  },
  projects: [
    {
      name: 'api',
      testIgnore: /web\/.*\/*.spec.ts/,
    },
    {
      name: 'chromium',
      timeout: 600000,
      use: { ...devices['Desktop Chrome'] },
      testIgnore: /api\/.*\/*.spec.ts/,
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      testIgnore: /api\/.*\/*.spec.ts/,
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      testIgnore: /api\/.*\/*.spec.ts/,
    },
  ],
};
export default config;
