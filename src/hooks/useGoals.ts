import { useState } from "react";
import type { Goal } from "@/types/goal";

const initialGoals: Goal[] = [
  {
    id: "1",
    title: "Complete React Certification",
    description:
      "Finish the advanced React patterns course and obtain certification to enhance frontend development skills.",
    status: "in-progress",
    percentComplete: 65,
    comments:
      "Completed modules 1-4. Module 5 on hooks patterns in progress.",
    quarter: "Q1 2025",
    createdAt: new Date("2025-01-02"),
    updatedAt: new Date("2025-01-10"),
  },
  {
    id: "2",
    title: "Lead Team Project Retrospective",
    description:
      "Organize and facilitate the quarterly retrospective meeting for the development team.",
    status: "not-started",
    percentComplete: 0,
    quarter: "Q1 2025",
    createdAt: new Date("2025-01-05"),
    updatedAt: new Date("2025-01-05"),
  },
  {
    id: "3",
    title: "Improve Code Review Turnaround",
    description:
      "Reduce average code review time from 48 hours to 24 hours.",
    status: "in-progress",
    percentComplete: 40,
    comments:
      "Implemented daily review blocks. Tracking improvements weekly.",
    quarter: "Q1 2025",
    createdAt: new Date("2025-01-03"),
    updatedAt: new Date("2025-01-08"),
  },
  {
    id: "4",
    title: "Complete Accessibility Audit",
    description:
      "Conduct a full WCAG 2.1 AA compliance audit of the main product dashboard.",
    status: "complete",
    percentComplete: 100,
    comments:
      "Audit completed. Findings documented and shared with the team.",
    quarter: "Q4 2024",
    createdAt: new Date("2024-10-15"),
    updatedAt: new Date("2024-12-20"),
  },
  {
    id: "5",
    title: "Mentor Junior Developer",
    description:
      "Provide weekly mentorship sessions to the new junior developer on the team.",
    status: "complete",
    percentComplete: 100,
    comments:
      "Successfully completed 12-week mentorship program. Developer is now working independently.",
    quarter: "Q4 2024",
    createdAt: new Date("2024-10-01"),
    updatedAt: new Date("2024-12-15"),
  },
  {
    id: "6",
    title: "Migrate Legacy API Endpoints",
    status: "cancelled",
    percentComplete: 25,
    comments:
      "Project deprioritized due to budget constraints. Will revisit in Q2.",
    quarter: "Q4 2024",
    createdAt: new Date("2024-10-20"),
    updatedAt: new Date("2024-11-30"),
  },
];

export function useGoals() {
  const [goals, setGoals] = useState<Goal[]>(initialGoals);

  const updateGoal = (id: string, updates: Partial<Goal>) => {
    setGoals((prev) =>
      prev.map((goal) =>
        goal.id === id
          ? { ...goal, ...updates, updatedAt: new Date() }
          : goal
      )
    );
  };

  const addGoal = (goal: Omit<Goal, "id" | "createdAt" | "updatedAt">) => {
    const newGoal: Goal = {
      ...goal,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setGoals((prev) => [newGoal, ...prev]);
    return newGoal;
  };

  const getCurrentQuarter = () => {
    const now = new Date();
    const quarter = Math.ceil((now.getMonth() + 1) / 3);
    return `Q${quarter} ${now.getFullYear()}`;
  };

  const currentQuarter = getCurrentQuarter();
  const currentGoals = goals.filter((g) => g.quarter === currentQuarter);
  const pastGoals = goals.filter((g) => g.quarter !== currentQuarter);

  return {
    goals,
    currentGoals,
    pastGoals,
    currentQuarter,
    updateGoal,
    addGoal,
  };
}
