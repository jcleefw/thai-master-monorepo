---
story_id: "1-5"
story_key: "1-5-integrate-sentry-error-tracking"
epic: "epic-1"
title: "Integrate Sentry Error Tracking"
status: "done"
created: "2026-01-11"
completed: "2026-01-11"
---

# Story 1.5: Integrate Sentry Error Tracking

## User Story

As a developer,
I want Sentry error tracking integrated into the App package,
So that production errors are captured with full context while users see actionable error messages.

## Acceptance Criteria

**Given** the App package exists
**When** I install Sentry SDK
**Then** `@sentry/react` version 10.32.1 is installed as a dependency
**And** Sentry is initialized in `packages/app/src/main.tsx` before React renders

**Given** Sentry SDK is installed
**When** I configure Sentry initialization
**Then** DSN is loaded from environment variable `VITE_SENTRY_DSN`
**And** environment is set to `development` or `production` based on build mode
**And** `tracesSampleRate` is set to 1.0 for POC (100% transaction sampling)
**And** `replaysSessionSampleRate` is set to 0.1 (10% session replay sampling)
**And** `replaysOnErrorSampleRate` is set to 1.0 (100% replay on errors)
**And** release version is set from `package.json` version field

**Given** Sentry is initialized
**When** I wrap the App component with Sentry ErrorBoundary
**Then** ErrorBoundary catches React component errors
**And** ErrorBoundary displays user-friendly fallback UI with actionable message
**And** fallback UI includes "Reload App" button to recover
**And** errors are sent to Sentry with full component stack trace

**Given** Zustand store error handling exists (from Story 1.4)
**When** I integrate Sentry logging for LocalStorage validation failures
**Then** Zod validation errors are captured by Sentry with full context:
- Corrupted data structure
- Zod error details
- User's browser/device information
**And** users see friendly message in console (no Sentry internals exposed)

**Given** Sentry integration is complete
**When** I test error reporting in development
**Then** I can trigger a test error and verify it appears in Sentry dashboard
**And** error includes full stack trace, breadcrumbs, and device context
**And** session replay is captured for errors (when enabled)

**Given** Sentry configuration uses environment variables
**When** I document Sentry setup in README
**Then** instructions explain how to create `.env.local` file with `VITE_SENTRY_DSN`
**And** instructions explain how to obtain DSN from Sentry project settings
**And** `.env.local` is added to `.gitignore` to prevent committing sensitive keys

**Given** Sentry is fully integrated
**When** I run build and deployment
**Then** production builds include Sentry initialized with production DSN
**And** development builds use development DSN (separate Sentry project)
**And** Sentry does not block app initialization if DSN is missing (graceful degradation)

## Implementation Notes

- Initialize Sentry in `packages/app/src/main.tsx` before React renders
- Wrap App component with Sentry ErrorBoundary
- Integrate Sentry logging for Zustand store Zod validation failures (from Story 1.4)
- Use environment variable `VITE_SENTRY_DSN` for DSN configuration
- Document setup instructions in README with `.env.local` example
- Add `.env.local` to `.gitignore`

## Related Requirements

- Story 1.4: Zustand store with Zod validation (Sentry captures validation errors)
- NFR-S1: Application served over HTTPS in production

## Tasks/Subtasks

- [x] Install @sentry/react dependency (v10.32.1)
- [x] Initialize Sentry in main.tsx before React renders
  - [x] Load DSN from VITE_SENTRY_DSN environment variable
  - [x] Configure environment (development/production)
  - [x] Set tracesSampleRate to 1.0
  - [x] Set replaysSessionSampleRate to 0.1
  - [x] Set replaysOnErrorSampleRate to 1.0
  - [x] Set release version from package.json
- [x] Wrap App component with Sentry ErrorBoundary
  - [x] Create user-friendly fallback UI with "Reload App" button
  - [x] Ensure component errors are captured with full stack trace
- [x] Integrate Sentry logging for Zustand store validation errors
  - [x] Capture Zod validation errors with full context
  - [x] Include corrupted data and error details
  - [x] Add user-friendly console message
- [x] Configure environment variables
  - [x] Create .env.local.example with VITE_SENTRY_DSN placeholder
  - [x] Update .gitignore to exclude .env.local
- [x] Document Sentry setup in README
  - [x] Add instructions for creating .env.local
  - [x] Explain how to obtain DSN from Sentry dashboard
  - [x] Document graceful degradation if DSN is missing
- [x] Create tests for Sentry integration
  - [x] Test error boundary captures React errors
  - [x] Test Zustand validation errors are logged
  - [x] Test graceful degradation without DSN
- [x] Validate all acceptance criteria are met

## Dev Agent Record

### Debug Log
- Story started: 2026-01-11
- Sprint status updated to in-progress

### Implementation Plan
Following red-green-refactor cycle for Sentry integration:
1. Install dependencies
2. Initialize Sentry with environment configuration
3. Wrap App with ErrorBoundary
4. Integrate with Zustand store error handling
5. Add environment configuration and documentation
6. Test error reporting

### Completion Notes
✅ **Story Complete - All Acceptance Criteria Met**

**Implementation Summary:**
- Installed @sentry/react v10.32.1 as dependency
- Initialized Sentry in main.tsx with environment-based configuration
- Wrapped App with ErrorBoundary featuring user-friendly fallback UI with "Reload App" button
- Integrated Sentry logging for LocalStorage validation errors in Zustand store
- Captured JSON parsing errors, Zod validation errors, and quota exceeded errors
- Created .env.local.example with setup instructions
- Documented comprehensive Sentry setup guide in README
- Created 10 comprehensive tests for Sentry integration
- All tests passing (43/43 in app package)
- Type checking and core linting passing

**Key Features:**
- Graceful degradation when DSN not configured
- Full error context captured (data structure, error details, browser info)
- User-friendly console messages (no Sentry internals exposed)
- Session replay captured for errors
- Separate environment support (dev/prod)

**Testing & Validation:**
- All 10 Sentry integration tests passing
- All existing tests passing (no regressions)
- Type checking passing
- Graceful degradation tested

## File List
- packages/app/package.json (added @sentry/react@10.32.1)
- packages/app/src/main.tsx (Sentry initialization and ErrorBoundary)
- packages/app/src/stores/useStore.ts (Sentry error logging for validation failures)
- packages/app/src/tests/sentry.test.tsx (comprehensive Sentry integration tests)
- packages/app/vite.config.ts (added envDir config for monorepo .env support)
- .env.local.example (environment variable template)
- README.md (Sentry setup documentation)

## Change Log
- 2026-01-11: Story started, tasks added, sprint status updated to in-progress
- 2026-01-11: Installed @sentry/react v10.32.1
- 2026-01-11: Implemented Sentry initialization in main.tsx with environment config
- 2026-01-11: Added ErrorBoundary with user-friendly fallback UI
- 2026-01-11: Integrated Sentry logging in Zustand store for validation errors
- 2026-01-11: Created .env.local.example and updated README with setup guide
- 2026-01-11: Created comprehensive tests (10 tests, all passing)
- 2026-01-11: Fixed Vite config to support .env files in monorepo root (added envDir setting)
- 2026-01-11: Verified Sentry integration working with live DSN and dashboard
- 2026-01-11: Story completed - all acceptance criteria met, tested and verified

## Status
done
