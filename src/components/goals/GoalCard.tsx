import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "./StatusBadge";
import { ProgressBar } from "./ProgressBar";
import type { Goal } from "@/types/goal";
import { statusLabels } from "@/types/goal";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface GoalCardProps {
  goal: Goal;
  onClick: () => void;
}

export function GoalCard({ goal, onClick }: GoalCardProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <Card
      role="button"
      tabIndex={0}
      aria-label={`${goal.title} — ${statusLabels[goal.status]}, ${goal.percentComplete}% complete`}
      className={cn(
        "group cursor-pointer motion-safe:transition-all motion-safe:duration-200",
        "hover:shadow-md hover:border-primary/20",
        "active:scale-[0.99]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      )}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <StatusBadge status={goal.status} />
              <span className="text-xs text-muted-foreground">
                {goal.quarter}
              </span>
            </div>
            <h3 className="font-semibold text-foreground truncate mb-2 group-hover:text-primary motion-safe:transition-colors">
              {goal.title}
            </h3>
            {goal.description && (
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {goal.description}
              </p>
            )}
            <ProgressBar value={goal.percentComplete} />
          </div>
          <ChevronRight
            className="h-5 w-5 text-muted-foreground group-hover:text-primary motion-safe:transition-colors flex-shrink-0 mt-1"
            aria-hidden="true"
          />
        </div>
      </CardContent>
    </Card>
  );
}
