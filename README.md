# Dhikra - ذكرى

Islamic daily companion app — prayer tracking, Quran reading, duas, tasbih, Qibla, prayer partners, suhba, family features, and more.

Built with **React + TypeScript + Vite + Tailwind CSS + Capacitor**.

## Features

- **Prayer Times** — Live Adhan API with caching and notifications
- **Quran Reader** — Full 114 surahs, audio playback, tafsir, reflections
- **Dua Collection** — Categorized duas with bookmarks and favorites
- **Tasbih** — Single and combo modes with goals
- **Qibla Finder** — Real compass + GPS bearing
- **Prayer Partners** — Duo dashboard, marketplace, requests
- **Suhba** — Spiritual companionship groups
- **Family Dashboard** — Challenges, teen view
- **Study Space** — Track learning goals
- **Habit Tracker** — Daily habit logging
- **Zakat Calculator** — Islamic wealth calculation
- **Analytics** — Streaks, heatmaps, khushu trends, barriers
- **Badges & Goals** — Gamification system
- **Authentication** — Firebase auth with Google provider
- **Push Notifications** — Firebase Cloud Messaging
- **PWA** — Installable, offline support with service worker

## Quick Start

```bash
npm install
npm run dev          # Dev server → http://localhost:3000
npm run build        # Production build
npx vite preview     # Preview build → http://localhost:4173
```

## Testing

```bash
npx vitest run               # Unit tests
npx playwright test          # E2E tests
npx playwright show-report   # Test report
```

## Build Stats

- Build time: ~12s
- Code-split chunks: 6 (vendor-react 11KB, vendor-ui 486KB, vendor-firebase 375KB, vendor-quran 3.2MB, main 3.9MB)
- PWA: Service worker + manifest
