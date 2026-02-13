# Career Goals (fdb-goal-compass)

A career goals tracker built with the FDB design system. Track quarterly goals with status, progress, and notes.

## Tech Stack

- **React 19** + **TypeScript** + **Vite 7**
- **Tailwind CSS v4** with FDB design tokens (`@brad-green/tokens`)
- **Radix UI** primitives (Dialog, Select, Slider, Label)
- **FDB UI Components** (Button, Input, Card, Sheet, Badge, etc.)
- **React Router v7** for routing
- **date-fns** for date formatting

## Prerequisites

- Node.js 20+
- pnpm
- A `GITHUB_TOKEN` environment variable with `read:packages` scope (for `@brad-green/tokens` from GitHub Packages)

## Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/Brad-Green/fdb-goal-compass.git
   cd fdb-goal-compass
   ```

2. Create `.npmrc` in the project root:
   ```
   @brad-green:registry=https://npm.pkg.github.com
   //npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
   ```

3. Install dependencies and start the dev server:
   ```bash
   pnpm install
   pnpm dev
   ```

## Project Structure

```
src/
├── components/
│   ├── goals/          # Goal-specific components
│   │   ├── AddGoalDialog.tsx
│   │   ├── GoalCard.tsx
│   │   ├── GoalDetailSheet.tsx
│   │   ├── GoalsSection.tsx
│   │   ├── ProgressBar.tsx
│   │   └── StatusBadge.tsx
│   └── ui/             # FDB design system components
├── hooks/
│   └── useGoals.ts     # Goals state management
├── lib/
│   ├── types.ts        # Shared types (Size, FieldDecoration)
│   └── utils.ts        # cn() utility
├── pages/
│   ├── Index.tsx        # Main goals page
│   └── NotFound.tsx     # 404 page
├── types/
│   └── goal.ts          # Goal type definitions
├── App.tsx              # Router
├── index.css            # Tailwind + token imports
└── main.tsx             # Entry point
```

## Accessibility

This app is built to WCAG 2.1 AA compliance:

- Keyboard-operable goal cards with focus indicators
- ARIA-labeled progress bars and status badges
- Skip navigation link
- Screen reader announcements for goal creation/updates
- Color contrast meets 4.5:1 AA ratio for all text
- `prefers-reduced-motion` respected on all animations
- 44px minimum touch targets on interactive elements

## Design Tokens

Status colors are mapped to existing FDB design tokens (no custom tokens):

| Status | Token |
|--------|-------|
| Not Started | `muted-foreground` |
| In Progress | `info` |
| Complete | `success` |
| Cancelled | `destructive` |
| Progress bar | `primary` (fill), `muted` (track) |
