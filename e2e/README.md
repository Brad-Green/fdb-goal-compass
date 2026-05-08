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
  smoke.spec.ts           — app renders + survives reload
  README.md               — this file
```

Later phases will add:

- `add-goal.spec.ts` (Phase 3) — primary flow
- `edit-goal.spec.ts`, `empty-state.spec.ts` (Phase 4) — secondary flows
- Visual baselines (Phase 5) committed under
  `e2e/**/*-snapshots/<file>-<project>-<os>.png`
- Axe checks wired into each spec (Phase 6)

## Why no auth fixture?

The app is purely client-side with in-memory state in `useGoals`. There
is no login, no backend, no mock seam to wire through. Plain `page` is
sufficient.
