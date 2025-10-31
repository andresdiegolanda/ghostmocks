# 🚀 Quick Start Guide

Get the demo running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- npm installed

## Setup Steps

### 1. Install Dependencies

```bash
# Install CLI dependencies (none needed - uses Node.js built-ins)
npm install

# Install Angular app dependencies
cd angular-demo
npm install
cd ..
```

### 2. Generate Mocks and Tests

```bash
npm run generate
```

**What this does:** Runs `node cli/index.js sample.har` to parse the included `sample.har` file.

This will create:
- `angular-demo/mocks/users.json` - JSON fixture with 10 users
- `angular-demo/tests/users.spec.ts` - Playwright test spec

**To use your own HAR file:**
```bash
node cli/index.js path/to/your-recording.har
```

### 3. Start the Angular App

```bash
npm run start:app
```

Visit http://localhost:4200

### 4. Run Tests (in a new terminal)

```bash
npm run test
```

Or run with UI mode:

```bash
npm run test:ui
```

## 🎯 Demo Script

Use this script for a 10-minute presentation:

### Minutes 1-2: Explain the Problem
"Testing against live APIs is slow, flaky, and requires internet. Let's see how we can capture real traffic and use it for testing."

### Minutes 3-4: Show the HAR File
**Explain:** "First, let me show you what a HAR file looks like. This `sample.har` was recorded from Chrome DevTools."

1. Open `sample.har` in the editor
2. Show the JSON structure with the API request/response
3. Point out the `/users` endpoint and the response data

**Optional - Show how to record:**
> "If you want to record your own, you'd open Chrome DevTools → Network tab, visit an API, then right-click → 'Save all as HAR with content'. But we already have `sample.har` ready to use."

### Minutes 5-6: Generate Mocks
```bash
npm run generate
```
**Explain:** "Now watch this - we take that `sample.har` file and automatically generate test fixtures and specs."

Show the generated files:
- `angular-demo/mocks/users.json` (the fixture - clean JSON, secrets redacted)
- `angular-demo/tests/users.spec.ts` (the test - with network interception)

**Point out:** "The CLI read the HAR, extracted the API response, redacted any secrets, and created both the fixture data and a complete test spec. All automated!"

### Minutes 7-8: Run the Real App
```bash
npm run start:app
```
Open http://localhost:4200 and show it fetching real data from the API.

### Minutes 9-10: Run Tests with Mocks
```bash
npm run test
```
Explain:
- Playwright intercepts the `/users` request
- Serves the generated fixture instead
- Tests run fast, offline, and deterministically

### Wrap-up
"This pattern lets you:
- Record once, test forever
- No API keys in tests
- Fast, reliable, offline tests
- Generated test boilerplate"

## 🔧 Troubleshooting

### Port 4200 already in use
```bash
# Kill existing Angular processes
# Windows PowerShell:
Get-Process -Name node | Stop-Process -Force
```

### Tests fail with "page.goto: timeout"
Make sure the Angular dev server is running on http://localhost:4200

### Module not found errors
```bash
cd angular-demo
npm install
```

## 📚 Next Steps

1. Record your own HAR from a real application
2. Run `node cli/index.js your-recording.har`
3. Customize the generated tests
4. Add assertions for your specific use cases

See [ARCHITECTURE.md](../ARCHITECTURE.md) for technical details!
