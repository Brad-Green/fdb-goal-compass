import { GoalCard } from "./GoalCard";
import type { Goal } from "@/types/goal";

interface GoalsSectionProps {
  title: string;
  goals: Goal[];
  onSelectGoal: (goal: Goal) => void;
  emptyMessage?: string;
}

export function GoalsSection({
  title,
  goals,
  onSelectGoal,
  emptyMessage = "No goals yet",
}: GoalsSectionProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      {goals.length === 0 ? (
        <p className="text-sm text-muted-foreground py-8 text-center bg-muted/50 rounded-lg border border-dashed border-border">
          {emptyMessage}
        </p>
      ) : (
        <div className="grid gap-3">
          {goals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onClick={() => onSelectGoal(goal)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
