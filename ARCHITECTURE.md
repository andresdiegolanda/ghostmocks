# Architecture

This document explains the technical flow of GhostMocks Demo with PlantUML diagrams.

## 🏗️ System Overview

```plantuml
@startuml
!theme plain

actor Developer
participant "Chrome\nDevTools" as Chrome
participant "CLI\n(HAR Parser)" as CLI
database "users.json\n(Fixture)" as Fixture
participant "Angular\nApp" as App
participant "Playwright\nTest" as Test
cloud "jsonplaceholder\n.typicode.com" as API

== Recording Phase ==
Developer -> Chrome: Browse API endpoint
Chrome -> API: GET /users
API --> Chrome: JSON response
Developer -> Chrome: Save as HAR
Chrome --> CLI: sample.har

== Generation Phase ==
Developer -> CLI: node cli/index.js sample.har
CLI -> CLI: Parse HAR\nRedact secrets
CLI --> Fixture: Write users.json
CLI --> Test: Generate users.spec.ts

== Development Phase ==
Developer -> App: npm run start:app
App -> API: GET /users
API --> App: Real JSON data
App --> Developer: Display user list

== Testing Phase ==
Developer -> Test: npm run test
Test -> Test: route.fulfill(users.json)
Test -> App: Launch & intercept
App -[#red]x API: <color red>Request blocked</color>
Test --> App: <color green>Serve fixture</color>
App --> Test: Render mocked data
Test -> Test: Assert UI elements
Test --> Developer: ✓ Test passed

@enduml
```

## 🔄 Detailed Flow

### 1. HAR Recording Flow

```plantuml
@startuml
!theme plain

start

:Developer opens Chrome DevTools;
:Navigate to API endpoint;
:DevTools captures HTTP traffic;

partition "Network Activity" {
  :Browser sends GET /users;
  :Server responds with JSON;
  :DevTools records in HAR format;
}

:Developer right-clicks Network log;
:Select "Save all as HAR with content";
:Save file as sample.har;

note right
  HAR file contains:
  * Request headers
  * Response headers
  * Response body (JSON)
  * Timing information
end note

stop

@enduml
```

### 2. CLI Generation Flow

```plantuml
@startuml
!theme plain

start

:CLI reads sample.har;

partition "Parse HAR" {
  :Extract entries array;
  :Filter for /users endpoint;
  :Parse response JSON;
}

partition "Redact Secrets" {
  if (Contains tokens?) then (yes)
    :Replace with [REDACTED];
  endif
  if (Contains passwords?) then (yes)
    :Replace with [REDACTED];
  endif
  if (Contains API keys?) then (yes)
    :Replace with [REDACTED];
  endif
}

partition "Generate Artifacts" {
  :Write mocks/users.json;
  note right
    Clean JSON fixture
    for test usage
  end note
  
  :Write tests/users.spec.ts;
  note right
    Playwright test with:
    * route interception
    * fixture loading
    * assertions
  end note
}

:Log success message;

stop

@enduml
```

### 3. Angular App Flow

```plantuml
@startuml
!theme plain

participant "Browser" as Browser
participant "AppComponent" as Component
participant "HttpClient" as Http
cloud "API" as API

Browser -> Component: Load app
activate Component

Component -> Component: ngOnInit()
Component -> Http: GET /users
activate Http

Http -> API: HTTPS Request
activate API
API --> Http: JSON Response
deactivate API

Http --> Component: Observable<User[]>
deactivate Http

Component -> Component: users$ = response
Component -> Browser: Render user list

note over Browser
  <ul>
    <li>Leanne Graham</li>
    <li>Ervin Howell</li>
    ...
  </ul>
end note

deactivate Component

@enduml
```

### 4. Playwright Test Flow

```plantuml
@startuml
!theme plain

participant "Test Runner" as Runner
participant "Browser Context" as Context
participant "Page" as Page
participant "Angular App" as App
database "users.json" as Fixture

Runner -> Runner: Read users.json fixture
activate Runner

Runner -> Context: Create browser context
activate Context

Context -> Page: await page.route('/users'...)
activate Page
note right
  Intercept ANY request
  matching /users pattern
end note

Page -> App: Navigate to localhost:4200
activate App

App -> Page: Fetch /users
Page -[#red]x App: <color red>Block real request</color>
Page -> Fixture: Read fixture
Fixture --> Page: JSON data
Page --> App: <color green>Fulfill with mock</color>

App -> App: Render UI with mocked data
deactivate App

Runner -> Page: await expect(page.locator('li')).toHaveCount(10)
Page --> Runner: ✓ Assertion passed

Runner -> Page: await expect(page.getByText('Leanne Graham')).toBeVisible()
Page --> Runner: ✓ Assertion passed

deactivate Page
deactivate Context
deactivate Runner

@enduml
```

## 🧩 Component Breakdown

### CLI Parser (cli/index.js)

**Purpose**: Transform HAR recordings into usable test fixtures.

**Key Functions**:

```javascript
parseHAR(harContent)
  ├─> Extract entries[]
  ├─> Find /users requests
  └─> Parse response JSON

redactSecrets(data)
  ├─> Regex match tokens/passwords/keys
  └─> Replace with [REDACTED]

generateFixture(data, outputPath)
  └─> Write JSON file

generateTest(endpoint, fixturePath, outputPath)
  └─> Write Playwright spec
```

**Input**: `sample.har` (Chrome HAR format)  
**Output**: 
- `angular-demo/mocks/users.json`
- `angular-demo/tests/users.spec.ts`

### Angular App

**Purpose**: Simple UI that demonstrates API consumption.

**Components**:

```typescript
AppComponent
  ├─> HttpClient.get<User[]>()
  ├─> users$ Observable
  └─> Template with *ngFor
```

**Why?**: Shows real API integration that can be tested with mocks.

### Playwright Test

**Purpose**: Automated testing with network interception.

**Key Concepts**:

```typescript
await page.route('**/users', async route => {
  // Intercept the request
  const fixture = JSON.parse(fs.readFileSync('mocks/users.json', 'utf-8'));
  // Fulfill with mock data instead of hitting real API
  await route.fulfill({ json: fixture });
});
```

**Benefits**:
- ⚡ Fast (no network calls)
- 🔒 Deterministic (same data every time)
- 📴 Offline (no internet needed)
- 🔐 Secure (no real credentials)

## 🔐 Security: Secret Redaction

The CLI automatically redacts common secret patterns:

```plantuml
@startuml
!theme plain

start

:Scan JSON object;

repeat
  :Check next field;
  
  if (Field name matches pattern?) then (yes)
    partition "Patterns" {
      if (token|apikey|password|secret?) then (yes)
        :Replace value with [REDACTED];
      endif
    }
  endif
  
repeat while (More fields?)

:Return sanitized JSON;

stop

@enduml
```

**Protected Patterns**:
- `Authorization` headers
- Fields named: `token`, `apiKey`, `password`, `secret`, `credential`
- Bearer tokens in strings

## 📊 Data Flow Diagram

```plantuml
@startuml
!theme plain

package "Development Time" {
  [Chrome Browser] --> [HAR File]
  [HAR File] --> [CLI Parser]
  [CLI Parser] --> [JSON Fixture]
  [CLI Parser] --> [Test Spec]
}

package "Runtime" {
  [Angular App] --> [Real API]
  [Real API] --> [Angular App]
}

package "Test Time" {
  [Playwright] --> [Angular App]
  [JSON Fixture] --> [Playwright]
  [Test Spec] --> [Playwright]
  [Angular App] ..> [Real API] : blocked
  note right of [Playwright]
    Intercepts network
    Serves fixture
  end note
}

@enduml
```

## 🎯 Design Decisions

### Why HAR Format?

- **Standard**: Chrome, Firefox, and most browsers support it
- **Complete**: Captures full request/response cycle
- **Easy**: Right-click to save, no special tools needed

### Why Generate Tests?

- **DRY**: Don't manually write boilerplate for each endpoint
- **Consistency**: All tests follow the same pattern
- **Speed**: Generate 100s of tests from one HAR file

### Why Playwright?

- **Modern**: Built-in network interception
- **Reliable**: Auto-waiting, no flaky tests
- **Cross-browser**: Test in Chromium, Firefox, WebKit

### Why Angular?

- **Popular**: Many teams use Angular
- **HttpClient**: Built-in, observable-based HTTP
- **Standalone**: No complex setup needed

## 🚀 Extending This Demo

### Add More Endpoints

```bash
# Generate fixtures for multiple endpoints
node cli/index.js my-app.har
```

The CLI will auto-detect all API calls and generate fixtures for each.

### Add Request Matching

Enhance Playwright tests to match request body:

```typescript
await page.route('**/users', async route => {
  const request = route.request();
  if (request.method() === 'POST') {
    // Serve different fixture for POST
  }
});
```

### Add Mock Server

Instead of Playwright interception, run a mock server:

```typescript
// Use MSW or json-server
json-server mocks/users.json --port 3000
```

## 📚 Further Reading

- [HAR Spec](http://www.softwareishard.com/blog/har-12-spec/)
- [Playwright Network](https://playwright.dev/docs/network)
- [Angular HttpClient](https://angular.io/guide/http)
- [Test Fixtures](https://martinfowler.com/bliki/TestFixture.html)

---

**Key Takeaway**: Automated test generation from real traffic = faster, more reliable tests!
