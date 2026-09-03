# Repository Guidelines

## Project Structure & Module Organization

The Astro application lives in `src/`. Routes are in `src/pages/`; reusable Astro and React UI belongs in `src/components/`; layouts, hooks, utilities, Nanostores, and translations use matching directories. Blog content is under `src/content/blog/`, and static files are in `public/`. Configure the site in `config/site.yaml`. Build-time generators live in `src/scripts/`, the Koharu CLI in `scripts/`, and the standalone React/Vite CMS in `cms/`. Treat `dist/` and `.astro/` as generated output.

## Imported Claude Code Context

`CLAUDE.md` is retained as the original, detailed Claude Code guidance. Consult it only when a task needs historical architectural rationale not covered here; this file and the current source win when it contains stale paths, versions, commands, or hard limits.

- Keep feature logic in focused modules with small public interfaces. Prefer pure functions and immutable transformations, and isolate side effects at framework or I/O boundaries.
- `src/lib/config/site.ts` is the single YAML parse and assembly point. Put each section's defaults and validation in its corresponding module under `src/lib/config/`, using a pure `normalize*(raw)` function with tests; do not make `src/lib` depend on `@constants/site-config`.
- Prefer `.astro` for static layouts and pages, and React only for interactive state. For Astro navigation lifecycle code, initialize against the current DOM, listen to `astro:page-load`, and clean up on `astro:before-swap`.
- Avoid `suppressHydrationWarning`; use the existing mounted-state and media-query hooks for client-only values. Do not pass large post bodies into hydrated React components when a small derived value will do.
- Keep root and `[lang]` routes paired through the shared locale route helpers. Do not enable Astro i18n `fallback`, because it conflicts with dynamic series routes.

## Build, Test, and Development Commands

Use pnpm from the repository root:

- `pnpm install` installs application dependencies.
- `pnpm dev` starts Astro at `http://localhost:4321`.
- `pnpm build` creates the production site; `pnpm preview` serves it.
- `pnpm check` runs Astro and TypeScript validation.
- `pnpm lint` checks source with Biome; `pnpm lint:fix` applies safe fixes.
- `pnpm knip` reports unused files, exports, and dependencies.
- `pnpm cms:install && pnpm cms` installs and starts the local CMS.
- `pnpm koharu generate all` refreshes LQIP, summary, and similarity assets after relevant content changes.

## Coding Style & Naming Conventions

Biome is authoritative: two-space indentation, LF endings, 128-column lines, single quotes in JavaScript/TypeScript, semicolons, and trailing commas. Keep Tailwind classes sorted. Use PascalCase for React components (`PostCard.tsx`), `use`-prefixed camelCase for hooks (`useMediaQuery.ts`), and `index.ts` for intentional barrel exports. Prefer `.astro` for static layouts and pages; use React for interactive state. Import through aliases such as `@components/*` and `@lib/*`, and avoid circular dependencies.

## Testing Guidelines

The repository has a Node test suite (`pnpm test`) but no coverage threshold. Before submitting changes, run `pnpm lint`, `pnpm check`, `pnpm test`, and `pnpm build` as appropriate for the touched area. Use `pnpm lint:fix` only when formatting changes are intended, because it rewrites files. Manually exercise affected routes and interactive components with `pnpm dev`; CMS changes should also be verified through `pnpm cms`. Prioritize tests for content utilities, transformations, scripts, hooks, and stores, using `*.test.ts` or `*.test.tsx` names.

## Commit & Pull Request Guidelines

Recent history favors short imperative subjects and Conventional Commit prefixes such as `fix:`, `feat:`, and `chore:`. Keep each commit focused and include generated assets when the source change requires them. Pull requests should explain the user-visible effect, list validation commands, link related issues, and include screenshots or recordings for visual changes. Call out configuration, migration, performance, or i18n impact explicitly.

## Configuration & Generated Data

Do not commit secrets from `.env`. Restart the dev server after changing `config/site.yaml`. Preserve the tracked `.cache/og-data.json`; it is an intentional build cache, unlike other ignored cache artifacts.
