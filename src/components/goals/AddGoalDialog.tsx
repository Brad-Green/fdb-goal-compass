import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import type { Goal } from "@/types/goal";

interface AddGoalDialogProps {
  quarter: string;
  onAdd: (goal: Omit<Goal, "id" | "createdAt" | "updatedAt">) => void;
}

export function AddGoalDialog({ quarter, onAdd }: AddGoalDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({
      title: title.trim(),
      description: description.trim() || undefined,
      status: "not-started",
      percentComplete: 0,
      quarter,
    });

    setTitle("");
    setDescription("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add Goal
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Goal</DialogTitle>
            <DialogDescription>
              Create a new goal for {quarter}. You can add more details
              later.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="new-title">Title *</Label>
              <Input
                id="new-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Complete project milestone"
                autoFocus
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-description">
                Description (optional)
              </Label>
              <Textarea
                id="new-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add details about this goal..."
                rows={3}
                className="resize-none"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!title.trim()}>
              Create Goal
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
