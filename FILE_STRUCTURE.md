# Complete Project Structure

Visual guide to all files and folders in the GhostMocks Demo.

```
c:\_dev\workspace0\ghostMocks\
│
├─── 📄 README.md                    # Main documentation - START HERE
├─── 📄 INSTALLATION.md              # Detailed setup guide with troubleshooting
├─── 📄 QUICKSTART.md                # Get running in 5 minutes
├─── 📄 ARCHITECTURE.md              # Technical diagrams with PlantUML
├─── 📄 DEMO_SCRIPT.md               # Complete 10-minute presentation guide
├─── 📄 PROJECT_SUMMARY.md           # Complete file reference and explanations
├─── 📄 COMMANDS.md                  # All commands and shortcuts
├─── 📄 CONTRIBUTING.md              # How to contribute to the project
├─── 📄 LICENSE                      # MIT License
├─── 📄 package.json                 # Root npm scripts (generate, start, test)
├─── 📄 .gitignore                   # Git ignore rules
├─── 📄 sample.har                   # Example Chrome HAR with /users API call
│
├─── 📁 cli/
│    └─── 📄 index.js                # ⭐ HAR parser & generator CLI
│                                    # - Reads .har files
│                                    # - Extracts API responses
│                                    # - Redacts secrets (tokens, passwords)
│                                    # - Generates JSON fixtures
│                                    # - Generates Playwright test specs
│                                    # - Zero dependencies (Node.js built-ins only)
│
└─── 📁 angular-demo/
     │
     ├─── 📄 package.json            # Angular app dependencies & scripts
     ├─── 📄 angular.json            # Angular CLI configuration
     ├─── 📄 tsconfig.json           # TypeScript base configuration
     ├─── 📄 tsconfig.app.json       # TypeScript app-specific config
     ├─── 📄 playwright.config.ts    # Playwright test configuration
     ├─── 📄 .gitignore              # Angular-specific git ignores
     │
     ├─── 📁 src/
     │    ├─── 📄 index.html         # HTML entry point
     │    ├─── 📄 main.ts            # Angular bootstrap (app initialization)
     │    ├─── 📄 styles.css         # Global CSS styles
     │    │
     │    └─── 📁 app/
     │         ├─── 📄 app.component.ts        # ⭐ Main component
     │         │                               # - Fetches users from API
     │         │                               # - Uses HttpClient
     │         │                               # - Observable-based
     │         │
     │         ├─── 📄 app.component.html      # User list template
     │         │                               # - Displays users with *ngFor
     │         │                               # - Shows loading state
     │         │                               # - Uses async pipe
     │         │
     │         ├─── 📄 app.component.css       # Component styles
     │         │                               # - Card layout
     │         │                               # - Responsive grid
     │         │                               # - Loading spinner
     │         │
     │         └─── 📄 user.interface.ts       # TypeScript User interface
     │                                         # - Type definition for User objects
     │
     ├─── 📁 mocks/
     │    ├─── 📄 .gitkeep           # Keeps directory in git
     │    └─── 📄 users.json         # ⭐ Generated fixture (10 users)
     │                               # - Clean JSON data
     │                               # - Secrets redacted
     │                               # - Ready for git commit
     │                               # - Used by Playwright tests
     │
     └─── 📁 tests/
          ├─── 📄 .gitkeep           # Keeps directory in git
          └─── 📄 users.spec.ts      # ⭐ Generated Playwright test
                                     # - Loads users.json fixture
                                     # - Intercepts /users requests
                                     # - Fulfills with mock data
                                     # - Verifies UI rendering
                                     # - Fast, offline, deterministic
```

## 📊 File Statistics

| Category | Count | Purpose |
|----------|-------|---------|
| **Documentation** | 8 files | README, guides, architecture |
| **Source Code** | 5 files | Angular app components |
| **Tests** | 1 file | Playwright E2E test |
| **Configuration** | 6 files | Angular, TypeScript, Playwright configs |
| **CLI** | 1 file | HAR parser and generator |
| **Fixtures** | 1 file | Generated mock data |
| **Sample Data** | 1 file | Example HAR recording |
| **Total** | 23 files | Minimal, focused, didactic |

## 🎯 Key Files to Understand

### For Learning the Concept

1. **README.md** - Overview and workflow
2. **ARCHITECTURE.md** - Visual diagrams explaining the flow
3. **cli/index.js** - How HAR parsing works
4. **angular-demo/tests/users.spec.ts** - How mocking works

### For Running the Demo

1. **INSTALLATION.md** - Setup instructions
2. **QUICKSTART.md** - Fast start guide
3. **COMMANDS.md** - All commands reference

### For Presenting

1. **DEMO_SCRIPT.md** - Complete presentation guide
2. **sample.har** - Example HAR to show
3. **angular-demo/src/app/** - Code to explain

### For Contributing

1. **CONTRIBUTING.md** - Contribution guidelines
2. **PROJECT_SUMMARY.md** - Complete file reference
3. **LICENSE** - Usage terms

## 🔄 Data Flow Through Files

```
1. RECORDING
   Chrome DevTools → sample.har

2. GENERATION
   sample.har → cli/index.js → mocks/users.json
                             → tests/users.spec.ts

3. DEVELOPMENT
   src/app/app.component.ts → HttpClient → Real API
                           → Browser displays data

4. TESTING
   tests/users.spec.ts → Loads mocks/users.json
                       → Intercepts network
                       → Fulfills with fixture
                       → Verifies UI
```

## 📝 Configuration Files Explained

### package.json (root)
```json
{
  "scripts": {
    "generate": "node cli/index.js sample.har",  // Generate fixtures
    "start:app": "cd angular-demo && npm start",  // Start Angular
    "test": "cd angular-demo && npm test"         // Run Playwright
  }
}
```

### package.json (angular-demo/)
```json
{
  "scripts": {
    "start": "ng serve",           // Dev server on :4200
    "build": "ng build",           // Production build
    "test": "playwright test"      // E2E tests
  },
  "dependencies": {
    "@angular/core": "^17.3.0",    // Angular framework
    "@angular/common": "^17.3.0"   // Common utilities
  },
  "devDependencies": {
    "@playwright/test": "^1.42.0"  // Testing framework
  }
}
```

### angular.json
- Angular CLI configuration
- Build and serve settings
- Output paths
- Asset management

### tsconfig.json
- TypeScript compiler options
- Target: ES2022
- Module: ES2022
- Strict mode enabled

### playwright.config.ts
- Test directory: ./tests
- Base URL: http://localhost:4200
- Auto-start dev server
- Browser: Chromium

## 🎨 File Naming Conventions

| Pattern | Purpose | Example |
|---------|---------|---------|
| `*.md` | Documentation | `README.md` |
| `*.json` | Configuration or fixtures | `users.json` |
| `*.ts` | TypeScript source | `app.component.ts` |
| `*.spec.ts` | Test files | `users.spec.ts` |
| `*.config.ts` | Configuration files | `playwright.config.ts` |
| `*.har` | HTTP Archive recordings | `sample.har` |
| `.gitkeep` | Keep empty directories | `.gitkeep` |

## 🔍 What Gets Generated

### By CLI (cli/index.js)

**Input:** `sample.har` (or any .har file)

**Output:**
1. `angular-demo/mocks/{endpoint}.json`
   - One file per API endpoint found
   - Secrets redacted
   - Clean, formatted JSON

2. `angular-demo/tests/{endpoint}.spec.ts`
   - One test file per endpoint
   - Loads corresponding fixture
   - Intercepts network requests
   - Verifies UI rendering

### By Angular Build

**Input:** `src/` directory

**Output:**
- `dist/angular-demo/` - Production build
  - Minified JavaScript
  - Optimized assets
  - index.html

### By Playwright

**Input:** `tests/*.spec.ts`

**Output:**
- `test-results/` - Test artifacts
- `playwright-report/` - HTML report
- Screenshots (on failure)
- Videos (on failure)

## 🗂️ Directories Not in Git

These are generated and ignored:

```
node_modules/              # Dependencies (ignored)
angular-demo/node_modules/ # Angular dependencies (ignored)
angular-demo/dist/         # Build output (ignored)
angular-demo/.angular/     # Angular cache (ignored)
angular-demo/test-results/ # Playwright results (ignored)
angular-demo/playwright-report/ # Test reports (ignored)
*.log                      # Log files (ignored)
```

## 📦 What to Commit

✅ **Do commit:**
- All documentation (*.md)
- Source code (cli/, src/)
- Configurations (*.json, *.ts)
- Sample HAR file
- Generated fixtures (mocks/*.json)
- Generated tests (tests/*.spec.ts)

❌ **Don't commit:**
- node_modules/
- Build outputs (dist/)
- Test results
- Real HAR recordings (may contain secrets)
- Log files

## 🎓 Teaching Flow

Recommended order for understanding:

1. **README.md** - Get the big picture
2. **sample.har** - See what we're parsing
3. **cli/index.js** - See how parsing works
4. **mocks/users.json** - See the generated fixture
5. **tests/users.spec.ts** - See how it's used in tests
6. **src/app/app.component.ts** - See the app code
7. **ARCHITECTURE.md** - Understand the full flow

## 🚀 Quick Navigation

| I want to... | Go to... |
|--------------|----------|
| Install the project | [INSTALLATION.md](INSTALLATION.md) |
| Run the demo quickly | [QUICKSTART.md](QUICKSTART.md) |
| Understand how it works | [ARCHITECTURE.md](ARCHITECTURE.md) |
| Present to others | [DEMO_SCRIPT.md](DEMO_SCRIPT.md) |
| Find a command | [COMMANDS.md](COMMANDS.md) |
| See all files | This file! |
| Contribute | [CONTRIBUTING.md](CONTRIBUTING.md) |

---

**Navigate to:** [README.md](README.md) | [INSTALLATION.md](INSTALLATION.md) | [QUICKSTART.md](QUICKSTART.md)
