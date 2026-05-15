import type { Goal } from "@/types/goal";

export const FROZEN_NOW = new Date("2026-05-04T12:00:00Z");

export const goalInProgress: Goal = {
  id: "fixture-1",
  title: "Complete React Certification",
  description: "Finish the advanced React patterns course.",
  status: "in-progress",
  percentComplete: 65,
  comments: "Modules 1-4 done.",
  quarter: "Q2 2026",
  createdAt: new Date("2026-04-02T10:00:00Z"),
  updatedAt: new Date("2026-04-20T10:00:00Z"),
};

export const goalNotStarted: Goal = {
  id: "fixture-2",
  title: "Lead Retrospective",
  status: "not-started",
  percentComplete: 0,
  quarter: "Q2 2026",
  createdAt: new Date("2026-04-05T10:00:00Z"),
  updatedAt: new Date("2026-04-05T10:00:00Z"),
};

export const goalComplete: Goal = {
  id: "fixture-3",
  title: "Accessibility Audit",
  description: "WCAG 2.1 AA audit of dashboard.",
  status: "complete",
  percentComplete: 100,
  quarter: "Q4 2025",
  createdAt: new Date("2025-10-15T10:00:00Z"),
  updatedAt: new Date("2025-12-20T10:00:00Z"),
};

export const goalCancelled: Goal = {
  id: "fixture-4",
  title: "Legacy API Migration",
  status: "cancelled",
  percentComplete: 25,
  quarter: "Q4 2025",
  createdAt: new Date("2025-10-20T10:00:00Z"),
  updatedAt: new Date("2025-11-30T10:00:00Z"),
};
