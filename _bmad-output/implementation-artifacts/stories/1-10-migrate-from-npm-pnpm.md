---
story_id: "1-10"
story_key: "1-10-migrate-from-npm-pnpm"
epic: "epic-1"
title: "Migrate from npm to pnpm and Upgrade to React 19"
status: "review"
created: "2026-01-12"
completed: "2026-01-12"
---

# Story 1-10: Migrate from npm to pnpm and Upgrade to React 19

## User Story
As a developer, 
I want to use pnpm and React 19, 
So that the monorepo has strict dependency management, improved performance, and uses the latest stable React features without type conflicts.

## Acceptance Criteria
- [x] Create `pnpm-workspace.yaml` to enable pnpm monorepo support.
- [x] Convert local dependencies to use `workspace:*` protocol.
- [x] Unify React types to version 19 using `pnpm.overrides` to fix `bigint` error.
- [x] Fix `ReactCurrentDispatcher` undefined error via Vite `resolve.alias`.
- [x] Update `GlobalStyles` with portable type annotations.

## Tasks/Subtasks
- [x] Initialize pnpm workspace configuration.
- [x] Upgrade `packages/app` and `packages/fuse` to React 19.
- [x] Apply Vite aliasing to force a single React instance.
- [x] Configure library exports to support source-code consumption in dev.

## Dev Agent Record
- **Implementation Plan**: Move from npm to pnpm to solve registry 404s and use overrides to force type compatibility across the monorepo.
- **Debug Log**: Resolved `ReactCurrentDispatcher` error by aliasing `react` to `node_modules/react` in the app's Vite config. Resolved `bigint` error by overriding `@types/react` to `^19.0.0`.
- **Completion Notes**: The project now successfully builds with React 19 and pnpm.

## File List
- `pnpm-workspace.yaml`
- `package.json` (Root)
- `packages/app/package.json`
- `packages/app/vite.config.ts`
- `packages/fuse/package.json`
- `packages/fuse/src/theme/GlobalStyles.ts`

## Change Log
- **2026-01-12**: Full migration from npm to pnpm.
- **2026-01-12**: Upgrade to React 19 and resolution of "Duplicate React" runtime errors.

## Status
status: "review"