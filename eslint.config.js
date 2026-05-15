import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  // `lovable-export/` is a vendored snapshot with its own package.json,
  // lockfile, and eslint config. Lint it from there if needed.
  globalIgnores(['dist', 'lovable-export', 'coverage', 'playwright-report', 'test-results', '.claude']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  // shadcn/ui primitives export a `cva` variants helper alongside the
  // component. That's the upstream pattern — not something we fix.
  {
    files: ['src/components/ui/**/*.{ts,tsx}'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
  // Vitest matcher type augmentation: the empty interfaces are the
  // documented extension point, not a code smell.
  {
    files: ['src/test/**/*.d.ts'],
    rules: {
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
])
