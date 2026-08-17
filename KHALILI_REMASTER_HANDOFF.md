# KHALILI UI REMASTER — HANDOFF BRIEF (Attempt 5 → Attempt 6)

> Read this ENTIRE file before touching any code. It tells you exactly what was already
> done in attempts 1-5 so you CONTINUE from there — do not redo foundations or done tasks.

## What this app is
Khalili — a **mobile-first** Islamic prayer app (Ionic + React + Tailwind + Capacitor).
Primary layout frame is a phone (max-width ~400px). Pixel-perfect at 375px mobile FIRST;
desktop/tablet is secondary.

## The non-negotiable working rule
Work **page-by-page, COMPLETELY**. A page is only "done" when it passes the full
Definition of Done below. Never spread effort thin. 100% of one page > 70% of all pages.
Do not silently move on from an imperfect page — report exactly what remains.

## Definition of Done (a page passes ONLY when ALL are true)
- □ No overlaps; nothing clips off-screen or under the bottom nav; no horizontal scrollbar at 375px.
- □ Layout intent correct: primary content gets most space, modals center and scroll within their sheet.
- □ Consistent gutters + vertical rhythm (4px spacing scale; no arbitrary p-3.5/m-5).
- □ Consistent typography scale across pages.
- □ Light + Dark mode both correct (mandatory).
- □ Arabic/RTL mirrors correctly (`dir="rtl"`, `rtl:space-x-reverse`, icon flips) — mandatory.
- □ Verify at 375px mobile (non-negotiable) AND desktop width (secondary).

## ✅ DONE — Phase 0 foundation (attempt 1)
1. Theme-aware tokens `brand-teal/mint/sand/gold/accent` in `tailwind.config.js` + CSS vars.
2. `shadow-soft`, `shadow-primary` added.
3. `Button.tsx` rewritten to `brand-primary` (fixes white-on-white in dark across 16+ comps).
4. `NotificationPermission` z-index `z-50` → `z-[120]`.

## ✅ DONE — Attempt 2 (Task 1 shell + Task 2 Home)
5. **Header.tsx** banner `from-brand-forest` → `from-emerald-900`.
6. **QadaTracker.tsx** semantic token fixes.
7. App shell + Home verified clean in dark + light.

## ✅ DONE — Attempt 3 (Task 3 Quran)
8. **QuranReader.tsx**: added missing **default export** (was crashing `React.lazy`).
9. **QuranReader.tsx**: `group-hover:bg-brand-forest` → `bg-brand-primary` (419/458).
10. **QuranAudioPlayer.tsx**: `bg-brand-forest` → `bg-brand-primary` (148/201/236).
11. **QuranReader.tsx**: reflection/notes textarea themed (dark-mode white-on-white fix).
12. **TafsirModal.tsx**: tab active-pill dark variant.

## ✅ DONE — Attempt 4 (Task 4 Partners)
13. Dark-mode cleanup across ChallengeCreator, FamilyDetails, TeenChallengeView,
    DuoDashboard, PartnerConnect, RequestsCenter, SuhbaDashboard.
14. Intentional hardcoded whites (do NOT "fix"): FamilyDetails.tsx:88 (white button),
    LostLambMarketplace.tsx:256 (toggle knob), ChallengeCreator.tsx:189 (small label).

## ✅ DONE — Attempt 5 (TASK 5 Stats page COMPLETE)
15. **AnalyticsPage.tsx**: period-selector track `bg-brand-sand` → added `dark:bg-white/5`
    (rest already guarded).
16. **HabitTrackerPage.tsx**: full semantic-token pass (was entirely unguarded) — header,
    TodayView, CalendarView, DayDetails modal, StatsView, AddHabitModal, TemplatesModal.
17. **StudySpacePage.tsx**: fixed unguarded `bg-white` cards/modals, `text-neutral-900`
    contrast bugs, invisible `border-white/10` in light, priority + blue-600 button contrast.

## ⚠️ KNOWN DARK-MODE BUG CLASS — keep scanning
Hardcoded `bg-neutral-*` / `bg-white` / `text-gray-*` with **no `dark:` variant** → invisible
text (white-on-white) in dark mode. Fix = replace with semantic tokens (`bg-brand-surface`,
`bg-brand-subtle`, `text-brand-forest`, `text-brand-muted`, `border-brand-border`), or add
`dark:` pairs. NOTE: some `bg-white` are intentional when they're a button/knob on a colored
surface or a fullscreen timer overlay — judge by context, don't blindly replace.

## THE OFFICIAL TASK LIST (work top to bottom, 100% each)
**TASK 6 — Profile page** (ProfilePage + profile/* settings: AppearanceSettings, EditProfile,
BadgesSection, HelpSupport, NotificationSettings, PrayerSettings, PrivacySettings).
⚠️ `bg-neutral-*` refs to fix: **NotificationSettings (31)**, ProfilePage (13), BadgesSection (4),
PrivacySettings (entire file unguarded). Also check DuaPage (part of profile flow).
⚠️ **CRITICAL — PRE-EXISTING TYPE ERRORS BLOCK THE BUILD**, all in Task 6 files:
   `DuaPage`, `OnboardingFlow`, `NotificationSettings`. Find and fix them — the build has
   been failing since before attempt 4 and these are the culprits. This is HIGH PRIORITY:
   a clean `tsc` build is part of every page's Definition of Done.

**TASK 7 — Modals/sheets + remaining components** (PrayerDetailModal, SettingsModal,
AuthModal, TasbihModal, onboarding/OnboardingFlow, shared/*Modal, LocationPicker,
GuidedTour, Skeleton, ErrorBoundary, SyncIndicator, Analytics, Hero).
⚠️ `bg-neutral-*` refs: SettingsModal (whole file unguarded), ZakatCalculator (9),
LocalisationSettings (1), BadgeToastProvider (1). Also verify BottomNav + remaining
QuranReader `bg-neutral-*` refs are correct, and QadaTracker travel card in dark.

## Useful technical facts
- **Theme key:** `localStorage` = `khalili_theme` (`light`/`dark`/`auto`, default `auto`).
- **Onboarding gate:** seed its localStorage key to bypass onboarding.
- **Guided tour / "Welcome Home" splash:** covers page on load — dismiss via next-step chevron.
- **Notification permission prompt:** covers content on load — dismiss "Not now".
- **Scroll container is the inner `<main>`, NOT the window** — scroll that element directly.
- **Layout:** app frame `max-w-xl`; content scrolls in `<main>` with `pb-32`; `BottomNav`
  floats `absolute` at `max-w-[400px]`. Content's bottom padding must clear the floating nav.
- **Geolocation blocked in headless** — PrayerCard shows "Set Your Location" empty state (expected).
- **Lazy-loaded pages can crash silently** if a component lacks a default export — if a route
  renders blank, check `React.lazy` + missing `export default` first.
- **Preview browser proxy can be flaky** — verify via `curl` on the dev server (200) if the
  browser won't attach; confirm the build compiles.
- Dev server is **Vite**; restart after `tailwind.config.js` edits to be safe.

## Verify workflow (per page, mandatory)
1. Open at 375px mobile → screenshot BEFORE. 2. Fix. 3. Screenshot AFTER.
4. Compare; if AFTER violates DoD, keep fixing — do NOT move on.
5. Repeat for dark mode, then Arabic/RTL.

## Per-page report format
```
Page: <name>
Status: DONE 100% | DONE with caveats (list) | BLOCKED (why)
What I fixed: <bullets>
Before/after: <screenshot links>
Remaining if any: <exact list>
```

## Final bar
If a page is only "ok-ish" but not pixel-clean and rhythm-consistent, it's a FAIL — keep
working. Prove the standard on each page before moving on.
