export type GoalStatus = "not-started" | "in-progress" | "complete" | "cancelled";

export interface Goal {
  id: string;
  title: string;
  description?: string;
  status: GoalStatus;
  percentComplete: number;
  comments?: string;
  quarter: string; // e.g., "Q1 2024"
  createdAt: Date;
  updatedAt: Date;
}

export const statusLabels: Record<GoalStatus, string> = {
  "not-started": "Not Started",
  "in-progress": "In Progress",
  "complete": "Complete",
  "cancelled": "Cancelled",
};
