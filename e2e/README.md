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
  smoke.spec.ts                     — app renders + survives reload (+ axe at steady state)
  add-goal.spec.ts                  — primary flow: create a goal (+ axe on open dialog)
  edit-goal.spec.ts                 — open detail sheet, change status/percent/comments (+ axe on open sheet)
  past-quarter.spec.ts              — grouping + ordering of past quarters (+ axe)
  empty-state.spec.ts               — current-quarter empty message + add-to-recover (+ axe)
  visual.spec.ts                    — visual regression baselines
  visual.spec.ts-snapshots/         — committed baseline PNGs (per OS)
  fixtures/time.ts                  — shared frozen-clock constants
  fixtures/axe.ts                   — expectNoAxeViolations() helper + allowlist
  README.md                         — this file
```

## Accessibility (axe)

Every E2E spec ends with a steady-state `expectNoAxeViolations(page)`
scan (`fixtures/axe.ts`), scoped to the
`wcag2a / wcag2aa / wcag21a / wcag21aa` tag set.

Component-level axe scans also live alongside each page-level
component test (via `vitest-axe`). The two layers catch different
things: component axe runs in jsdom (no color computation), E2E axe
runs in real Chromium (catches contrast issues).

Current allowlist (in `fixtures/axe.ts`):

| Rule | Surface | Reason | Follow-up |
|---|---|---|---|
| `color-contrast` | `--muted-foreground` (slate-500) on card metadata, slider ticks, dialog descriptions | 4.48:1 on slate-50, just under the 4.5:1 AA threshold | Darken `--muted-foreground` to slate-600 in `src/index.css` and remove this entry |

## Continuous integration

`.github/workflows/ci.yml` runs on every PR and on pushes to `master`:

- **Job 1 — Lint, type-check, unit**: `pnpm lint`, `pnpm build`
  (runs `tsc -b && vite build`), `pnpm test:run`.
- **Job 2 — Playwright E2E + visual + axe**: caches
  `~/.cache/ms-playwright` keyed on the lockfile, runs `pnpm e2e`.

Artifacts:

- `playwright-report/` uploaded on every run (pass or fail).
- `test-results/` and `e2e/**-snapshots/**` uploaded on failure only.
  The snapshots artifact is how Linux baselines were bootstrapped
  initially — see the visual-baselines section below.

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

On your local OS:

```bash
pnpm exec playwright test visual.spec.ts --update-snapshots
git add e2e/visual.spec.ts-snapshots
```

Review the generated PNGs before committing — `--update-snapshots`
accepts whatever the app currently renders, so a real regression
dressed up as an "update" will sail through.

### Updating the Linux baselines (when you're not on Linux)

If you only updated the `-win32.png` files locally, CI on Ubuntu will
fail the visual specs because the `-linux.png` baselines no longer
match. To regenerate them without Docker:

1. Push your branch. The Playwright job will fail.
2. Download the `playwright-snapshots` artifact from that failed run
   (uploaded automatically on failure).
3. Copy the fresh `*-chromium-linux.png` files into
   `e2e/visual.spec.ts-snapshots/`, commit, and push.

Playwright picks the correct file per run via `process.platform`, so
both OSes stay in sync once both sets are committed.

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
