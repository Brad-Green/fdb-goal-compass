import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
export type { FieldDecoration } from "@/lib/types"

const inputVariants = cva(
  "flex w-full bg-background px-3 py-1 text-base shadow-sm transition-colors md:text-sm " +
  "rounded-md border border-input " +
  "placeholder:text-muted-foreground " +
  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring " +
  "aria-[invalid=true]:border-destructive " +
  "aria-[invalid=true]:ring-ring-error " +
  "disabled:cursor-not-allowed disabled:opacity-50 " +
  "file:border-0 file:bg-transparent file:font-medium file:text-foreground",
  {
    variants: {
      size: {
        regular: "h-10 px-3",
        large: "h-12 px-4 text-base",
        small: "h-9 px-2 text-sm",
        mini: "h-8 px-2 text-xs",
      },
      roundness: {
        default: "rounded-md",
        round: "rounded-full",
      },
      decoration: {
        none: "",
        leftIcon: "pl-9",
        rightIcon: "pr-9",
        both: "pl-9 pr-9",
      },
    },
    defaultVariants: {
      size: "regular",
      roundness: "default",
      decoration: "none",
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {}

const fileSizePadding: Record<string, string> = {
  mini: "h-auto py-1.5",
  small: "h-auto py-2",
  regular: "h-auto py-2.5",
  large: "h-auto py-3.5",
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      size,
      roundness,
      decoration,
      onChange,
      ...props
    },
    ref
  ) => {
    const resolvedSize = size ?? "regular"
    const resolvedRoundness = roundness ?? "default"
    const resolvedDecoration = decoration ?? "none"
    const isFile = type === "file"
    const [hasFile, setHasFile] = React.useState(false)

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isFile) setHasFile(!!e.target.files?.length)
        onChange?.(e)
      },
      [isFile, onChange]
    )

    return (
      <input
        type={type}
        className={cn(
          inputVariants({
            size: resolvedSize,
            roundness: resolvedRoundness,
            decoration: resolvedDecoration,
          }),
          isFile && fileSizePadding[resolvedSize],
          isFile && (hasFile ? "text-foreground" : "text-muted-foreground"),
          className
        )}
        ref={ref}
        onChange={handleChange}
        data-slot="input"
        data-size={resolvedSize}
        data-roundness={resolvedRoundness}
        data-decoration={resolvedDecoration}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"

export { Input, inputVariants }
