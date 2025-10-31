# Quick Reference Guide

All commands and shortcuts in one place.

## 📦 Installation Commands

```powershell
# Initial setup
npm install
cd angular-demo
npm install
npx playwright install chromium
cd ..
```

## 🚀 Core Workflow Commands

### Generate Mocks from HAR
```powershell
# From project root
node cli/index.js sample.har

# From your own HAR recording
node cli/index.js path/to/your-recording.har
```

### Start Angular App
```powershell
# From project root
npm run start:app

# Or from angular-demo/
cd angular-demo
npm start
```

### Run Tests
```powershell
# From project root
npm run test

# With UI mode
npm run test:ui

# Or from angular-demo/
cd angular-demo
npm test
npm test -- --ui
```

### Build Production App
```powershell
npm run build:app

# Output will be in angular-demo/dist/
```

## 🔧 Development Commands

### Kill Process on Port 4200
```powershell
# Find process
Get-NetTCPConnection -LocalPort 4200

# Kill by PID
Stop-Process -Id <PID>

# Force kill all node processes (nuclear option)
Get-Process -Name node | Stop-Process -Force
```

### Clean Install
```powershell
# Root
Remove-Item node_modules -Recurse -Force -ErrorAction SilentlyContinue
npm install

# Angular app
cd angular-demo
Remove-Item node_modules -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item package-lock.json -ErrorAction SilentlyContinue
npm install
```

### Update Dependencies
```powershell
cd angular-demo
npm outdated                    # Check for updates
npm update                      # Update to latest minor/patch
npm install @angular/core@latest  # Update specific package
```

## 🧪 Testing Commands

### Run Specific Test
```powershell
cd angular-demo
npx playwright test users.spec.ts
```

### Run Tests in Headed Mode (see browser)
```powershell
npx playwright test --headed
```

### Run Tests with Debug
```powershell
npx playwright test --debug
```

### Generate Playwright Report
```powershell
npx playwright show-report
```

### Run Tests in Specific Browser
```powershell
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## 🔍 Debugging Commands

### Check Node.js Version
```powershell
node --version      # Should be v18+
npm --version       # Should be v8+
```

### Check Angular CLI
```powershell
cd angular-demo
npx ng version
```

### Check Playwright Installation
```powershell
cd angular-demo
npx playwright --version
```

### View Angular Build Configuration
```powershell
cd angular-demo
npx ng build --help
npx ng serve --help
```

## 📝 File Operations

### View Generated Fixtures
```powershell
# View users fixture
Get-Content angular-demo\mocks\users.json

# Pretty print with PowerShell
Get-Content angular-demo\mocks\users.json | ConvertFrom-Json | ConvertTo-Json -Depth 10
```

### List Generated Files
```powershell
# List all mocks
Get-ChildItem angular-demo\mocks

# List all tests
Get-ChildItem angular-demo\tests
```

### View HAR File Structure
```powershell
Get-Content sample.har | ConvertFrom-Json | Select-Object -ExpandProperty log | Select-Object -ExpandProperty entries | Select-Object -First 1
```

## 🌐 Browser Commands

### Open App in Browser
```powershell
# Using default browser
Start-Process http://localhost:4200

# Using specific browser
Start-Process chrome http://localhost:4200
Start-Process msedge http://localhost:4200
Start-Process firefox http://localhost:4200
```

### Open Playwright UI
```powershell
cd angular-demo
npx playwright test --ui
```

## 🛠️ Git Commands (Optional)

### Initialize Git Repo
```powershell
git init
git add .
git commit -m "Initial commit: GhostMocks demo"
```

### Create .gitignore
```powershell
# Already created, but to view:
Get-Content .gitignore
```

### Check Git Status
```powershell
git status
git diff
```

## 📊 Monitoring Commands

### Watch File Changes
```powershell
# Angular has built-in watch mode
npm run start:app
# Auto-reloads on file changes
```

### View Process Info
```powershell
# View all node processes
Get-Process -Name node

# View specific port usage
Get-NetTCPConnection -State Listen | Where-Object LocalPort -eq 4200
```

### Monitor Network
```powershell
# In Angular app console (browser DevTools)
# Enable "Preserve log" to see all requests
```

## 🔐 Security Commands

### Check for Secrets in Fixtures
```powershell
# Search for common secret patterns
Select-String -Path "angular-demo\mocks\*.json" -Pattern "token|password|secret|apikey"
```

### Scan Dependencies for Vulnerabilities
```powershell
cd angular-demo
npm audit
npm audit fix
```

## 📦 Package Management

### Install New Package
```powershell
cd angular-demo
npm install <package-name>
npm install <package-name> --save-dev  # Dev dependency
```

### Remove Package
```powershell
npm uninstall <package-name>
```

### List Installed Packages
```powershell
npm list --depth=0
```

## 🧹 Cleanup Commands

### Remove Generated Files
```powershell
# Remove generated mocks
Remove-Item angular-demo\mocks\*.json

# Remove generated tests
Remove-Item angular-demo\tests\*.spec.ts

# Keep .gitkeep files
```

### Clean Build Artifacts
```powershell
cd angular-demo
Remove-Item dist -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item .angular -Recurse -Force -ErrorAction SilentlyContinue
```

### Clean Test Artifacts
```powershell
cd angular-demo
Remove-Item playwright-report -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item test-results -Recurse -Force -ErrorAction SilentlyContinue
```

### Nuclear Clean (reset everything)
```powershell
# Remove all node_modules and artifacts
Get-ChildItem -Recurse node_modules | Remove-Item -Recurse -Force
Get-ChildItem -Recurse dist | Remove-Item -Recurse -Force
Get-ChildItem -Recurse .angular | Remove-Item -Recurse -Force
Get-ChildItem -Recurse playwright-report | Remove-Item -Recurse -Force
Remove-Item package-lock.json -ErrorAction SilentlyContinue
cd angular-demo
Remove-Item package-lock.json -ErrorAction SilentlyContinue
cd ..

# Then reinstall
npm install
cd angular-demo
npm install
npx playwright install chromium
```

## 🎯 Quick Workflows

### Full Demo Workflow
```powershell
# 1. Generate
npm run generate

# 2. Start app (Terminal 1)
npm run start:app

# 3. Run tests (Terminal 2)
npm run test
```

### Record New HAR Workflow
```powershell
# 1. Record HAR in Chrome (manual)
# 2. Save as my-recording.har
# 3. Generate from new HAR
node cli/index.js my-recording.har

# 4. Test with new fixtures
npm run test
```

### CI/CD Simulation
```powershell
# Install dependencies
npm install
cd angular-demo
npm install
npx playwright install chromium
cd ..

# Generate fixtures
npm run generate

# Build app
npm run build:app

# Run tests
npm run test

# All should complete in 2-3 minutes
```

## 📚 Documentation Commands

### View README in Browser
```powershell
# If you have markdown viewer installed
code README.md

# Or convert to HTML (requires pandoc)
pandoc README.md -o readme.html
Start-Process readme.html
```

### Generate Documentation
```powershell
# View project structure
tree /F > structure.txt

# List all commands
Get-Content package.json | ConvertFrom-Json | Select-Object -ExpandProperty scripts
```

## 🆘 Emergency Commands

### If Everything Breaks
```powershell
# 1. Kill all node processes
Get-Process -Name node | Stop-Process -Force

# 2. Remove everything
Remove-Item node_modules -Recurse -Force -ErrorAction SilentlyContinue
cd angular-demo
Remove-Item node_modules -Recurse -Force -ErrorAction SilentlyContinue
cd ..

# 3. Reinstall from scratch
npm install
cd angular-demo
npm install
npx playwright install chromium
cd ..

# 4. Generate fixtures
npm run generate

# 5. Test
npm run start:app
# (in new terminal)
npm run test
```

## 🔗 Quick Links

| File | Purpose |
|------|---------|
| `README.md` | Main documentation |
| `INSTALLATION.md` | Setup guide |
| `QUICKSTART.md` | 5-minute quickstart |
| `ARCHITECTURE.md` | Technical diagrams |
| `DEMO_SCRIPT.md` | Presentation guide |
| `PROJECT_SUMMARY.md` | Complete file listing |

## 💡 Pro Tips

### PowerShell Aliases (add to your profile)
```powershell
# Create shortcuts
function ghost-start { npm run start:app }
function ghost-test { npm run test }
function ghost-gen { node cli/index.js $args }

# Usage:
ghost-gen sample.har
ghost-start
ghost-test
```

### VS Code Tasks
Press `Ctrl+Shift+P` → "Tasks: Run Task" to run npm scripts directly from VS Code.

### Multiple Terminals
In VS Code, click the "+" icon in terminal panel to open multiple terminals side-by-side.

---

**Need help?** See [INSTALLATION.md](INSTALLATION.md) for troubleshooting! 🚀
