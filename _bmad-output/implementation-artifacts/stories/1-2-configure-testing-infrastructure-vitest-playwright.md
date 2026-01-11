---
story_id: "1-2"
story_key: "1-2-configure-testing-infrastructure-vitest-playwright"
epic: "epic-1"
title: "Configure Testing Infrastructure (Vitest & Playwright)"
status: "done"
created: "2026-01-11"
completed: "2026-01-11"
---

# Story 1.2: Configure Testing Infrastructure (Vitest & Playwright)

## User Story

As a developer,
I want to set up Vitest for unit testing and Playwright for E2E testing,
So that I can ensure code quality and validate critical user flows throughout development.

## Acceptance Criteria

**Given** the monorepo structure exists
**When** I configure Vitest at the root level
**Then** `vitest.config.ts` exists with configuration for both packages
**And** Vitest 2.0.0 is installed as a dev dependency
**And** Test command `npm run test` executes unit tests for both Fuse and App packages
**And** Test files use `.test.tsx` suffix and are located in `tests/` subdirectories within component/lib/hooks/stores folders
**And** Vitest supports TypeScript and JSX transformations

**Given** Vitest is configured
**When** I create a sample component with a unit test
**Then** the test runs successfully with `npm run test`
**And** test output shows pass/fail status clearly
**And** code coverage report can be generated with `npm run test:coverage`

**Given** the App package exists
**When** I configure Playwright for E2E testing
**Then** Playwright 1.45.0 is installed in packages/app
**And** `playwright.config.ts` exists with Chrome-only browser configuration
**And** Mobile viewport emulation is configured (320px-428px width range)
**And** E2E tests are located in `packages/app/e2e/` directory
**And** Test command `npm run test:e2e` executes Playwright tests

**Given** Playwright is configured
**When** I create a sample E2E test for the home route
**Then** the test runs successfully in Chrome
**And** test results show pass/fail status with screenshots on failure
**And** Mobile viewport emulation works correctly

**Given** all testing infrastructure is configured
**When** I run `npm run test:all` from root
**Then** both unit tests (Vitest) and E2E tests (Playwright) execute
**And** all tests complete without configuration errors
**And** test execution completes within reasonable time (<2 minutes for empty suite)

## Implementation Notes

- Vitest 2.0.0 at root level for unit tests
- Test files: `.test.tsx` suffix in `tests/` subdirectories
- Playwright 1.45.0 in packages/app for E2E tests
- Chrome-only browser configuration (POC constraint)
- Mobile viewport emulation: 320px-428px width range
- E2E tests in `packages/app/e2e/` directory
- Root level `npm run test:all` executes both Vitest and Playwright

## Related Requirements

- Testing Framework: Vitest for unit tests, Playwright for E2E
- Chrome-only POC: No cross-browser testing required
- Mobile-first: Viewport emulation for mid-range Android devices
