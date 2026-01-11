---
story_id: "1-5"
story_key: "1-5-integrate-sentry-error-tracking"
epic: "epic-1"
title: "Integrate Sentry Error Tracking"
status: "ready-for-dev"
created: "2026-01-11"
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
