import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const textareaVariants = cva(
  "flex min-h-textarea-md w-full bg-background px-3 py-2 text-sm shadow-sm " +
  "rounded-md border border-input " +
  "placeholder:text-muted-foreground " +
  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring " +
  "aria-[invalid=true]:border-destructive " +
  "aria-[invalid=true]:ring-ring-error " +
  "disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        regular: "min-h-textarea-md px-3 py-2",
        large: "min-h-textarea-lg px-4 py-3 text-base",
        small: "min-h-textarea-sm px-2 py-1.5 text-sm",
        mini: "min-h-textarea-mini px-2 py-1 text-xs",
      },
      roundness: {
        default: "rounded-md",
        round: "rounded-xl",
      },
    },
    defaultVariants: {
      size: "regular",
      roundness: "default",
    },
  }
)

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, size, roundness, ...props }, ref) => {
    const resolvedSize = size ?? "regular"
    const resolvedRoundness = roundness ?? "default"

    return (
      <textarea
        ref={ref}
        data-slot="textarea"
        className={cn(
          textareaVariants({ size: resolvedSize, roundness: resolvedRoundness }),
          className
        )}
        data-size={resolvedSize}
        data-roundness={resolvedRoundness}
        {...props}
      />
    )
  }
)

Textarea.displayName = "Textarea"

export { Textarea, textareaVariants }
