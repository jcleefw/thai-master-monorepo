---
story_id: "1-4"
story_key: "1-4-implement-core-zustand-store-with-localstorage-persistence"
epic: "epic-1"
title: "Implement Core Zustand Store with LocalStorage Persistence"
status: "ready-for-dev"
created: "2026-01-11"
---

# Story 1.4: Implement Core Zustand Store with LocalStorage Persistence

## User Story

As a developer,
I want a global Zustand store with LocalStorage persistence and Zod validation,
So that user progress persists across sessions with zero data loss and automatic corruption recovery.

## Acceptance Criteria

**Given** the App package structure exists
**When** I create the Zustand store in `packages/app/src/stores/useStore.ts`
**Then** store is configured with Zustand 5.0.9
**And** persist middleware is integrated with LocalStorage
**And** LocalStorage key is prefixed `thai-master:store`
**And** store follows single global store pattern (NOT feature-based stores)
**And** store exports a custom hook `useStore()` for access

**Given** the store structure is defined
**When** I define initial state shape with TypeScript interfaces
**Then** state includes placeholder sections for:
- `characterProgress` (for Epic 2)
- `vocabularyProgress` (for Epic 3)
- `quizScores` (for Epic 4)
- `userPreferences` (for Epic 5)
**And** each section uses explicit TypeScript types (strict mode)
**And** state shape is documented with JSDoc comments

**Given** persist middleware is configured
**When** I integrate Zod 4.3.5 for schema validation
**Then** Zod schema matches the TypeScript state interface
**And** validation is integrated in persist middleware's `storage.getItem()` method
**And** corrupted data triggers automatic reset to default state
**And** validation errors are logged to console (Sentry integration in Story 1.5)
**And** reset preserves the corrupted data snapshot in a separate LocalStorage key for debugging

**Given** the store with persistence is configured
**When** I update state using store actions (e.g., `updateProgress()`)
**Then** changes immediately save to LocalStorage
**And** changes persist after page refresh
**And** LocalStorage writes include error handling for quota exceeded scenarios

**Given** LocalStorage contains valid persisted state
**When** the app reloads and hydrates state
**Then** Zod validation passes
**And** state restores with perfect fidelity (NFR-R1)
**And** hydration completes before first component render

**Given** LocalStorage contains corrupted data (invalid JSON or schema mismatch)
**When** the app attempts to hydrate state
**Then** Zod validation fails gracefully
**And** state resets to default values automatically
**And** corrupted data is copied to `thai-master:store:corrupted` key
**And** console error logs the validation failure with schema details
**And** app continues functioning without crashing

**Given** the store is implemented with tests
**When** I run unit tests for the store
**Then** tests validate state updates persist to LocalStorage
**And** tests validate Zod schema correctly rejects invalid data
**And** tests validate automatic reset on corruption
**And** tests validate quota exceeded error handling
**And** all tests pass

## Implementation Notes

- Follow single global store pattern (no feature-based stores)
- Use named exports only (no default exports)
- Zod validation must be integrated in persist middleware's `storage.getItem()` method
- Prefix all LocalStorage keys with `thai-master:`
- Tests must be placed in `packages/app/src/stores/tests/` subdirectory

## Related Requirements

- NFR-R1: User progress must persist across browser sessions with zero data loss
- Story 1.5: Sentry integration for validation error logging
