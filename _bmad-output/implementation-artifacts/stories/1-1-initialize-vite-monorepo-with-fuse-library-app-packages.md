---
story_id: "1-1"
story_key: "1-1-initialize-vite-monorepo-with-fuse-library-app-packages"
epic: "epic-1"
title: "Initialize Vite Monorepo with Fuse Library & App Packages"
status: "done"
created: "2026-01-11"
completed: "2026-01-11"
---

# Story 1.1: Initialize Vite Monorepo with Fuse Library & App Packages

## User Story

As a developer,
I want to set up a Vite monorepo with separate Fuse library and App packages,
So that I can build a reusable component library alongside the Thai Master application with proper dependency management.

## Acceptance Criteria

**Given** a new project repository
**When** I initialize the monorepo structure
**Then** the following structure exists:
- Root `package.json` with `"workspaces": ["packages/*"]`
- `packages/fuse/` directory with Vite library mode configuration
- `packages/app/` directory with Vite React TypeScript template
**And** Fuse package.json includes library build configuration with ES modules and UMD outputs
**And** App package.json lists `@thai-master/fuse` as a workspace dependency
**And** Root has Node.js 18+ requirement documented
**And** Build order ensures Fuse builds before App (documented in root package.json scripts)

**Given** the monorepo is initialized
**When** I run `npm install` from the root
**Then** all workspace dependencies install correctly
**And** TypeScript 5.x is configured in strict mode for both packages
**And** Both packages have separate `tsconfig.json` files with proper paths

**Given** Fuse package is configured
**When** I run `npm run build` in packages/fuse
**Then** build outputs ES modules to `dist/` directory
**And** build outputs UMD bundle for CDN usage
**And** type definitions (.d.ts files) are generated
**And** build completes without errors

**Given** App package is configured
**When** I run `npm run dev` in packages/app
**Then** Vite dev server starts on localhost
**And** Hot Module Replacement (HMR) works correctly
**And** App can import from `@thai-master/fuse` workspace package

## Implementation Notes

- Use Vite 5 with React 18 and TypeScript 5 (strict mode)
- Monorepo structure: root package.json with workspaces configuration
- Fuse package: library mode with ES modules and UMD outputs
- App package: standard Vite React TypeScript template
- Build order: Fuse must build before App (configure in root package.json scripts)
- Node.js 18+ requirement

## Related Requirements

- Architecture: Vite monorepo with shared component library (Fuse)
- Build Tool: Vite 5 for fast development and optimized production builds
