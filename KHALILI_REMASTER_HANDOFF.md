# KHALILI UI REMASTER — HANDOFF BRIEF (Attempt 6 → Attempt 7 — FINAL TASK)

> Read this ENTIRE file before touching any code. It tells you exactly what was already
> done in attempts 1-6 so you CONTINUE from there — do not redo foundations or done tasks.
> **This is the last task.** After Task 7, every page should pass the Definition of Done.

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
1. Theme-aware tokens `brand-teal/mint/sand/gold/accent` + CSS vars.
2. `shadow-soft`, `shadow-primary` added.
3. `Button.tsx` rewritten to `brand-primary`.
4. `NotificationPermission` z-index `z-50` → `z-[120]`.

## ✅ DONE — Attempt 2 (Task 1 shell + Task 2 Home)
5. Header banner dark fix. 6. QadaTracker tokens. 7. Shell + Home verified both themes.

## ✅ DONE — Attempt 3 (Task 3 Quran)
8. QuranReader default export (React.lazy crash). 9-10. brand-forest→brand-primary. 11. textarea. 12. TafsirModal pill.

## ✅ DONE — Attempt 4 (Task 4 Partners)
13. Dark cleanup: ChallengeCreator, FamilyDetails, TeenChallengeView, DuoDashboard, PartnerConnect, RequestsCenter, SuhbaDashboard.

## ✅ DONE — Attempt 5 (Task 5 Stats)
14. AnalyticsPage, HabitTrackerPage (full pass), StudySpacePage.

## ✅ DONE — Attempt 6 (Task 6 Profile) + THE BUILD IS NOW FIXED
15. **Fixed the 3 build-blocking type errors** (build was broken since before attempt 4):
    - `DuaPage.tsx` — non-existent `.id` key
    - `OnboardingFlow.tsx` — `language` not destructured from `useLanguage()`
    - `NotificationSettings.tsx` — `defaultScope` typed as `SocialScope`
    **VERIFIED: `npx tsc --noEmit` = 0 errors, `vite build` succeeds.** ✓
16. Task 6 dark cleanup: ProfilePage, AppearanceSettings, PrayerSettings, HelpSupport,
    PrivacySettings, DuaPage translation text.

## THE FINAL TASK — TASK 7 (Modals/sheets + remaining components)
Work these top to bottom at 100% each. **Verified remaining `bg-white` (unguarded, no `dark:`
on same line):**
- **onboarding/OnboardingFlow.tsx — 13 unguarded `bg-white`** (the biggest remaining chunk)
- **SettingsModal.tsx — 4 unguarded `bg-white`**
- **PrayerDetailModal.tsx — 1 unguarded `bg-white`**
- **GuidedTour.tsx — 1 unguarded `bg-white`**
- ZakatCalculator, LocalisationSettings, BadgeToastProvider, AuthModal, TasbihModal,
  LocationPicker, SyncIndicator, Analytics, Hero: **already guarded/clean** — verify only.

Components in scope: PrayerDetailModal, SettingsModal, AuthModal, TasbihModal,
**onboarding/OnboardingFlow**, shared/*Modal (CreateGroupModal, JoinGroupModal,
ShareInviteModal, Toast), LocationPicker, GuidedTour, Skeleton, ErrorBoundary,
SyncIndicator, Analytics, Hero.
Also verify: QadaTracker travel-mode card in dark; BottomNav; remaining QuranReader `bg-neutral-*`.

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
  browser won't attach; confirm the build compiles (`npx tsc --noEmit` should be 0).
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
working. Prove the standard on each page before moving on. This is the LAST task — after
it, the whole app should pass the Definition of Done.
