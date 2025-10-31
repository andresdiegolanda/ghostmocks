#!/usr/bin/env node

/**
 * GhostMocks CLI - HAR Parser & Test Generator
 * 
 * This CLI tool:
 * 1. Reads a Chrome HAR (HTTP Archive) file
 * 2. Extracts API responses from the HAR entries
 * 3. Redacts sensitive information (tokens, passwords, API keys)
 * 4. Generates JSON fixture files for testing
 * 5. Generates Playwright test specs with network interception
 * 
 * Usage: node cli/index.js <har-file-path>
 * Example: node cli/index.js sample.har
 */

const fs = require('fs');
const path = require('path');

// Parse command line arguments
const harFilePath = process.argv[2];

if (!harFilePath) {
  console.error('❌ Usage: node cli/index.js <har-file-path>');
  console.error('   Example: node cli/index.js sample.har');
  process.exit(1);
}

if (!fs.existsSync(harFilePath)) {
  console.error(`❌ HAR file not found: ${harFilePath}`);
  process.exit(1);
}

console.log('🔍 Reading HAR file:', harFilePath);

// Read and parse the HAR file
let harData;
try {
  const harContent = fs.readFileSync(harFilePath, 'utf-8');
  harData = JSON.parse(harContent);
} catch (error) {
  console.error('❌ Error parsing HAR file:', error.message);
  process.exit(1);
}

/**
 * Extract API responses from HAR entries
 * HAR format: { log: { entries: [ { request, response, ... } ] } }
 */
function extractApiResponses(har) {
  const entries = har.log?.entries || [];
  const apiResponses = [];

  for (const entry of entries) {
    const url = entry.request?.url || '';
    const response = entry.response || {};
    const content = response.content || {};
    
    // Only process successful JSON responses
    if (response.status >= 200 && response.status < 300) {
      const mimeType = content.mimeType || '';
      
      if (mimeType.includes('json') && content.text) {
        try {
          const jsonData = JSON.parse(content.text);
          
          // Extract endpoint name from URL (e.g., /users from full URL)
          const urlObj = new URL(url);
          const endpoint = urlObj.pathname.split('/').filter(Boolean).pop() || 'data';
          
          apiResponses.push({
            endpoint,
            url,
            method: entry.request.method,
            status: response.status,
            data: jsonData
          });
          
          console.log(`  ✓ Found API response: ${entry.request.method} ${urlObj.pathname}`);
        } catch (e) {
          // Skip non-JSON or malformed responses
        }
      }
    }
  }

  return apiResponses;
}

/**
 * Redact sensitive information from data
 * Searches for common secret patterns and replaces them with [REDACTED]
 */
function redactSecrets(data) {
  // Convert to string for pattern matching
  let jsonString = JSON.stringify(data, null, 2);
  
  // Patterns to redact (common secret field names)
  const secretPatterns = [
    /("(?:token|apikey|api_key|password|secret|credential|auth)"\s*:\s*)"[^"]+"/gi,
    /(Bearer\s+)[A-Za-z0-9\-._~+/]+=*/g,
  ];
  
  for (const pattern of secretPatterns) {
    jsonString = jsonString.replace(pattern, (match, prefix) => {
      return prefix ? `${prefix}"[REDACTED]"` : '"[REDACTED]"';
    });
  }
  
  return JSON.parse(jsonString);
}

/**
 * Generate a JSON fixture file
 */
function generateFixture(data, outputPath) {
  const redacted = redactSecrets(data);
  const dir = path.dirname(outputPath);
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  fs.writeFileSync(outputPath, JSON.stringify(redacted, null, 2), 'utf-8');
  console.log(`  ✓ Generated fixture: ${outputPath}`);
}

/**
 * Generate a Playwright test spec
 */
function generateTest(endpoint, fixtureRelativePath, outputPath) {
  const testContent = `/**
 * Generated Playwright Test for /${endpoint}
 * 
 * This test demonstrates network interception with fixtures:
 * 1. Loads the generated JSON fixture
 * 2. Intercepts network requests to /${endpoint}
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

test.describe('${endpoint} API', () => {
  test('should display ${endpoint} from fixture', async ({ page }) => {
    // Load the generated fixture
    const fixtureData = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, '${fixtureRelativePath}'),
        'utf-8'
      )
    );

    // Intercept network requests to /${endpoint}
    // This prevents the app from calling the real API
    await page.route('**/${endpoint}', async route => {
      console.log('🎭 Intercepted request to /${endpoint}');
      
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
    console.log(\`✓ Found \${items} items rendered\`);

    // If the fixture is an array, verify count matches
    if (Array.isArray(fixtureData)) {
      expect(items).toBe(fixtureData.length);
      
      // Verify first item name is visible (adjust based on your data structure)
      if (fixtureData[0]?.name) {
        await expect(page.getByText(fixtureData[0].name)).toBeVisible();
        console.log(\`✓ Verified first item: \${fixtureData[0].name}\`);
      }
    }
  });

  test('should handle empty state', async ({ page }) => {
    // Test with empty fixture to verify error handling
    await page.route('**/${endpoint}', async route => {
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
`;

  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  fs.writeFileSync(outputPath, testContent, 'utf-8');
  console.log(`  ✓ Generated test: ${outputPath}`);
}

// Main processing
console.log('🔄 Processing HAR entries...');

const apiResponses = extractApiResponses(harData);

if (apiResponses.length === 0) {
  console.warn('⚠️  No API responses found in HAR file');
  console.log('   Make sure the HAR contains JSON API responses');
  process.exit(0);
}

console.log(`\n📦 Found ${apiResponses.length} API response(s)\n`);

// Process each API response
for (const response of apiResponses) {
  console.log(`Processing: ${response.method} ${response.endpoint}`);
  
  // Generate paths
  const fixturePath = path.join(__dirname, '..', 'angular-demo', 'mocks', `${response.endpoint}.json`);
  const testPath = path.join(__dirname, '..', 'angular-demo', 'tests', `${response.endpoint}.spec.ts`);
  const fixtureRelativePath = `../mocks/${response.endpoint}.json`;
  
  // Generate fixture and test
  generateFixture(response.data, fixturePath);
  generateTest(response.endpoint, fixtureRelativePath, testPath);
  
  console.log('');
}

console.log('✅ Generation complete!');
console.log('\nNext steps:');
console.log('  1. npm run start:app  - Start the Angular dev server');
console.log('  2. npm run test       - Run Playwright tests with generated fixtures');
