import { test, expect } from '@playwright/test';

function getTaskTitleLocator(page, id) {
  return page.locator(`[data-testid="task-title-${id}"]`);
}

test.describe('FocusFlow E2E', () => {
  test('Ajout, modification, suppression et persistance', async ({ page }) => {
    await page.goto('http://localhost:5173');

    // Ajout
    await page.fill('input[placeholder="Add a new task..."]', 'Tâche E2E');
    await page.click('button:has-text("Add")');
    // Récupérer l'id de la tâche ajoutée (le premier span avec le bon titre)
    const taskSpan = await page.locator('span:text("Tâche E2E")').first();
    const dataTestId = await taskSpan.getAttribute('data-testid');
    expect(dataTestId).toBeTruthy();
    const id = dataTestId?.replace('task-title-', '');
    // Vérifier l'affichage
    await expect(getTaskTitleLocator(page, id)).toBeVisible();

    // Persistance (reload)
    await page.reload();
    await expect(getTaskTitleLocator(page, id)).toBeVisible();

    // Modification (toggle)
    const checkbox = page.locator('input[type="checkbox"]').first();
    await checkbox.check();
    await expect(getTaskTitleLocator(page, id)).toHaveClass(/line-through/);

    // Suppression
    await page.click('button[aria-label="Delete task"]');
    await expect(getTaskTitleLocator(page, id)).not.toBeVisible();
  });

  test('Gestion d\'erreur API', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('focusflow_tasks_cache', '[]');
    });
    // À compléter pour simuler une erreur réseau
  });
}); 