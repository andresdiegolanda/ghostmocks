# Installation & Setup

Complete guide to getting the GhostMocks Demo running.

## 📋 Prerequisites

Before you begin, make sure you have:

- **Node.js 18+** - [Download from nodejs.org](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** (optional, for cloning)

To verify your installation:

```powershell
node --version
# Should show v18.0.0 or higher

npm --version
# Should show 8.0.0 or higher
```

## 🚀 Installation

### Step 1: Navigate to the Project

```powershell
cd c:\_dev\workspace0\ghostMocks
```

### Step 2: Install Root Dependencies

The CLI tool uses only Node.js built-ins, so no dependencies needed at root level:

```powershell
npm install
```

### Step 3: Install Angular App Dependencies

```powershell
cd angular-demo
npm install
```

This will install:
- Angular 17+ framework
- Playwright for testing
- TypeScript and build tools

**Note**: This may take 2-5 minutes depending on your internet connection.

### Step 4: Install Playwright Browsers

```powershell
npx playwright install chromium
```

This downloads the Chromium browser for testing.

### Step 5: Generate Initial Fixtures

```powershell
cd ..
npm run generate
```

This creates:
- `angular-demo/mocks/users.json`
- `angular-demo/tests/users.spec.ts`

## ✅ Verify Installation

### Test the CLI

```powershell
node cli/index.js sample.har
```

You should see:
```
🔍 Reading HAR file: sample.har
🔄 Processing HAR entries...
  ✓ Found API response: GET /users
...
✅ Generation complete!
```

### Test the Angular App

```powershell
npm run start:app
```

Open your browser to http://localhost:4200

You should see a list of 10 users.

### Test Playwright

In a new terminal:

```powershell
cd angular-demo
npm test
```

You should see tests passing with green checkmarks.

## 🔧 Troubleshooting

### "node is not recognized"

**Problem**: Node.js is not installed or not in PATH.

**Solution**:
1. Download Node.js from https://nodejs.org/
2. Run the installer
3. Restart your terminal/PowerShell
4. Verify with `node --version`

### "EACCES" or Permission Errors

**Problem**: npm doesn't have permission to install packages.

**Solution** (Windows):
- Run PowerShell as Administrator
- Or configure npm to use a different directory

### Port 4200 Already in Use

**Problem**: Another process is using port 4200.

**Solution**:
```powershell
# Find and kill the process
Get-NetTCPConnection -LocalPort 4200 | Select-Object OwningProcess
Stop-Process -Id <PID>

# Or use a different port
cd angular-demo
ng serve --port 4300
```

### "Cannot find module '@angular/core'"

**Problem**: Dependencies not installed properly.

**Solution**:
```powershell
cd angular-demo
Remove-Item node_modules -Recurse -Force
Remove-Item package-lock.json
npm install
```

### Playwright Tests Timeout

**Problem**: Angular app not running or slow to start.

**Solution**:
1. Make sure `npm run start:app` is running
2. Wait until you see "Compiled successfully"
3. Verify http://localhost:4200 works in browser
4. Then run tests

### "ng: command not found"

**Problem**: Angular CLI not installed globally.

**Solution**: Use npm scripts instead:
```powershell
npm run start:app  # instead of ng serve
npm run build:app  # instead of ng build
```

Or install globally:
```powershell
npm install -g @angular/cli
```

## 📦 What Gets Installed?

### Root Level
- Nothing! The CLI uses Node.js built-ins only.

### Angular App (`angular-demo/`)
```
Dependencies (~60 packages):
├─ @angular/* packages (framework)
├─ rxjs (reactive programming)
├─ zone.js (change detection)
└─ tslib (TypeScript helpers)

Dev Dependencies (~200 packages):
├─ @angular/cli (build tooling)
├─ @playwright/test (E2E testing)
├─ TypeScript (compiler)
└─ Build tools and dependencies
```

**Total size**: ~300-400 MB (includes Playwright browsers)

## 🧹 Cleanup

To remove all installed dependencies:

```powershell
# Remove Angular dependencies
cd angular-demo
Remove-Item node_modules -Recurse -Force
Remove-Item package-lock.json

# Remove Playwright browsers
npx playwright uninstall

cd ..
```

To start fresh:
```powershell
git clean -fdx
npm run install:all
```

## 🎯 Quick Commands Reference

| Command | Description |
|---------|-------------|
| `npm run generate` | Parse HAR and generate fixtures |
| `npm run start:app` | Start Angular dev server |
| `npm run test` | Run Playwright tests |
| `npm run test:ui` | Run tests in UI mode |
| `npm run build:app` | Build production Angular app |

## 📚 Next Steps

Once installation is complete:

1. Read [QUICKSTART.md](QUICKSTART.md) for the demo flow
2. Try generating fixtures from `sample.har`
3. Run the app and tests
4. Read [ARCHITECTURE.md](ARCHITECTURE.md) to understand the flow
5. Record your own HAR and generate custom fixtures!

## 🆘 Still Having Issues?

Common fixes:
1. **Restart your terminal** after installing Node.js
2. **Clear npm cache**: `npm cache clean --force`
3. **Update npm**: `npm install -g npm@latest`
4. **Check for spaces in path**: Move project to a path without spaces
5. **Disable antivirus temporarily** if file operations are slow

If all else fails:
- Check Node.js version: `node --version` (must be 18+)
- Check npm version: `npm --version`
- Try installing in a fresh directory
- Ensure you have a stable internet connection

---

**Ready to go?** Head to [QUICKSTART.md](QUICKSTART.md) for the demo! 🚀
