import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  className?: string;
  showLabel?: boolean;
}

/**
 * Progress bar using FDB tokens:
 * - Track background → muted (matches design token)
 * - Fill → primary (FDB official purple)
 */
export function ProgressBar({
  value,
  className,
  showLabel = true,
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Progress: ${clampedValue} percent`}
        className="flex-1 h-2 bg-muted rounded-full overflow-hidden"
      >
        <div
          className="h-full bg-primary rounded-full motion-safe:transition-all motion-safe:duration-300 ease-out"
          style={{ width: `${clampedValue}%` }}
        />
      </div>
      {showLabel && (
        <span
          className="text-sm font-medium text-muted-foreground min-w-[3ch] text-right"
          aria-hidden="true"
        >
          {clampedValue}%
        </span>
      )}
    </div>
  );
}
