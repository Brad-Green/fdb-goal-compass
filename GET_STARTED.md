# Get Started with FDB UI Components

> **For Developers**: Give this file to your coding agent and say "Follow these instructions to set up my project."

## What This Is

This design system provides production-ready React components styled with design tokens from Figma. Components are built in the shadcn/ui style (copy/paste into your project) and are 1:1 mapped to Figma designs via Code Connect.

**Source repo**: `https://github.com/Brad-Green/fdb-ui-components`

**What you get**:
- Pre-styled components that match Figma designs exactly
- Design tokens (colors, spacing, typography) from Tokens Studio
- Semantic Tailwind CSS classes that update when designers change tokens

---

## Automated Setup (Coding Agent Instructions)

**IMPORTANT**: The following sections are instructions for a coding agent to execute. The agent should run these steps automatically, then ask the developer questions starting at "Component Selection".

### Prerequisites Check

Before starting, verify:
1. Node.js 20+ is installed (`node --version`)
2. pnpm is installed (`pnpm --version`)
3. A `GITHUB_TOKEN` environment variable is set with `read:packages` scope (for accessing `@brad-green/tokens` from GitHub Packages)

If `GITHUB_TOKEN` is not set, stop and ask the developer to create a GitHub Personal Access Token at https://github.com/settings/tokens with `read:packages` scope, then set it as an environment variable.

---

### Phase 1: Create Project

Run in the developer's empty project folder:

```bash
pnpm create vite . --template react-ts
pnpm install
```

---

### Phase 2: Configure GitHub Packages Access

Create `.npmrc` in the project root:

```
@brad-green:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

---

### Phase 3: Install Dependencies

**Install the tokens package:**
```bash
pnpm add @brad-green/tokens
```

**Install Tailwind CSS:**
```bash
pnpm add -D tailwindcss @tailwindcss/vite
```

**Install core runtime dependencies (always needed):**
```bash
pnpm add class-variance-authority clsx tailwind-merge lucide-react @radix-ui/react-slot
```

---

### Phase 4: Configure Tailwind CSS

**4a. Create `tailwind.config.js`:**

```js
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
          DEFAULT: "hsl(217 91% 60%)",
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
  plugins: [],
};
```

**4b. Replace `src/index.css` with:**

```css
@import "tailwindcss";
@import "@brad-green/tokens/dist/tokens.css";
@import "@brad-green/tokens/dist/shadcn-theme.css";

@config "../tailwind.config.js";
```

> **Note:** This uses Tailwind CSS v4 syntax. The `@import "tailwindcss"` replaces the old `@tailwind base/components/utilities` directives, and `@config` loads the JavaScript configuration file.

**4c. Update `vite.config.ts`:**

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

**4d. Update `tsconfig.json` to add path alias:**

Add to `compilerOptions`:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**4e. Update `tsconfig.app.json` to add path alias:**

Add to `compilerOptions`:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**4f. Create `src/lib/utils.ts`:**

```ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**4g. Create `src/lib/types.ts`:**

```ts
export type Size = "mini" | "small" | "regular" | "large";
```

---

## Component Selection (Ask Developer)

**STOP HERE and ask the developer the following questions:**

### Question 1: What type of UI are you building?

Options:
- **Forms & Data Entry** (login, signup, settings, profile pages)
- **Dashboard** (admin panel, analytics, data visualization)
- **Content Site** (marketing pages, documentation, blog)
- **Full Application** (all of the above)

### Question 2: Which specific components do you need?

Present this component list and ask which ones to include:

**Core (recommended for all projects):**
- [ ] Button
- [ ] Input
- [ ] Label

**Forms:**
- [ ] Checkbox
- [ ] Radio Group
- [ ] Select
- [ ] Switch
- [ ] Textarea
- [ ] Form Field (layout wrapper)
- [ ] Slider
- [ ] Date Picker
- [ ] Input OTP

**Layout:**
- [ ] Card
- [ ] Separator
- [ ] Tabs
- [ ] Accordion
- [ ] Collapsible
- [ ] Scroll Area
- [ ] Resizable Panels
- [ ] Aspect Ratio

**Feedback:**
- [ ] Dialog
- [ ] Alert Dialog
- [ ] Toast (Sonner)
- [ ] Progress
- [ ] Spinner
- [ ] Skeleton

**Navigation:**
- [ ] Navigation Menu
- [ ] Dropdown Menu
- [ ] Context Menu
- [ ] Menubar
- [ ] Sidebar
- [ ] Breadcrumb
- [ ] Pagination

**Data Display:**
- [ ] Avatar
- [ ] Avatar Stack
- [ ] Badge
- [ ] Table
- [ ] Carousel
- [ ] Hover Card
- [ ] Tooltip
- [ ] Popover
- [ ] Command (search palette)

**Toggles & Groups:**
- [ ] Toggle
- [ ] Toggle Group
- [ ] Button Group

---

## Phase 5: Copy Selected Components

Based on the developer's selections, copy files from the design system source:

**Source location**: `https://github.com/Brad-Green/fdb-ui-components` → `packages/ui/src/`

Copy to the new project:
- Components → `src/components/ui/`
- Hooks (if needed by components) → `src/hooks/`

> **IMPORTANT: Always use components from the monorepo.** Never create custom implementations of UI elements (buttons, inputs, textareas, etc.) with inline styles or raw HTML elements. The monorepo components are specifically styled to work with the design tokens and have been tested for consistency. If you need a component that doesn't exist, check the monorepo first—it likely has what you need.

**Component → Radix dependency mapping** (install as needed):

| Component | Additional Dependencies |
|-----------|------------------------|
| Accordion | `@radix-ui/react-accordion` |
| Alert Dialog | `@radix-ui/react-alert-dialog` |
| Aspect Ratio | `@radix-ui/react-aspect-ratio` |
| Avatar | `@radix-ui/react-avatar` |
| Checkbox | `@radix-ui/react-checkbox` |
| Collapsible | `@radix-ui/react-collapsible` |
| Command | `cmdk` |
| Context Menu | `@radix-ui/react-context-menu` |
| Date Picker | `react-day-picker` |
| Dialog | `@radix-ui/react-dialog` |
| Dropdown Menu | `@radix-ui/react-dropdown-menu` |
| Hover Card | `@radix-ui/react-hover-card` |
| Input OTP | `input-otp` |
| Label | `@radix-ui/react-label` |
| Menubar | `@radix-ui/react-menubar` |
| Navigation Menu | `@radix-ui/react-navigation-menu` |
| Popover | `@radix-ui/react-popover` |
| Progress | `@radix-ui/react-progress` |
| Radio Group | `@radix-ui/react-radio-group` |
| Resizable | `react-resizable-panels` |
| Scroll Area | `@radix-ui/react-scroll-area` |
| Select | `@radix-ui/react-select` |
| Separator | `@radix-ui/react-separator` |
| Sidebar | `@radix-ui/react-dialog @radix-ui/react-separator @radix-ui/react-tooltip` |
| Slider | `@radix-ui/react-slider` |
| Switch | `@radix-ui/react-switch` |
| Tabs | `@radix-ui/react-tabs` |
| Toast (Sonner) | `sonner` |
| Toggle | `@radix-ui/react-toggle` |
| Toggle Group | `@radix-ui/react-toggle-group` |
| Tooltip | `@radix-ui/react-tooltip` |
| Carousel | `embla-carousel-react` |

---

## Phase 6: Verify Setup

Run the dev server:
```bash
pnpm dev
```

Create a simple test in `src/App.tsx`:

```tsx
import { Button } from "@/components/ui/button";

function App() {
  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-2xl font-bold text-foreground mb-4">
        Design System Test
      </h1>
      <div className="flex gap-4">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
    </div>
  );
}

export default App;
```

**Validation checklist:**
- [ ] Buttons render with correct purple primary color
- [ ] Background uses the design token color (not white)
- [ ] Text uses the foreground color from tokens
- [ ] No console errors

---

## Common Issues

**"Cannot find module '@/...'"**
- Verify `tsconfig.json` and `tsconfig.app.json` both have the `paths` configuration
- Verify `vite.config.ts` has the `resolve.alias` configuration

**"Styles look wrong / unstyled"**
- Verify `index.css` uses Tailwind v4 syntax: `@import "tailwindcss"` (not `@tailwind base/components/utilities`)
- Verify `@config "../tailwind.config.js"` is present in `index.css`
- Verify `@brad-green/tokens` installed successfully

**"Cannot resolve @brad-green/tokens"**
- Verify `.npmrc` exists with correct registry configuration
- Verify `GITHUB_TOKEN` environment variable is set
- Run `pnpm install` again

**"Borders appear too dark / wrong color"**
- This is a Tailwind CSS v4 behavior change. In v4, the `border` utility only sets border-width (1px), not color. Border color defaults to `currentColor` (your text color), resulting in dark borders.
- **Fix**: Add `border-border` alongside `border` in component classNames to use the design token color:
  ```tsx
  // Before (Tailwind v3 style - won't work correctly in v4)
  className="border rounded-lg"
  
  // After (Tailwind v4 compatible)
  className="border border-border rounded-lg"
  ```
- Components like Card that use just `border` need to be updated to `border border-border`
- For top/bottom/left/right borders, use: `border-t border-border`, `border-b border-border`, etc.
- For dividers between children (`divide-y` or `divide-x`), use: `divide-y divide-border`

**"Input/Textarea backgrounds not matching design"**
- Never use raw `<input>` or `<textarea>` HTML elements with custom inline styles
- Always import and use the proper components from `@/components/ui/` (Input, Textarea, etc.)
- The monorepo components include correct token-based styling (`bg-background`, `border-input`, etc.)
- **Fix**: Replace raw HTML elements with the corresponding design system component

---

## Next Steps

After setup is complete, ask the developer:

1. **What page/feature do you want to build first?**
2. **Do you have Figma designs to reference?** (If yes, they can use Code Connect in Figma Dev Mode to get exact component code)
3. **Do you need any additional components not yet copied?**

Happy building!
