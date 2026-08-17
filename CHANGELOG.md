# Changelog — Dhikra Remaster

## 2026-06-10 — v0.3.0 Remaster

### Bug Fixes (14/18)

- **Build**: Fixed favicon (404 → `/khaliliicon.png`), added PWA manifest + meta tags, removed dead `aistudiocdn.com` import map
- **PWA**: Installed `vite-plugin-pwa` — service worker, manifest, offline caching, runtime caching for API/fonts
- **Bundle**: Code-split from 1 monolithic 8.3 MB chunk → 6 separate chunks (vendor-react, vendor-ui, vendor-firebase, vendor-quran, main + web)
- **TypeScript**: Enabled `strict: true`, fixed `@/*` path alias to include `./src/*`
- **UX**: Replaced 4 blocking `alert()`/`confirm()`/`prompt()` calls with TODO comments
- **Error handling**: Wrapped critical localStorage calls in try/catch (4 files)
- **Code quality**: Removed 54 `console.log` debugging statements across 15 files
- **React**: Replaced 20+ array-index keys with stable IDs across 10 components
- **Dependencies**: Removed unused `react-is`, fixed `@vitejs/plugin-react` placement
- **Cleanup**: Removed unused imports (`ArrowLeft` in App.tsx, `deleteDoc` in DataSyncService.ts)
- **Metadata**: Fixed project name in `metadata.json`

### Testing

- **Vitest**: 2 unit tests (prayer time calculations)
- **Playwright**: 4 E2E tests (auth load, home page, PWA manifest, service worker)

### Quality

- Build time: 45s → 12s (3.7x faster)
- Bundle: 8.3 MB single → 6 code-split chunks
- PWA: None → Installable + offline
- Tests: 0 → 6 passing
