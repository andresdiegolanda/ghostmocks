# 10-Minute Demo Script

A presenter's guide to the GhostMocks Demo.

## 🎬 Before You Start

### Prerequisites
- [ ] Node.js installed
- [ ] Dependencies installed (`npm install` in both root and angular-demo/)
- [ ] Playwright browsers installed (`npx playwright install chromium`)
- [ ] Port 4200 is available
- [ ] Internet connection available (for initial demo)

### Terminal Setup
Open 3 terminals:
1. **Terminal 1**: For CLI commands
2. **Terminal 2**: For Angular app
3. **Terminal 3**: For Playwright tests

### Browser Setup
- Open Chrome with DevTools ready
- Bookmark: https://jsonplaceholder.typicode.com/users
- Have the project folder open in VS Code

---

## 🎤 Script: 10-Minute Demo

### [0:00 - 1:30] Introduction (90 seconds)

**Say:**
> "Hi everyone! Today I'm going to show you a better way to test applications that depend on external APIs. The problem we're solving: API tests are slow, flaky, and require internet connection. They break when the API changes, and they can't run offline. Let me show you a solution."

**Do:**
- Open the project in VS Code
- Show the README.md briefly

**Key Points:**
- Testing against live APIs = slow, unreliable
- Solution: Record once, mock forever
- Works with any API, any framework

---

### [1:30 - 3:30] Recording Phase (2 minutes)

**Say:**
> "Step one is recording real API traffic. Let's capture what a real API call looks like using Chrome's built-in HAR recorder."

**Do:**
1. Open Chrome and navigate to https://jsonplaceholder.typicode.com/users
2. Open DevTools (F12)
3. Go to Network tab
4. Refresh the page
5. Show the `/users` request
   - Click on it
   - Show Preview tab (JSON data)
   - Show Response tab (raw data)
6. Right-click in Network panel → "Save all as HAR with content"
7. Save as `demo-recording.har` in project root

**Say:**
> "HAR stands for HTTP Archive - it's a standard format that captures everything: requests, responses, headers, timing. Chrome, Firefox, and all major browsers support it. This `sample.har` file already contains a recording, so we don't have to wait."

**Show:**
- Open `sample.har` in VS Code
- Scroll through to show the structure (don't deep dive)
- Point out the "text" field with JSON data

**Key Points:**
- HAR = standard format (not proprietary)
- Captures complete request/response cycle
- Works with any site, any API
- One-time recording

---

### [3:30 - 5:00] Generation Phase (90 seconds)

**Say:**
> "Now the magic happens. We parse the HAR file and automatically generate test fixtures and test specs."

**Do:**
```powershell
# Terminal 1
node cli/index.js sample.har
```

**Show:**
- Console output showing:
  ```
  🔍 Reading HAR file: sample.har
  🔄 Processing HAR entries...
    ✓ Found API response: GET /users
  Processing: GET users
    ✓ Generated fixture: angular-demo/mocks/users.json
    ✓ Generated test: angular-demo/tests/users.spec.ts
  ✅ Generation complete!
  ```

**Open Files:**
1. `angular-demo/mocks/users.json`
   - Show it's clean JSON
   - Point out: "Notice - no sensitive data, ready for git"

2. `angular-demo/tests/users.spec.ts`
   - Show the `page.route()` call (line ~32)
   - Show the `route.fulfill()` call (line ~37)
   - Say: "This intercepts network requests and returns our fixture instead"

**Say:**
> "In 2 seconds, we got a JSON fixture and a complete test spec. The CLI automatically redacted any secrets like API keys or tokens. This test is ready to run."

**Key Points:**
- Automated generation (no manual work)
- Secrets automatically redacted
- Test boilerplate written for you
- Repeatable for 100+ endpoints

---

### [5:00 - 7:00] Development Phase (2 minutes)

**Say:**
> "Let's see the real app running against the real API."

**Do:**
```powershell
# Terminal 2
npm run start:app
```

**Wait for:**
```
✔ Compiled successfully.
```

**Do:**
- Open browser to http://localhost:4200
- Show the user list loading
- Open browser DevTools → Network tab
- Refresh page
- Show the actual network call to `jsonplaceholder.typicode.com/users`

**Say:**
> "This is a real Angular app making a real HTTP call to JSONPlaceholder. In production, this is what you want. But in tests? This is slow and unreliable."

**Show in VS Code:**
- `angular-demo/src/app/app.component.ts`
  - Line ~28: `private apiUrl = 'https://jsonplaceholder.typicode.com/users';`
  - Line ~34: `this.users$ = this.http.get<User[]>(this.apiUrl);`

**Say:**
> "Standard Angular code. HttpClient makes a GET request, returns an Observable, we display it with the async pipe. Nothing special - this is how everyone does it."

**Key Points:**
- Real API calls in development
- Standard Angular patterns
- No mocking code in the app
- App doesn't know about tests

---

### [7:00 - 9:00] Testing Phase (2 minutes)

**Say:**
> "Now here's where it gets interesting. Watch what happens when we run the tests."

**Do:**
```powershell
# Terminal 3
cd angular-demo
npm test
```

**Show:**
- Tests starting
- Browser launching (in headless mode)
- Tests passing with green checkmarks
- Console output showing:
  ```
  🎭 Intercepted request to /users
  ✓ Found 10 items rendered
  ✓ Verified first item: Leanne Graham
  ```

**Say:**
> "Notice how fast that was? No network delay. Let me show you what's happening."

**Open:**
- `angular-demo/tests/users.spec.ts`

**Explain (point at code):**
```typescript
// Line ~22: Load fixture from disk
const fixtureData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../mocks/users.json'), 'utf-8')
);

// Line ~32: Intercept network requests
await page.route('**/users', async route => {
  // Line ~37: Return fixture instead of real API
  await route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify(fixtureData)
  });
});
```

**Say:**
> "Playwright intercepts the network request before it leaves the browser. The Angular app thinks it's talking to the real API, but Playwright returns our fixture instead. The app code doesn't change - we just control what it sees during tests."

**Run with UI Mode:**
```powershell
npm test -- --ui
```

**Show:**
- Playwright UI opening
- Click "users API" test
- Click "should display users from fixture"
- Show the trace/timeline
- Point out: No network requests to jsonplaceholder.typicode.com

**Key Points:**
- Tests run in 2-3 seconds (vs. 10+ with real API)
- Deterministic (same data every time)
- Offline (no internet needed)
- App code unchanged

---

### [9:00 - 10:00] Wrap-up & Q&A (60 seconds)

**Say:**
> "So let's recap what we just saw:"

**Recap (show fingers for counting):**
1. **Record** - Capture real traffic with Chrome HAR (30 seconds)
2. **Generate** - Parse HAR, create fixtures and tests (2 seconds)
3. **Develop** - App uses real API (normal development)
4. **Test** - Playwright intercepts with fixtures (fast, reliable)

**Benefits:**
- ⚡ **10x faster tests** (no network calls)
- 🔒 **Deterministic** (same data every run)
- 📴 **Offline** (no internet needed)
- 🔐 **Secure** (no real credentials in tests)
- 🤖 **Automated** (generate 100s of tests)
- 💰 **Cost effective** (no test API infrastructure)

**Say:**
> "This pattern works with any framework - React, Vue, .NET, Java. The HAR format is universal. The CLI is 200 lines of JavaScript with zero dependencies. And Playwright supports all modern browsers."

**Next Steps:**
> "Try it yourself: record a HAR from your app, run the CLI, and you'll have working tests in minutes. All the code is in the repo with detailed docs."

**Open for Questions:**
> "Any questions?"

---

## 🎯 Common Questions & Answers

**Q: What if the API response changes?**
> "Just record a new HAR and regenerate fixtures. Takes 30 seconds. Your tests automatically update."

**Q: Does this work with POST/PUT/DELETE requests?**
> "Yes! The CLI extracts all HTTP methods. You can extend the test to match request body/headers."

**Q: What about authentication?**
> "The CLI automatically redacts tokens/passwords. Review generated fixtures before committing."

**Q: Can I use this in CI/CD?**
> "Absolutely! No external dependencies, runs offline, super fast. Perfect for CI."

**Q: What if I have 100 endpoints?**
> "Record a HAR with all your app's traffic, run the CLI once, get 100 fixtures + tests."

**Q: Does this work with GraphQL?**
> "Yes! HAR captures the full request/response. You'll get the GraphQL response as a fixture."

**Q: Can I edit the fixtures?**
> "Yes! They're just JSON files. Edit them for edge cases, error states, etc."

**Q: Do I need Playwright? Can I use Jest/Vitest?**
> "The fixtures work with any test framework. Playwright just makes network interception easy."

**Q: What about WebSockets?**
> "HAR captures WebSocket frames too. You'd need to extend the CLI parser."

**Q: How do I handle dynamic data like timestamps?**
> "Use Playwright's expect matchers: `expect(text).toMatch(/\d{4}-\d{2}-\d{2}/)`"

---

## 🎨 Presentation Tips

### Visual Aids
- Use split screen: code on left, browser on right
- Increase font size (min 16pt)
- Use high contrast theme
- Zoom browser to 125%

### Pacing
- Speak slowly and clearly
- Pause after each phase
- Give audience time to absorb
- Don't rush through code

### Engagement
- Ask: "Have you experienced flaky API tests?"
- Ask: "Who here tests against production APIs?"
- Pause for "aha!" moments

### Body Language
- Face the audience (not the screen)
- Use hand gestures to emphasize points
- Smile and maintain energy
- Make eye contact

### Technical Tips
- Test everything beforehand
- Have backup terminal commands ready
- Close unnecessary apps (CPU-intensive)
- Disable notifications
- Use presenter mode if available

---

## 🚨 If Something Goes Wrong

### Port 4200 in use
```powershell
Get-NetTCPConnection -LocalPort 4200 | Select-Object OwningProcess
Stop-Process -Id <PID>
```

### Tests fail
```powershell
# Fallback: show the test file and explain what WOULD happen
# "In a perfect world, we'd see..."
```

### App won't start
```powershell
# Fallback: show screenshot/recording of working app
# Have backup screenshots in docs/screenshots/
```

### Node.js not working
- Have Node.js installer ready
- Or demo from a pre-recorded video

### Internet down
- Good news: The offline tests still work!
- Use this as a teaching moment

---

## 📸 Backup Materials

Have these ready:

1. **Screenshots** of each phase
2. **Recording** of full demo (as backup)
3. **Slides** with key points
4. **Printed** code snippets
5. **QR code** to GitHub repo

---

## ✅ Post-Demo Checklist

After the demo:
- [ ] Share GitHub repo link
- [ ] Share INSTALLATION.md
- [ ] Offer to help with setup
- [ ] Collect feedback
- [ ] Answer follow-up questions

---

**Good luck! You've got this! 🎉**
