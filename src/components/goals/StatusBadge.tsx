import { Badge } from "@/components/ui/badge";
import { type GoalStatus, statusLabels } from "@/types/goal";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: GoalStatus;
  className?: string;
}

/**
 * Status-color mapping uses existing FDB design tokens:
 * - not-started  → muted-foreground (neutral gray)
 * - in-progress  → info (blue-500)
 * - complete     → success (green-600)
 * - cancelled    → destructive (red-600)
 */
const statusStyles: Record<GoalStatus, string> = {
  "not-started": "bg-muted text-muted-foreground border-muted",
  "in-progress":
    "bg-info/10 text-info border-info/30",
  complete:
    "bg-success/10 text-success border-success/30",
  cancelled:
    "bg-destructive/10 text-destructive border-destructive/30",
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "font-medium text-xs px-2 py-0.5",
        statusStyles[status],
        className
      )}
    >
      {statusLabels[status]}
    </Badge>
  );
}
