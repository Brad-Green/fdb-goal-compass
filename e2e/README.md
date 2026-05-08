# E2E tests

Playwright specs for the Career Goals app. This folder holds end-to-end
tests that exercise the real app through a real Chromium browser.

## One-time setup

From the repo root:

```bash
CI=true pnpm install
pnpm exec playwright install chromium
```

`CI=true` is required on Windows shells without a TTY (e.g. running
pnpm from Claude Code or any non-interactive terminal).

## Running the suite

```bash
pnpm e2e                # headless, all projects, uses auto-started dev server
pnpm exec playwright test --ui           # interactive UI mode
pnpm exec playwright test smoke.spec.ts  # single spec
pnpm exec playwright show-report         # open the last HTML report
```

Playwright will auto-start `pnpm dev` on port 5173 when you run the
suite. Locally it reuses an already-running dev server; in CI it always
starts fresh.

## Layout

```
e2e/
  smoke.spec.ts                     — app renders + survives reload
  add-goal.spec.ts                  — primary flow: create a goal
  edit-goal.spec.ts                 — open detail sheet, change status/percent/comments
  past-quarter.spec.ts              — grouping + ordering of past quarters
  empty-state.spec.ts               — current-quarter empty message + add-to-recover
  visual.spec.ts                    — visual regression baselines
  visual.spec.ts-snapshots/         — committed baseline PNGs (per OS)
  fixtures/time.ts                  — shared frozen-clock constants
  README.md                         — this file
```

Later phases will add:

- Axe checks wired into each spec (Phase 6)
- `.github/workflows/ci.yml` running Vitest + Playwright on every PR (Phase 7)

## Visual regression baselines

`visual.spec.ts` captures deterministic screenshots and compares them
against committed PNGs in `e2e/visual.spec.ts-snapshots/`. Baseline
files are **OS-specific** — Playwright names them
`<shot>-chromium-<os>.png` (e.g. `-win32`, `-linux`). Both the Windows
files (captured locally) and the Linux files (captured by CI on first
run) are committed side-by-side.

### What's baselined

| Screenshot | Viewport | Clock | Purpose |
|---|---|---|---|
| `home-populated-desktop.png` | 1280×800 | Q1 2025 | 3 current + 2 past-quarter sections, full page |
| `home-empty-desktop.png` | 1280×800 | Q2 2026 | empty-state copy in current-quarter section |
| `home-populated-mobile.png` | 375×812 | Q1 2025 | text-level drift that desktop's 1% tolerance absorbs |
| `dialog-add-goal.png` | 1280×800 | Q2 2026 | Add Goal dialog, scoped to `role="dialog"` |
| `sheet-goal-detail.png` | 1280×800 | Q1 2025 | detail sheet open on the first seeded goal |

### Updating baselines after an intentional visual change

```bash
pnpm exec playwright test visual.spec.ts --update-snapshots
git add e2e/visual.spec.ts-snapshots
```

Review the generated PNGs before committing — `--update-snapshots`
accepts whatever the app currently renders, so a real regression
dressed up as an "update" will sail through.

### Why captures are stable

- `page.clock.install({ time: ... })` runs **before** `goto` so
  `Date.now()`, `new Date()`, and the derived "current quarter" header
  are pinned.
- `test.use({ locale: 'en-US', timezoneId: 'UTC' })` pins
  `toLocaleDateString()` output.
- Animations are disabled by Playwright's default
  `toHaveScreenshot({ animations: 'disabled' })`.
- `maxDiffPixelRatio: 0.01` is set globally in `playwright.config.ts`
  to tolerate sub-pixel AA noise.

## Why no auth fixture?

The app is purely client-side with in-memory state in `useGoals`. There
is no login, no backend, no mock seam to wire through. Plain `page` is
sufficient.
