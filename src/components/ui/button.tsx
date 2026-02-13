import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import type { FieldDecoration } from "@/lib/types"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all " +
  "disabled:pointer-events-none disabled:opacity-50 " +
  "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 " +
  "outline-none focus-visible:border-ring focus-visible:ring-ring focus-visible:ring-[3px] " +
  "aria-[invalid=true]:ring-ring-error aria-[invalid=true]:border-destructive",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary-hover",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive-hover",
        ghostMuted: "text-muted-foreground hover:bg-muted",
      },
      size: {
        regular: "h-10 px-4 py-2",
        large: "h-12 px-6 text-base",
        small: "h-9 px-3 text-sm",
        mini: "h-8 px-2 text-xs",
      },
      roundness: {
        default: "rounded-md",
        round: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "regular",
      roundness: "default",
    },
  }
)

export interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  /**
   * Standardized "decoration" axis for Figma/Code Connect parity.
   *
   * This controls the value of `data-decoration` and should map 1:1 to a Figma
   * variant axis. Icon content is still provided via `leftIcon` / `rightIcon`.
   */
  decoration?: FieldDecoration
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      roundness,
      asChild = false,
      decoration,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"
    const resolvedVariant = variant ?? "primary"
    const resolvedSize = size ?? "regular"
    const resolvedRoundness = roundness ?? "default"

    const derivedDecoration: FieldDecoration =
      decoration ??
      (leftIcon && rightIcon
        ? "both"
        : leftIcon
          ? "leftIcon"
          : rightIcon
            ? "rightIcon"
            : "none")

    return (
      <Comp
        className={cn(
          buttonVariants({
            variant: resolvedVariant,
            size: resolvedSize,
            roundness: resolvedRoundness,
            className,
          })
        )}
        ref={ref}
        data-decoration={derivedDecoration}
        {...props}
      >
        {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
      </Comp>
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }
