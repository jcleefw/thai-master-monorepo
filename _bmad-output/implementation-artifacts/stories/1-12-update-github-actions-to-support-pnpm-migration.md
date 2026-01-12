---
story_id: "1-12"
story_key: "1-12-update-github-actions-to-support-pnpm-migration"
epic: "epic-1"
title: "Update GitHub Actions to Support pnpm Migration"
status: "done"
created: "2026-01-12"
completed: "2026-01-12"
---

# Story 1-12: Update GitHub Actions to Support pnpm Migration

## User Story
As a developer, 
I want the CI/CD pipeline to support pnpm and run tests in parallel, 
So that build failures are caught early and the feedback loop remains under 5 minutes.

## Acceptance Criteria
- [x] Workflow uses `pnpm/action-setup` before `actions/setup-node`.
- [x] Replace `npm ci` with `pnpm install --frozen-lockfile`.
- [x] Restructure `test.yml` into parallel jobs: `lint-and-unit` and `e2e-tests`.
- [x] Implement Playwright browser caching using `actions/cache`.
- [x] Use `--filter` flag for workspace-specific commands.

## BDD Verification (Gherkin)
**Scenario: Verifying Parallel CI Execution**
  **Given** a new pull request is opened
  **When** the "CI Tests" workflow triggers
  **Then** the `lint-and-unit` and `e2e-tests` jobs should start simultaneously
  **And** the `e2e-tests` job should correctly identify the pnpm workspace filter for Playwright.

**Scenario: Verifying Browser Cache Persistence**
  **Given** a previous CI run successfully cached Playwright browsers
  **When** a new commit is pushed to the same branch
  **Then** the `Cache Playwright browsers` step should report a `cache-hit`
  **And** the `Install Playwright browsers` step should be skipped.

## Tasks/Subtasks
- [x] Update `.github/workflows/test.yml` with parallel job structure.
- [x] Update `.github/workflows/deploy.yml` with pnpm setup and correct build paths.
- [x] Implement version-aware Playwright caching logic.
- [x] Verify CI stability by running a test push.

## Dev Agent Record
- **Implementation Plan**: Split the sequential CI into parallel tracks. Use Node 20 as the baseline for React 19 compatibility.
- **Completion Notes**: CI time reduced significantly. Parallelism allows linting results to be available even if E2E is still running.

## File List
- `.github/workflows/test.yml`
- `.github/workflows/deploy.yml`

## Change Log
- **2026-01-12**: Implemented parallel CI jobs and binary caching.
- **2026-01-12**: Fixed "pnpm not found" and "playwright not found" errors in CI.

## Status
status: "done"