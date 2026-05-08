import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import type { FieldDecoration } from "@/lib/types"
export type { FieldDecoration } from "@/lib/types"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const selectTriggerVariants = cva(
  "flex w-full items-center justify-between border border-input bg-background text-sm shadow-sm transition-colors " +
    "placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 " +
    "disabled:cursor-not-allowed disabled:opacity-50 data-[state=open]:ring-2 data-[state=open]:ring-ring " +
    "aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-ring-error aria-[invalid=true]:data-[state=open]:ring-ring-error",
  {
    variants: {
      size: {
        regular: "h-10 px-3",
        large: "h-12 px-4 text-base",
        small: "h-9 px-2 text-sm",
        mini: "h-8 px-2 text-xs",
      },
      lines: {
        one: "",
        two: "",
      },
      variant: {
        default: "",
        destructive:
          "border-destructive text-destructive focus:ring-ring-error data-[state=open]:ring-ring-error",
      },
      decoration: {
        none: "",
        leftIcon: "",
        rightIcon: "",
        both: "",
      },
      roundness: {
        default: "rounded-md",
        round: "rounded-full",
      },
    },
    defaultVariants: {
      size: "regular",
      lines: "one",
      variant: "default",
      decoration: "none",
      roundness: "default",
    },
    compoundVariants: [
      // 2-line variants need additional height + vertical padding.
      { size: "mini", lines: "two", className: "h-12 py-1.5 items-start" },
      { size: "small", lines: "two", className: "h-13 py-2 items-start" },
      { size: "regular", lines: "two", className: "h-14 py-2 items-start" },
      { size: "large", lines: "two", className: "h-16 py-3 items-start" },
    ],
  }
)

interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>,
    VariantProps<typeof selectTriggerVariants> {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  prepend?: React.ReactNode
  decoration?: FieldDecoration
}

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(
  (
    {
      className,
      size,
      lines,
      variant,
      decoration,
      roundness,
      leftIcon,
      rightIcon,
      prepend,
      children,
      ...props
    },
    ref
  ) => {
    const resolvedSize = size ?? "regular"
    const resolvedLines = lines ?? "one"
    const resolvedVariant = variant ?? "default"
    const resolvedRoundness = roundness ?? "default"

    // If icons are provided, infer decoration unless explicitly set.
    // This keeps Figma axes stable while allowing ergonomic usage.
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
      <SelectPrimitive.Trigger
        ref={ref}
        data-slot="select-trigger"
        className={cn(
          selectTriggerVariants({
            size: resolvedSize,
            lines: resolvedLines,
            variant: resolvedVariant,
            decoration: derivedDecoration,
            roundness: resolvedRoundness,
          }),
          className
        )}
        data-size={resolvedSize}
      data-lines={resolvedLines}
        data-variant={resolvedVariant}
        data-roundness={resolvedRoundness}
        data-decoration={derivedDecoration}
        {...props}
      >
        <span className="flex min-w-0 flex-1 items-center gap-2 text-left">
          {leftIcon ? <span className="shrink-0">{leftIcon}</span> : null}
          {prepend ? (
            <span
              data-slot="select-prepend"
              className="shrink-0 whitespace-nowrap text-muted-foreground"
            >
              {prepend}
            </span>
          ) : null}
          <span className="min-w-0 flex-1 truncate">{children}</span>
          {rightIcon ? <span className="shrink-0">{rightIcon}</span> : null}
        </span>
        <SelectPrimitive.Icon asChild>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
    )
  }
)
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    data-slot="select-scroll-up-button"
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName =
  SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    data-slot="select-scroll-down-button"
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      data-slot="select-content"
      className={cn(
        "relative z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-md",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        data-slot="select-viewport"
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    data-slot="select-label"
    className={cn("px-2 py-1.5 text-sm font-semibold", className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    data-slot="select-item"
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    data-slot="select-separator"
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
