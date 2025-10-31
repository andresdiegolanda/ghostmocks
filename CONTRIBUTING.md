# Contributing to GhostMocks Demo

Thank you for your interest in contributing! This is a didactic demo project designed to teach the concept of HAR-based fixture generation.

## 🎯 Project Goals

This project aims to:
1. **Teach** - Show developers how to mock HTTP APIs for testing
2. **Demonstrate** - Provide a working, runnable example
3. **Inspire** - Give ideas for building similar tools

## 🤝 How to Contribute

### Reporting Issues

Found a bug or have a suggestion?

1. Check if the issue already exists
2. Create a new issue with:
   - Clear description
   - Steps to reproduce (if bug)
   - Expected vs actual behavior
   - Your environment (OS, Node version, etc.)

### Suggesting Enhancements

Ideas for improvement?

1. Open an issue with tag `enhancement`
2. Describe the use case
3. Explain how it helps the learning experience
4. Keep it simple and focused

### Code Contributions

#### What We're Looking For

- **Bug fixes** - Especially in CLI parsing or test generation
- **Documentation improvements** - Clearer explanations, better examples
- **Comments** - More inline comments for learning
- **Error handling** - Better error messages
- **Examples** - Additional sample HAR files

#### What to Avoid

- Complex dependencies (keep CLI dependency-free)
- Framework-specific code (keep it universal)
- Over-engineering (this is a teaching tool)
- Removing comments (they're for learning)

#### Process

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/my-improvement`
3. **Make** your changes
4. **Test** thoroughly:
   ```powershell
   npm run generate
   npm run start:app
   npm run test
   ```
5. **Commit** with clear messages: `git commit -m "Add: better error handling for invalid HAR"`
6. **Push** to your fork: `git push origin feature/my-improvement`
7. **Open** a Pull Request

#### Pull Request Guidelines

- **Title**: Clear, concise, descriptive
- **Description**: What, why, and how
- **Testing**: Show that it works
- **Documentation**: Update docs if needed
- **Comments**: Add inline comments for complex code

## 📝 Code Style

### JavaScript (CLI)

```javascript
// ✅ Good - Clear, commented, simple
/**
 * Parse HAR file and extract API responses
 * @param {Object} har - Parsed HAR object
 * @returns {Array} - Array of API response objects
 */
function extractApiResponses(har) {
  const entries = har.log?.entries || [];
  // Filter for JSON responses only
  return entries.filter(entry => {
    return entry.response?.content?.mimeType?.includes('json');
  });
}

// ❌ Bad - Obscure, uncommented, complex
const extractApiResponses = h => h.log?.entries?.filter(e => 
  e.response?.content?.mimeType?.includes('json')) || [];
```

### TypeScript (Angular)

```typescript
// ✅ Good - Typed, commented
/**
 * Fetch users from API
 * Returns an Observable that emits once with the user array
 */
ngOnInit(): void {
  this.users$ = this.http.get<User[]>(this.apiUrl);
}

// ❌ Bad - Untyped
ngOnInit() {
  this.users$ = this.http.get(this.apiUrl);
}
```

### Documentation

- Use **clear headings** with emojis
- Include **code examples**
- Show **before/after** for changes
- Add **Why?** explanations
- Keep it **conversational**

## 🧪 Testing

Before submitting:

1. **CLI Test**:
   ```powershell
   node cli/index.js sample.har
   # Should generate users.json and users.spec.ts
   ```

2. **App Test**:
   ```powershell
   npm run start:app
   # Should open on :4200 without errors
   ```

3. **E2E Test**:
   ```powershell
   npm run test
   # Should pass all tests
   ```

4. **Documentation Test**:
   - Read your docs as if you're a beginner
   - Follow your own instructions
   - Fix any confusion

## 📖 Documentation Standards

### README Updates

If your change affects usage:
1. Update `README.md`
2. Update relevant guide (`QUICKSTART.md`, `INSTALLATION.md`, etc.)
3. Update `COMMANDS.md` if adding commands
4. Update `ARCHITECTURE.md` if changing flow

### Code Comments

Every function should have:
```javascript
/**
 * Brief description (what it does)
 * 
 * Longer explanation (why it exists, how it works)
 * 
 * @param {Type} paramName - Description
 * @returns {Type} - Description
 */
```

### Commit Messages

Format: `Type: Brief description`

Types:
- `Add:` - New feature
- `Fix:` - Bug fix
- `Update:` - Change to existing feature
- `Docs:` - Documentation only
- `Refactor:` - Code restructuring
- `Test:` - Test changes
- `Chore:` - Maintenance

Examples:
```
Add: support for POST requests in CLI
Fix: HAR parsing error for missing headers
Update: improve test error messages
Docs: clarify installation steps for Windows
```

## 🎨 Design Principles

### 1. Keep It Simple

This is a teaching tool. Clarity > cleverness.

```javascript
// ✅ Good - Clear intent
for (const entry of entries) {
  if (isValidApiResponse(entry)) {
    responses.push(entry);
  }
}

// ❌ Bad - Too clever
responses = entries.filter(isValidApiResponse);
```

### 2. Minimize Dependencies

The CLI uses zero dependencies. Keep it that way.

```javascript
// ✅ Good - Built-in Node.js
const fs = require('fs');
const path = require('path');

// ❌ Bad - External dependency
const lodash = require('lodash');
```

### 3. Comment Everything

Assume the reader is learning.

```javascript
// ✅ Good - Explains why
// Redact secrets to prevent accidental exposure in fixtures
jsonString = jsonString.replace(secretPattern, '[REDACTED]');

// ❌ Bad - No context
jsonString = jsonString.replace(secretPattern, '[REDACTED]');
```

### 4. Demonstrate Best Practices

Show how it should be done.

```typescript
// ✅ Good - Proper error handling
this.users$.subscribe({
  next: (users) => console.log(`Loaded ${users.length} users`),
  error: (error) => console.error('Error loading users:', error)
});

// ❌ Bad - Silent failure
this.users$.subscribe(users => console.log(users));
```

## 🐛 Reporting Security Issues

Found a security vulnerability?

**DO NOT** open a public issue.

Instead:
1. Email the maintainer directly
2. Include details and reproduction steps
3. Wait for response before public disclosure

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Recognition

Contributors will be:
- Listed in `CONTRIBUTORS.md`
- Mentioned in release notes
- Credited in documentation

## ❓ Questions?

- Open an issue with tag `question`
- Email the maintainer
- Start a discussion

## 🎓 Learning Resources

New to HAR files?
- [HAR Spec](http://www.softwareishard.com/blog/har-12-spec/)
- [Chrome DevTools Network](https://developer.chrome.com/docs/devtools/network/)

New to Playwright?
- [Playwright Docs](https://playwright.dev)
- [Network Interception](https://playwright.dev/docs/network)

New to Angular?
- [Angular Docs](https://angular.io)
- [HttpClient Guide](https://angular.io/guide/http)

## 💡 Ideas for Contributors

Looking for something to work on?

### Beginner-Friendly

- Add more inline comments
- Improve error messages
- Add more examples to docs
- Test on different OS and report issues
- Fix typos

### Intermediate

- Support for GraphQL in HAR parsing
- Add request body matching in tests
- Generate fixtures for POST/PUT/DELETE
- Add CLI flags for customization
- Support for multiple HAR files

### Advanced

- Add React/Vue example apps
- Support for WebSocket HAR entries
- Generate MSW (Mock Service Worker) handlers
- Add CI/CD configuration examples
- Performance optimization for large HAR files

---

**Thank you for contributing to GhostMocks Demo!** 🎉

Your improvements help others learn better testing practices.
