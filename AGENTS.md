<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# BookNook

Early-stage Next.js App Router app (a library/book site). `/` is the only route and most app code is still stubbed — `src/app/page.tsx` is empty and `src/components/home/Navbar.tsx` contains the pending navbar spec in a trailing comment. There is no test suite, CI, or database; verify changes with lint + typecheck (+ `build` for larger work).

## Commands

Package manager is **npm** (package-lock.json; don't use pnpm/yarn/bun).

- `npm run dev` — dev server (Turbopack)
- `npm run lint` — ESLint flat config (eslint-config-next core-web-vitals + typescript)
- `npx tsc --noEmit` — typecheck (no script exists for it)
- `npm run build` — production build

## Stack quirks

- **Next.js 16 + React 19 with the React Compiler enabled** (`next.config.ts: reactCompiler: true`). Write components to compiler rules; don't add manual `React.memo`/`useMemo`. The root layout uses the generated global `LayoutProps<"/">` prop type — keep that pattern for new layouts/pages instead of hand-written prop types.
- **Tailwind v4, CSS-first**: there is no `tailwind.config.*`. Tokens live in `src/app/globals.css` (`@theme inline` + oklch CSS variables). CSS compiles via the `@tailwindcss/turbopack` loader rule in `next.config.ts` — don't add PostCSS or a JS config.
- **shadcn/ui uses the "base-nova" style built on `@base-ui/react` (not Radix)** — see `components.json`. `src/components/ui/*` are generated but editable; add more with `npx shadcn add <component>`.
- `cn` is the `cn` npm package: components do `import { cn } from "cn"`, and `src/lib/utils.ts` re-exports it as `@/lib/utils`. Don't write a local clsx/tailwind-merge helper — neither is installed.
- Path alias `@/*` → `./src/*`.
- `src/lib/highlighter.tsx` + `src/hooks/use-highlighted-code.ts` are a lazy-loading shiki highlighter; supported languages are a fixed map in `highlighter.tsx` (aliases too) — extend that map to support a new language.

## Layout

- `src/app/` — routes; `src/components/home/` — app-specific components; `src/components/ui/` — shadcn primitives; `src/lib/`, `src/hooks/` — helpers.
