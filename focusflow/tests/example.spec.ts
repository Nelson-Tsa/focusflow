import { test, expect } from '@playwright/test';

test('homepage has title', async ({ page }) => {
  await page.goto('http://localhost:5173'); // adapte l’URL à ton projet
  await expect(page).toHaveTitle("React 18, TypeScript, Jest, Testing Library, TailwindCSS 3, Vite, Eslint and Prettier boilerplate");
});