export const FAKE_NOW_ISO = "2026-05-04T12:00:00Z";
export const FAKE_NOW_MS = Date.parse(FAKE_NOW_ISO);

export const FAKE_NOW_QUARTER = "Q2 2026";

// Alternate clock: lands in Q1 2025, where the seeded goals (ids 1, 2, 3) live.
// Use for tests that need pre-seeded data in the "current quarter" section
// (e.g., editing an existing goal).
export const SEEDED_NOW_ISO = "2025-02-15T12:00:00Z";
export const SEEDED_NOW_QUARTER = "Q1 2025";
