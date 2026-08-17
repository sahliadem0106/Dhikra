# UI Bugs Reported In This Session

This file contains only the **UI/UX bugs and issues you reported** in this chat (auth/sign-in issues excluded).

## Reported Issues

- [ ] **Status bar overlap across screens**
  - Back arrow/header content appears too high and overlaps the phone status bar (time, battery, Wi-Fi area).
  - Reported as affecting multiple sections, not just one page.

- [ ] **Timer screen layout breakage**
  - Focus timer fullscreen layout looked broken/clipped with oversized digits and misplaced controls.

- [ ] **Bottom nav jumps up when keyboard opens**
  - On input fields (e.g., Zakat USD input), keyboard opening pushes bottom nav upward.
  - Later confirmed this happens in multiple places: features with typing such as **new task**, **new habit**, **new card**, and similar input-heavy flows.

- [ ] **Floating green `+` button shifts when keyboard opens**
  - The green floating action button should not move upward when keyboard appears.
  - Requested this behavior to be fixed globally across tools/pages.

- [ ] **Dua page title key shown literally**
  - Header showed `dua_title` instead of a translated human-readable title.

- [ ] **Profile display inconsistency after onboarding**
  - Profile page showed Google account image/name or `Guest` instead of the custom form identity.
  - You expected: onboarding name (first + last) and your chosen icon style.

- [ ] **Onboarding location not reflected immediately in Home**
  - After completing form, Home did not use selected location automatically for prayer/location display.
  - You had to set location again manually.

- [ ] **Qibla finder perceived as inaccurate**
  - Direction not consistently matching expected real-world bearing; requested stronger implementation logic.

- [ ] **Quran bookmark behavior is not efficient**
  - You flagged bookmark UX/logic as inefficient and requested audit and improvement.

- [ ] **General smoothness / low-FPS feel**
  - App felt less smooth during interactions/animations compared to expected high-refresh behavior.

## Notes

- This list reflects your **reported** UI issues in this session.
- Auth/login failures were intentionally excluded per your request.
