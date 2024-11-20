import { defineConfig } from '@playwright/test';
import Config from './utils/config';

export default defineConfig({
  reporter: [['html', { outputFolder: 'reports' }]],
  testDir: '.', 
  timeout: 30000, 
  retries: 1,
  use: {
    baseURL:  Config.baseURL, 
    headless: false, 
    screenshot: 'only-on-failure', 
  },
  projects: [
    {
      name: 'ATG Test Suite',
      use: { browserName: 'chromium' },
    },
     
  ],
});
