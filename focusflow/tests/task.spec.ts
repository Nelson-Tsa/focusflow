import { test, expect } from '@playwright/test';

function getTaskTitleLocator(page, id) {
  return page.locator(`[data-testid="task-title-${id}"]`);
}

test.describe('Gestion des tâches FocusFlow', () => {
  test('Ajouter une tâche', async ({ page }) => {
    await page.goto('http://localhost:5173');
    await page.fill('input[placeholder="Add a new task..."]', 'Ma première tâche');
    await page.click('button:has-text("Add")');
    // Récupérer l'id de la tâche ajoutée
    const taskSpan = await page.locator('span:text("Ma première tâche")').first();
    const dataTestId = await taskSpan.getAttribute('data-testid');
    expect(dataTestId).toBeTruthy();
    const id = dataTestId?.replace('task-title-', '');
    await expect(getTaskTitleLocator(page, id)).toBeVisible();
  });

  test('Marquer une tâche comme terminée', async ({ page }) => {
    await page.goto('http://localhost:5173');
    await page.fill('input[placeholder="Add a new task..."]', 'Ma première tâche');
    await page.click('button:has-text("Add")');
    const taskSpan = await page.locator('span:text("Ma première tâche")').first();
    const dataTestId = await taskSpan.getAttribute('data-testid');
    expect(dataTestId).toBeTruthy();
    const id = dataTestId?.replace('task-title-', '');
    const checkbox = page.locator('input[type="checkbox"]').first();
    await checkbox.check();
    await expect(getTaskTitleLocator(page, id)).toHaveClass(/line-through/);
  });

  test('Supprimer une tâche', async ({ page }) => {
    await page.goto('http://localhost:5173');
    await page.fill('input[placeholder="Add a new task..."]', 'Ma première tâche');
    await page.click('button:has-text("Add")');
    const taskSpan = await page.locator('span:text("Ma première tâche")').first();
    const dataTestId = await taskSpan.getAttribute('data-testid');
    expect(dataTestId).toBeTruthy();
    const id = dataTestId?.replace('task-title-', '');
    await page.click('button[aria-label="Delete task"]');
    await expect(getTaskTitleLocator(page, id)).not.toBeVisible();
  });
}); 