/**
 * Generated Playwright Test for /users
 * 
 * This test demonstrates network interception with fixtures:
 * 1. Loads the generated JSON fixture
 * 2. Intercepts network requests to /users
 * 3. Fulfills the request with mock data instead of hitting the real API
 * 4. Verifies the UI renders the mocked data correctly
 * 
 * Benefits:
 * - Fast (no network delay)
 * - Reliable (deterministic data)
 * - Offline (no internet needed)
 */

import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test.describe('users API', () => {
  test('should display users from fixture', async ({ page }) => {
    // Load the generated fixture
    const fixtureData = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, '../mocks/users.json'),
        'utf-8'
      )
    );

    // Intercept network requests to /users
    // This prevents the app from calling the real API
    await page.route('**/users', async route => {
      console.log('🎭 Intercepted request to /users');
      
      // Fulfill the request with our fixture data
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(fixtureData)
      });
    });

    // Navigate to the app
    await page.goto('http://localhost:4200');

    // Wait for the list to be rendered
    // Adjust these selectors based on your actual app structure
    await page.waitForSelector('li', { timeout: 5000 });

    // Assert that items are displayed
    const items = await page.locator('li').count();
    expect(items).toBeGreaterThan(0);
    console.log(`✓ Found ${items} items rendered`);

    // If the fixture is an array, verify count matches
    if (Array.isArray(fixtureData)) {
      expect(items).toBe(fixtureData.length);
      
      // Verify first item name is visible (adjust based on your data structure)
      if (fixtureData[0]?.name) {
        await expect(page.getByText(fixtureData[0].name)).toBeVisible();
        console.log(`✓ Verified first item: ${fixtureData[0].name}`);
      }
    }
  });

  test('should handle empty state', async ({ page }) => {
    // Test with empty fixture to verify error handling
    await page.route('**/users', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([])
      });
    });

    await page.goto('http://localhost:4200');
    
    // Add assertions for empty state UI
    // Example: await expect(page.getByText('No items found')).toBeVisible();
  });
});
