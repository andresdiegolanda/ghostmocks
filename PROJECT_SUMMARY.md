# GhostMocks Demo - Project Summary

## 📁 Complete File Structure

```
ghostmocks-demo/
│
├── README.md                      # Main project documentation
├── INSTALLATION.md                # Detailed setup guide
├── QUICKSTART.md                  # 5-minute quick start
├── ARCHITECTURE.md                # Technical diagrams & flow
├── package.json                   # Root npm scripts
├── .gitignore                     # Git ignore rules
│
├── sample.har                     # Example Chrome HAR recording
│
├── cli/
│   └── index.js                   # HAR parser & generator CLI
│                                  # - Reads HAR files
│                                  # - Extracts API responses
│                                  # - Redacts secrets
│                                  # - Generates fixtures & tests
│
└── angular-demo/
    ├── package.json               # Angular app dependencies
    ├── angular.json               # Angular CLI configuration
    ├── tsconfig.json              # TypeScript configuration
    ├── tsconfig.app.json          # App-specific TS config
    ├── playwright.config.ts       # Playwright test configuration
    ├── .gitignore                 # Angular-specific ignores
    │
    ├── src/
    │   ├── index.html             # HTML entry point
    │   ├── main.ts                # Angular bootstrap
    │   ├── styles.css             # Global styles
    │   │
    │   └── app/
    │       ├── app.component.ts   # Main component (fetches users)
    │       ├── app.component.html # User list template
    │       ├── app.component.css  # Component styles
    │       └── user.interface.ts  # User type definition
    │
    ├── mocks/
    │   ├── .gitkeep               # Placeholder
    │   └── users.json             # Generated fixture (10 users)
    │
    └── tests/
        ├── .gitkeep               # Placeholder
        └── users.spec.ts          # Generated Playwright test
```

## 🔑 Key Files Explained

### Root Level

**README.md**
- Overview and 10-minute demo instructions
- Quick reference for all npm commands
- Links to other documentation

**INSTALLATION.md**
- Prerequisites (Node.js 18+)
- Step-by-step installation
- Troubleshooting common issues

**QUICKSTART.md**
- Get running in 5 minutes
- Demo script for presentations
- Common issues and solutions

**ARCHITECTURE.md**
- PlantUML diagrams of the system flow
- Technical explanations
- Design decisions and rationale

**sample.har**
- Example Chrome HAR file
- Contains real JSONPlaceholder API response
- Used for generating initial fixtures

### CLI Tool (cli/)

**cli/index.js**
- Command-line tool for HAR processing
- Functions:
  - `extractApiResponses()` - Parse HAR entries
  - `redactSecrets()` - Remove sensitive data
  - `generateFixture()` - Create JSON files
  - `generateTest()` - Create Playwright specs
- Zero dependencies (uses Node.js built-ins only)

### Angular App (angular-demo/)

**src/app/app.component.ts**
- Main application component
- Fetches users from jsonplaceholder.typicode.com
- Uses HttpClient with Observables
- Logs fetch activity to console

**src/app/app.component.html**
- Displays user list with *ngFor
- Shows loading spinner while fetching
- Displays user details (name, email, phone, etc.)

**src/app/user.interface.ts**
- TypeScript interface for User objects
- Matches JSONPlaceholder API structure

**mocks/users.json**
- Generated JSON fixture with 10 users
- Used by Playwright tests
- Can be regenerated from any HAR file

**tests/users.spec.ts**
- Playwright test with network interception
- Loads users.json fixture
- Routes **/users requests to mock data
- Verifies UI renders correctly

## 🎯 How It All Works Together

### 1. Recording Phase
```
Developer → Chrome DevTools → Save HAR → sample.har
```

### 2. Generation Phase
```
node cli/index.js sample.har
    ↓
cli/index.js reads HAR
    ↓
Extracts /users response
    ↓
Redacts secrets (tokens, passwords)
    ↓
Generates mocks/users.json
    ↓
Generates tests/users.spec.ts
```

### 3. Development Phase
```
npm run start:app
    ↓
Angular app starts on :4200
    ↓
Fetches https://jsonplaceholder.typicode.com/users
    ↓
Displays real data in browser
```

### 4. Testing Phase
```
npm run test
    ↓
Playwright starts
    ↓
Reads mocks/users.json
    ↓
Intercepts **/users requests
    ↓
Returns mock data instead of real API
    ↓
Verifies UI displays correctly
    ↓
✓ Tests pass (fast, offline, deterministic)
```

## 📊 Technologies Used

| Technology | Purpose | Why? |
|------------|---------|------|
| **Node.js** | CLI runtime | Universal, no dependencies needed |
| **Angular 17** | UI framework | Modern, standalone components, popular |
| **Playwright** | E2E testing | Network interception, reliable, modern |
| **TypeScript** | Type safety | Catch errors early, better DX |
| **HAR Format** | Traffic recording | Standard, supported by all browsers |
| **RxJS** | Reactive programming | Angular's HTTP uses Observables |

## 🎓 Learning Objectives

After working through this demo, you'll understand:

1. **HAR Files**: How to capture and parse HTTP traffic
2. **Fixture Generation**: Automated test data creation
3. **Network Mocking**: Playwright's route interception
4. **Security**: Why and how to redact secrets
5. **Testing Strategy**: Fast, offline, deterministic tests
6. **Tool Integration**: CLI → fixtures → tests → CI/CD

## 🚀 Usage Patterns

### Pattern 1: One-Time Setup
```bash
# Record, generate, commit fixtures
node cli/index.js production.har
git add angular-demo/mocks/*.json
git commit -m "Add API fixtures"
```

### Pattern 2: Continuous Recording
```bash
# Update fixtures as APIs change
node cli/index.js new-recording.har
npm run test  # Verify tests still pass
```

### Pattern 3: Multiple Endpoints
```bash
# HAR with multiple APIs generates multiple fixtures
node cli/index.js complex-app.har
# Creates: users.json, posts.json, comments.json, etc.
```

## 📈 Scalability

This pattern scales to:
- ✅ 100+ API endpoints
- ✅ Multiple environments (dev, staging, prod)
- ✅ Large teams (fixture per feature)
- ✅ CI/CD pipelines (fast, no external deps)

## 🔒 Security Considerations

**Always Redact:**
- API tokens and keys
- Passwords and credentials
- PII (personal identifiable information)
- Internal URLs and infrastructure details

**The CLI automatically redacts:**
- Fields named: token, apikey, password, secret, credential
- Authorization headers
- Bearer tokens

**Manual review recommended for:**
- Customer data
- Business-sensitive information
- Non-standard secret field names

## 🎬 Demo Tips

**For Technical Audiences:**
- Focus on the code (show app.component.ts and users.spec.ts)
- Explain Playwright's route API
- Discuss fixture generation automation

**For Non-Technical Audiences:**
- Focus on the workflow (record → generate → test)
- Show the speed difference (real API vs. fixture)
- Emphasize offline testing benefits

**For Managers:**
- Highlight ROI (faster CI/CD, fewer flakes)
- Show cost savings (no test API infrastructure)
- Emphasize security (no real credentials in tests)

## 🔗 External Resources

- [HAR Spec](http://www.softwareishard.com/blog/har-12-spec/)
- [Playwright Docs](https://playwright.dev)
- [Angular HttpClient](https://angular.io/guide/http)
- [JSONPlaceholder API](https://jsonplaceholder.typicode.com)

## 📝 Customization Ideas

1. **Add More Endpoints**: Extend to posts, comments, albums
2. **Add Request Matching**: Match by method, headers, body
3. **Add Mock Server**: Use json-server or MSW
4. **Add CI/CD**: GitHub Actions with Playwright
5. **Add Coverage**: Track which fixtures are used
6. **Add Validation**: JSON Schema for fixtures

---

**Ready to dive in?** Start with [INSTALLATION.md](INSTALLATION.md)! 🎉
