import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        "ring-error": "hsl(var(--ring-error))",
        backdrop: "hsl(var(--backdrop))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        "primary-hover": "hsl(var(--primary-hover))",
        "primary-subtle": "hsl(var(--primary) / 0.1)",
        "primary-soft": "hsl(var(--primary) / 0.2)",
        "primary-border-subtle": "hsl(var(--primary) / 0.5)",
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        "secondary-hover": "hsl(var(--secondary-hover))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        "destructive-hover": "hsl(var(--destructive) / 0.9)",
        "destructive-border": "hsl(var(--destructive-border))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        "muted-soft": "hsl(var(--muted) / 0.5)",
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        "accent-soft": "hsl(var(--accent) / 0.5)",
        "ghost-hover": "hsl(var(--ghost-hover))",
        "outline-hover": "hsl(var(--outline-hover))",
        success: {
          DEFAULT: "hsl(142 76% 36%)",
          foreground: "hsl(0 0% 100%)",
        },
        warning: {
          DEFAULT: "hsl(38 92% 50%)",
          foreground: "hsl(0 0% 100%)",
        },
        info: {
          DEFAULT: "hsl(217 91% 45%)",
          foreground: "hsl(0 0% 100%)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      spacing: {
        "13": "3.25rem",
        toast: "26.25rem",
      },
      minHeight: {
        "textarea-mini": "3rem",
        "textarea-sm": "4rem",
        "textarea-md": "5rem",
        "textarea-lg": "7.5rem",
      },
      maxHeight: {
        dropdown: "18.75rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
