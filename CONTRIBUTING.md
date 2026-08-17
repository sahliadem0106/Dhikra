# Contributing

## Getting Started

```bash
git clone https://github.com/sahliadem0106/khalili.git
cd khalili
npm install
npm run dev
```

## Development Workflow

1. Create a feature branch from `main`
2. Make your changes
3. Run tests: `npx vitest run && npx playwright test`
4. Verify build: `npm run build`
5. Submit a pull request

## Code Style

- TypeScript strict mode enabled
- Use `const` over `let`
- Wrap all localStorage calls in try/catch
- Add `aria-label` to all icon-only buttons
- Use stable IDs for React keys, never array index
- Remove `console.log` before committing (keep `console.error` for catch blocks)

## Testing

- Vitest for pure logic (calculations, data transformation)
- Playwright for E2E (user flows, rendering, PWA)
- Add tests for any new features
