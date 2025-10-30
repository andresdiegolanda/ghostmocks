# GhostMocks Demo

A 10-minute demonstration of recording, mocking, and testing HTTP APIs.

## 🎯 What This Demo Shows

1. **Record** – Capture real API traffic in a Chrome HAR file
2. **Generate** – Parse HAR, redact secrets, create JSON fixtures and test specs
3. **Mock** – Serve the Angular app with generated mocks
4. **Test** – Run Playwright tests using the generated fixtures

## 📦 Installation

```bash
# Quick install (see INSTALLATION.md for detailed guide)
npm install
cd angular-demo
npm install
npx playwright install chromium
cd ..
```

**New to the project?** See [INSTALLATION.md](INSTALLATION.md) for a complete setup guide.

## 🚀 10-Minute Demo Flow

### Step 1: Generate Mocks from Sample HAR (1 min)

```bash
# Parse the sample HAR and generate mocks + test specs
npm run generate
```

This reads `sample.har` and creates:
- `angular-demo/mocks/users.json` – Fixture data
- `angular-demo/tests/users.spec.ts` – Playwright test

### Step 2: Run the Angular App (2 min)

```bash
# Start the Angular dev server
npm run start:app
```

Visit http://localhost:4200 to see the app fetch users from jsonplaceholder.typicode.com

### Step 3: Run Playwright Tests (2 min)

```bash
# Run tests that intercept API calls with generated fixtures
npm run test
```

The test will:
- Intercept `/users` requests
- Serve the generated `users.json` fixture
- Verify the UI displays the mocked data

### Step 4: Record Your Own HAR (5 min)

1. Open Chrome DevTools → Network tab
2. Visit https://jsonplaceholder.typicode.com/users
3. Right-click → "Save all as HAR with content"
4. Save as `my-recording.har`
5. Run: `node cli/index.js my-recording.har`
6. Repeat steps 2-3 with your new fixtures!

## 📁 Project Structure

```
ghostmocks-demo/
├── cli/
│   └── index.js           # HAR parser & generator
├── angular-demo/
│   ├── src/
│   │   └── app/
│   │       ├── app.component.ts    # Fetches /users
│   │       └── app.component.html  # Displays list
│   ├── mocks/
│   │   └── users.json     # Generated fixture
│   └── tests/
│       └── users.spec.ts  # Generated Playwright test
├── sample.har             # Example Chrome HAR file
├── package.json
├── README.md              # This file
├── INSTALLATION.md        # Detailed setup guide
├── QUICKSTART.md          # 5-minute quick start
├── ARCHITECTURE.md        # Technical flow diagrams
├── DEMO_SCRIPT.md         # 10-minute presentation guide
├── PROJECT_SUMMARY.md     # Complete file reference
└── COMMANDS.md            # All commands reference
```

## 🔧 Development Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install all dependencies |
| `npm run generate` | Generate mocks from sample.har |
| `npm run start:app` | Start Angular dev server |
| `npm run build:app` | Build Angular app |
| `npm run test` | Run Playwright tests |
| `npm run test:ui` | Run Playwright tests in UI mode |

## 🧪 How It Works

See [ARCHITECTURE.md](ARCHITECTURE.md) for detailed diagrams and explanations.

**Quick Summary:**

1. CLI parses HAR → extracts API responses → redacts secrets → saves JSON
2. Angular app makes real HTTP calls (or can be configured to use mocks)
3. Playwright intercepts network requests and serves generated fixtures
4. Tests verify UI behavior with predictable, fast, offline data

## 📝 Notes

- The CLI redacts common secrets (tokens, passwords, API keys)
- Generated tests are starting points – customize as needed
- HAR files can contain sensitive data – never commit real recordings!
- This demo uses jsonplaceholder.typicode.com (a free fake API)

## 🎓 Learning Points

- **HAR Format**: Chrome's HTTP Archive format captures full request/response cycles
- **Fixture Generation**: Automated test data creation from real traffic
- **Network Interception**: Playwright's route API for fast, deterministic tests
- **Security**: Always redact secrets before committing test fixtures

---

## 📖 Documentation

| Document | Description |
|----------|-------------|
| [README.md](README.md) | **You are here** - Overview and quick demo |
| [INSTALLATION.md](INSTALLATION.md) | Detailed setup guide with troubleshooting |
| [QUICKSTART.md](QUICKSTART.md) | Get running in 5 minutes |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Technical diagrams and flow explanations |
| [DEMO_SCRIPT.md](DEMO_SCRIPT.md) | Complete 10-minute presentation guide |
| [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) | Complete file structure and explanations |
| [COMMANDS.md](COMMANDS.md) | All commands and shortcuts reference |

**Next Steps**: 
- 🔧 New to the project? → [INSTALLATION.md](INSTALLATION.md)
- 🚀 Want to run it now? → [QUICKSTART.md](QUICKSTART.md)
- 🎓 Want to understand it? → [ARCHITECTURE.md](ARCHITECTURE.md)
- 🎤 Need to present it? → [DEMO_SCRIPT.md](DEMO_SCRIPT.md)
