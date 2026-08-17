# Testing

## Test Suite

| Tool | Tests | Status |
|---|---|---|
| Vitest | 2 | ✅ Pass |
| Playwright | 4 | ✅ Pass |

## Running Tests

```bash
npx vitest run                 # Unit tests (~1s)
npx playwright test            # E2E tests (~5s)
npx playwright show-report     # HTML report
```

## Test Files

- `src/__tests__/prayer-times.test.ts` — Prayer time calculation logic
- `e2e/auth.spec.ts` — App loads and renders
- `e2e/home.spec.ts` — Home page renders
- `e2e/pwa.spec.ts` — PWA manifest + service worker verification
