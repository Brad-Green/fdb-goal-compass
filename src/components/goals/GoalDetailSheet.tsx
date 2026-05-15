import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatusBadge } from "./StatusBadge";
import { type Goal, type GoalStatus, statusLabels } from "@/types/goal";
import { format } from "date-fns";

interface GoalDetailSheetProps {
  goal: Goal | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: (id: string, updates: Partial<Goal>) => void;
}

const statusOptions: GoalStatus[] = [
  "not-started",
  "in-progress",
  "complete",
  "cancelled",
];

export function GoalDetailSheet({
  goal,
  open,
  onOpenChange,
  onUpdate,
}: GoalDetailSheetProps) {
  if (!goal) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <StatusBadge status={goal.status} />
            <span className="text-xs text-muted-foreground">
              {goal.quarter}
            </span>
          </div>
          <SheetTitle className="text-xl">{goal.title}</SheetTitle>
          <SheetDescription>
            Last updated {format(goal.updatedAt, "MMM d, yyyy")}
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={goal.title}
              onChange={(e) =>
                onUpdate(goal.id, { title: e.target.value })
              }
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              value={goal.description || ""}
              onChange={(e) =>
                onUpdate(goal.id, { description: e.target.value })
              }
              placeholder="Add a detailed description..."
              rows={4}
              className="resize-none"
            />
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={goal.status}
              onValueChange={(value: string) =>
                onUpdate(goal.id, { status: value as GoalStatus })
              }
            >
              <SelectTrigger id="status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((status) => (
                  <SelectItem key={status} value={status}>
                    {statusLabels[status]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Percent Complete */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="progress">Progress</Label>
              <span className="text-sm font-semibold text-primary">
                {goal.percentComplete}%
              </span>
            </div>
            <Slider
              id="progress"
              aria-label="Progress"
              value={[goal.percentComplete]}
              onValueChange={([value]: number[]) =>
                onUpdate(goal.id, { percentComplete: value })
              }
              max={100}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Comments */}
          <div className="space-y-2">
            <Label htmlFor="comments">Comments (optional)</Label>
            <Textarea
              id="comments"
              value={goal.comments || ""}
              onChange={(e) =>
                onUpdate(goal.id, { comments: e.target.value })
              }
              placeholder="Add notes or updates..."
              rows={4}
              className="resize-none"
            />
          </div>

          {/* Metadata */}
          <div className="pt-4 border-t border-border">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>
                Created: {format(goal.createdAt, "MMM d, yyyy")}
              </span>
              <span>
                Updated: {format(goal.updatedAt, "MMM d, yyyy")}
              </span>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
