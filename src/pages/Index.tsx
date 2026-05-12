import { useState, useMemo } from "react";
import { useGoals } from "@/hooks/useGoals";
import { GoalsSection } from "@/components/goals/GoalsSection";
import { GoalDetailSheet } from "@/components/goals/GoalDetailSheet";
import { AddGoalDialog } from "@/components/goals/AddGoalDialog";
import type { Goal } from "@/types/goal";
import { Target } from "lucide-react";

const Index = () => {
  const { currentGoals, pastGoals, currentQuarter, updateGoal, addGoal } =
    useGoals();
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  // Group past goals by quarter
  const pastGoalsByQuarter = useMemo(() => {
    const grouped: Record<string, Goal[]> = {};
    pastGoals.forEach((goal) => {
      if (!grouped[goal.quarter]) {
        grouped[goal.quarter] = [];
      }
      grouped[goal.quarter].push(goal);
    });
    // Sort quarters in descending order (most recent first)
    const sortedQuarters = Object.keys(grouped).sort((a, b) => {
      const [qA, yearA] = a.split(" ");
      const [qB, yearB] = b.split(" ");
      if (yearA !== yearB) return parseInt(yearB) - parseInt(yearA);
      return parseInt(qB.slice(1)) - parseInt(qA.slice(1));
    });
    return sortedQuarters.map((quarter) => ({
      quarter,
      goals: grouped[quarter],
    }));
  }, [pastGoals]);

  const handleSelectGoal = (goal: Goal) => {
    setSelectedGoal(goal);
    setSheetOpen(true);
  };

  const handleUpdateGoal = (id: string, updates: Partial<Goal>) => {
    updateGoal(id, updates);
    setSelectedGoal((prev) =>
      prev && prev.id === id ? { ...prev, ...updates } : prev
    );
    setAnnouncement("Goal updated");
  };

  const handleAddGoal = (
    goal: Omit<Goal, "id" | "createdAt" | "updatedAt">
  ) => {
    addGoal(goal);
    setAnnouncement(`Goal "${goal.title}" created`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Skip navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-2 focus:left-2 focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-md focus:text-sm focus:font-medium"
      >
        Skip to main content
      </a>

      {/* Screen reader announcements */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {announcement}
      </div>

      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center"
                aria-hidden="true"
              >
                <Target className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  Career Goalz
                </h1>
                <p className="text-sm text-muted-foreground">
                  {currentQuarter}
                </p>
              </div>
            </div>
            <AddGoalDialog
              quarter={currentQuarter}
              onAdd={handleAddGoal}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main
        id="main-content"
        className="container max-w-3xl mx-auto px-4 py-8 space-y-10"
      >
        <GoalsSection
          title={`Current Quarter (${currentQuarter})`}
          goals={currentGoals}
          onSelectGoal={handleSelectGoal}
          emptyMessage="No goals for this quarter yet. Click 'Add Goal' to create one."
        />

        {pastGoalsByQuarter.map(({ quarter, goals }) => (
          <GoalsSection
            key={quarter}
            title={quarter}
            goals={goals}
            onSelectGoal={handleSelectGoal}
          />
        ))}
      </main>

      {/* Goal Detail Sheet */}
      <GoalDetailSheet
        goal={selectedGoal}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        onUpdate={handleUpdateGoal}
      />
    </div>
  );
};

export default Index;
